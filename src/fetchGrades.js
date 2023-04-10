const puppeteer = require('puppeteer');
const config = require('../config.json');
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function loginAndFetchGrades(studentID, password, io, socket, quarter, course) {
  (async () => {
    const browser = await puppeteer.launch({
      executablePath: config.pathToFirefoxExecutable,
      product: 'firefox',
      headless: !config.showBrowser
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 600 });
    await page.goto(config.loginPortalLink);




    // wait for page to load
    await page.waitForSelector("input#identification");
    // type in student id
    await page.type('input#identification', studentID);
    // click go button
    await page.click("#authn-go-button");
    // wait for password page to load
    await page.waitForSelector("button#authn-startover-button");
    // type in password
    await page.type('.input.placeholder-input.ember-view.ember-text-field', password);
    // click go button
    await page.click("#authn-go-button");
    // check if password is wrong
    await delay(2000);

    let passwordCheck = await page.evaluate(_ => {
      if (document.querySelector("#authn-login-form > p > span") == undefined) {
        return true;
      }
      else {
        return false;
      }

    });
    if (passwordCheck) {
      // wait until page loads
      await page.waitForSelector('#parentPageTemp');



      await delay(2000);
      // reload page for popup to go away if there is one
      await page.reload();


      await page.waitForSelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + course + ") > td:nth-child(" + quarter + ") > a");
      await page.click("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + course + ") > td:nth-child(" + quarter + ") > a");

      await delay(10000);
      await page.waitForSelector('#parentPageTemp');
      await page.waitForSelector("#validationIcons > em.tt-info.ps-icon.ps-info-inverse");


      let grades = await page.evaluate(_ => {
        let grades = [];
        grades.push(document.querySelector("#content-main > div.box-round > table > tbody > tr:nth-child(2) > td:nth-child(1)").innerText);
        grades.push(document.querySelector("#content-main > div.box-round > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerText);
        for (let i = 0; i < document.querySelectorAll(".psonly.ng-binding").length; i++) {
          grades.push(document.querySelectorAll("span.psonly.ng-binding")[i].innerText);
          grades.push(document.querySelectorAll(".assignmentcol > span.ng-binding")[i].innerText);
          grades.push(document.querySelectorAll("td.ng-binding.ng-scope")[i].innerText);
        }
        return grades;
      });
      io.to(socket.id).emit("ps-page-course", grades);
      await browser.close();
    }
    else {
      console.error('Error:', "Password not valid");
      await browser.close();
    }



  })();

}

module.exports = { loginAndFetchGrades };