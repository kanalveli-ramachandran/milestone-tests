
/**
 * Generated by https://github.com/dsheiko/puppetry
 * on Mon Jul 29 2019 19:48:26 GMT+0530 (IST)
 * Suite: render
 */

var nVer = process.version.match( /^v(\d+)/ );
if ( !nVer || nVer[ 1 ] < 9 ) {
  console.error( "WARNING: You have an outdated Node.js version " + process.version
    + ". You need at least v.9.x to run this test suite." );
}


const {
        bs, util, fetch, localStorage
      } = require( "../lib/bootstrap" )( "render" ),
      devices = require( "puppeteer/DeviceDescriptors" );



jest.setTimeout( 50000 );

// Environment variables
const ENV = {

};

const FORM_FIELDS = ['name', 'phno', 'emailaddress', 'department1', 'department2'];
const TEXT_FORM_FIELDS = ['name', 'phno', 'emailaddress'];
const SELECT_FORM_FIELDS = ['department1', 'department2'];

const readRootConfig = function() {
  let { filename } = module;
  let [root] = filename.split('specs/render.spec');
  return `file://${root}src/index.html`;
};

const indexLink = readRootConfig();

const testFormResults = async (options, validate) => {
  for (key in options) {
    let value = options[key];
    if (value) {
      if (TEXT_FORM_FIELDS.includes(key)) {
        await bs.page.type(`[name="${key}"]`, value);
      } else {
        await bs.page.select(`[name="${key}"]`, value);
      }
    }
  }

  await ( await SUBMIT_ENROLLMENT() ).click( {"button":"left"} );

  let bodyText = await bs.page.$eval('#results', el => el.innerText)
  for (key in options) {
    let value = options[key];
    if (validate) {
      if(key === validate) {
        expect(bodyText).not.toContain(`${key}: ${value}`);
        return;
      }
    } else {
      expect(bodyText).toContain(`${key}: ${value}`);
    }
  }
}

const SUBMIT_ENROLLMENT = async () => bs.query( "[type='submit']", "SUBMIT_ENROLLMENT" );


describe("render", async () => {
  beforeAll(async () => {
    await bs.setup();
  });

  afterAll(async () => {
    await bs.teardown();
  });


  describe("Check Student Enrollment", async () => {

    test("Check valid form", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        name: 'sdcdsc',
        phno: '345435345',
        emailaddress: 'scdscds.dfvdfv@college.edu',
        department1: 'CIVIL',
        department2: 'CSE'
      });
    });

    test("Check valid form - default secondary department choice", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds.dfvdfv@college.edu',
        department1: 'CIVIL'
      });
    });

    test("Check invalid form - name exceeds max length", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchbsdjhcbsdjhbcshjdbcsjhdcbsjhcbsdhjcbsdchjsbdcjhsbcjshcbsjhdcbsjhcbsjhcbsjhdcbsdjhcbsdc',
        phno: '345435345',
        emailaddress: 'scdscds.dfvdfv@college.edu',
        department1: 'CIVIL',
        department2: 'CSE'
      }, 'name');
    });

    test("Check invalid form - phno exceeds max length", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353453242346765',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds.dfvdfv@college.edu',
        department1: 'CIVIL',
        department2: 'CSE'
      }, 'phno');
    });

    test("Check invalid form - secondary department choice", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '34543534',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds.dfvdfv@college.edu',
        department1: 'CIVIL',
        department2: 'CIVIL'
      }, 'department2');
    });

    test("Test disabled - secondary department choice", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );
      expect(await bs.page.$('[name="department2"] option[value="EEE"][disabled]')).toBeTruthy();
      await bs.page.select('[name="department1"]', 'CIVIL');
      expect(await bs.page.$('[name="department2"] option[value="CIVIL"][disabled]')).toBeTruthy();
      await bs.page.select('[name="department1"]', 'CSE');
      expect(await bs.page.$('[name="department2"] option[value="CIVIL"][disabled]')).toBeFalsy();
      expect(await bs.page.$('[name="department2"] option[value="CSE"][disabled]')).toBeTruthy();
    });


    test("Check invalid form - invalid email", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds',
        department1: 'CIVIL'
      }, 'emailaddress');
    });

    test("Check invalid form - invalid college email", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds@gmail.com',
        department1: 'CIVIL'
      }, 'emailaddress');
    });

    test("Check invalid form - invalid characters", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scds_cds@college.edu',
        department1: 'CIVIL'
      }, 'emailaddress');
    });

    test("Check invalid form - invalid email suffix", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scdscds@college.edu.ltd',
        department1: 'CIVIL'
      }, 'emailaddress');
    });

    test("Check valid form - valid email with allowed characters", async () => {
      let result, assert;


      await bs.page.goto(indexLink, {"timeout":3000,"waitUntil":"domcontentloaded"} );


      await testFormResults({
        phno: '3454353',
        name: 'sdcdsccbdsjhcbsdhjcbsdhjcbsjchb',
        emailaddress: 'scds..cds@college.edu',
        department1: 'CIVIL'
      });
    });
  });
});
