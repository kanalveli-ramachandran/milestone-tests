// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
(function() {
  var initialize = function() {
    /*
      1. Add all your event bindings here. Please avoid binding events inline and add your event listeners here.

      onSubmit callback
      disableDuplicateSecondaryDepartment callback,...
    */
    let dept1 = document.querySelector('[name="department1"]');
    dept1.addEventListener('change', disableDuplicateSecondaryDepartment);

    let submit = document.querySelector('.registration-form');
    submit.addEventListener('submit', onSubmit);
  };

  var disableDuplicateSecondaryDepartment = function(e) {
    // 2. in department2, Should disable the option selected in department1
    let disabledOption = document.querySelector('[name="department2"] option[disabled]');
    disabledOption.removeAttribute('disabled');
    let optionToBeDisabled = document.querySelector('[name="department2"] option[value="'+ e.target.value +'"]');
    optionToBeDisabled.setAttribute('disabled', true);
  }

  var constructData = function(form) {
    var formDataObj = new FormData(form);
    var data = {};
    for (const [key, value]  of formDataObj.entries()) {
      data[key] = value;
    }
    // 3. Construct data from the form here. Please ensure that the keys are the names of input elements
    return data;
  }

  var validateResults = function(data) {
    let { name, phno, department1, department2, emailaddress } = data || {};
    // 4. Check if the data passes all the validations here
    if (name.length > 100) {
      return false;
    }
    if (phno.toString().length > 10) {
      return false;
    }
    if (department1 === department2) {
      return false;
    }

    return emailaddress.match('^[A-Za-z0-9.]+@college.edu$')
  };

  var onSubmit = function(event) {
    event.preventDefault();
    var data = constructData(event.target);

    if (validateResults(data)) {
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      resultsDiv.classList.add("hide");
    }
  };

  var printResults = function(data) {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      return innerHtml + constructElement(keyValuePair);
    }, '');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  /*
    Initialize the javascript functions only after the html DOM content has loaded.
    This is to ensure that the elements are present in the DOM before binding any event listeners to them.
  */
  document.addEventListener('DOMContentLoaded', initialize);
})();
