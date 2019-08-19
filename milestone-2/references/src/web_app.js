// Object to store data in local as a string

 college={
    "EEE": // department key
    {
        "A":[], // section key pointing to an array
        "B":[],
        "C":[],
    },
    "MECH":
    {
        "A":[],
        "B":[],
        "C":[],
    },
    "CSE":
    {
        "A":[],
        "B":[],
        "C":[],
    },
    "CIVIL":
    {
        "A":[],
        "B":[],
        "C":[],
    },
 }

// used to retrieve data from local storage

if(localStorage.getItem("data" )!= undefined)
college=JSON.parse(localStorage.getItem("data")) // convers string into object

// clears all locla storage
function clear_data()
{
    localStorage.removeItem("data")// removes data key in local storage
}
function get_regno(dept,name)
{
    let dept_code=dept// copy departmet
    let section,dept_db=[] // department data base contains all students name in a particular department
    if(dept_code=="CIVIL")// generates department code
    dept_code="CVL"
    else if(dept_code =="MECH")
    dept_code="MEC"
        for(let sec_key in college[dept]) // combining all arrays to single array to find department wise no
        {
            if(college[dept][sec_key].length!=0)
                dept_db=dept_db.concat(college[dept][sec_key])
        }
    console.log(dept_db);
    let dep_no=dept_db.indexOf(name)+1;// retruns dep_no
    let roll_no=0;
        for(let sec_key in college[dept])
        {
        if(college[dept][sec_key].indexOf(name)!=-1) //searches for name in a particular array
        {
        roll_no=college[dept][sec_key].indexOf(name)+1; // returns roll_no
        section=sec_key;// returns name founded section
        break;
        }
        }  // concating everyting to generate regno
    let reg_no=dept_code+((dep_no>9)?(dep_no.toString()):("0"+dep_no.toString()))+section+((roll_no>9)?(roll_no.toString()):("0"+roll_no.toString()));
    return reg_no;
}

// used to enroll name into the respective department

function enroll_department(option)
{
    console.log(option);
    let dept_key=document.getElementById(option+".dept").value// based on option get the value
    let name=document.getElementById(option+".name").value
    let reg_no=0;// intialize regno
    for(let sec_key in college[dept_key]) // iterates section wise
        {
            if(college[dept_key][sec_key].length<3) // checks for vacancy
            {
                college[dept_key][sec_key].push(name) // add the name to the end of the array
                college[dept_key][sec_key].sort() // sort the array in ascending order
                console.log('pushed')
                console.log(college[dept_key][sec_key])
                reg_no=get_regno(dept_key,name)// gets the regno
                break;
            }
        }
    if(reg_no)
        { // prints the enrolled message
            document.getElementById(option+".print1").innerHTML="You have been enrolled to "+dept_key+"<br>"+"<br>"+"You have been allotted section "+reg_no[5]+"<br>"+"<br>"+"Your roll number is "+reg_no+"<br>"+"<br>";
            console.log("enrolled");
            localStorage.setItem("data",JSON.stringify(college))
            console.log(localStorage.getItem("data"))
        }
        else
        {
            //prints the error message
            document.getElementById(option+".print1").innerHTML="Error: Seats are not available in "+dept_key;
            return 0
        }
    return 1
}

// used to change the department

function delete_name(name,option)
{
    for(let dept_key in college) // iterates department wise
    {
        for(let sec_key in college[dept_key]) // iterates section wise
        {
            let index=college[dept_key][sec_key].indexOf(name) // get the index
            if(index!=-1) // if index returns -1 name is not availble in that array
                  {      
                    if(option=='2') // if option is 2 it will not delete .it returns the department key
                    return dept_key; 
                    else if(option=='1') 
                    {
                      if(dept_key!=(document.getElementById("2.dept").value)) // if dep_key is entered department do nothing
                      {
                        college[dept_key][sec_key].splice(index,1)  // delete the particular index
                        console.log("deleted");  
                        localStorage.setItem("data",JSON.stringify(college));// converts the object into string
                        console.log(localStorage.getItem("data")); 
                        return dept_key
                      }
                    }
                    else if(option=='3')
                      {  // similar to option 1 except doesn't check for dept_key
                        college[dept_key][sec_key].splice(index,1);  
                        console.log("deleted");  
                        localStorage.setItem("data",JSON.stringify(college));
                        console.log(localStorage.getItem("data")); 
                      }
                  }
        }
    }

}

// changes the department of the student

function change_department()
{
    if(enroll_department('2')) // calls enroll department function with option 2
    {
        let name=document.getElementById("2.name").value; // get the name in second menu
        delete_name(name,'1'); // delete previously enrolled name
    }
}

// changes the section

function change_section()
{
    let sec_key=document.getElementById("3.sec").value
    let name=document.getElementById("3.name").value
    let dept_key=delete_name(name,'2')
    if(college[dept_key][sec_key].length<=2)
    {
        delete_name(name,'3')
        college[dept_key][sec_key].push(name)
        college[dept_key][sec_key].sort()
        console.log('Section changed')
        console.log(college[dept_key][sec_key])
        reg_no=get_regno(dept_key,name)
        document.getElementById("3.print1").innerHTML="You have been enrolled to "+dept_key+"<br>"+"<br>"+"You have been allotted section "+reg_no[5]+"<br>"+"<br>"+"Your roll number is "+reg_no+"<br>"+"<br>";
        console.log("enrolled");
        localStorage.setItem("data",JSON.stringify(college));
        console.log(localStorage.getItem("data"));
    }
    else
    {
        document.getElementById("3.print1").innerHTML="Error: Seats are not available in "+sec_key+"  section"+"<br>";
    }
}

//prints all students in a departemnt

function print_department()
{
    let dept_key=document.getElementById("4.dept1").value
    let print_message="List of Students"+"<br>" // br tag is used to leave a line in web page
    let regno
    for(let sec_key in college[dept_key])
    {
        for( i=0;i< college[dept_key][sec_key].length;i++)
        {
          regno=get_regno(dept_key,college[dept_key][sec_key][i]);
          print_message=print_message+college[dept_key][sec_key][i]+"  -  "+regno+"<br>"
        }
    }
    document.getElementById("4.print1").innerHTML=print_message

}
function print_section()
{
    let sec_key=document.getElementById("4.sec1").value
    if (sec_key=='all') {
        print_department();
    } else {
        let dept_key=document.getElementById("4.dept2").value
        let print_message="List of Students"+"<br>"
        let regno
        for( i=0;i< college[dept_key][sec_key].length;i++)
        {
        regno=get_regno(dept_key,college[dept_key][sec_key][i]);
        print_message=print_message+college[dept_key][sec_key][i]+"  -  "+regno+"<br>"
        }
        document.getElementById("4.print2").innerHTML=print_message
    }
}
function print_student()
{
    let regno=document.getElementById("4.regno").value
    let dept_key=regno.slice(0,3)
    if(dept_key=="MEC")
    dept_key="MECH"
    else if(dept_key=="CVL")
    dept_key="CIVIL"
    let index=parseInt(regno.slice(6),10)
    print_message= college[dept_key][regno[5]][index-1]+"  -  "+dept_key+"  -  "+"Section "+regno[5]
    document.getElementById("4.print3").innerHTML=print_message
}


