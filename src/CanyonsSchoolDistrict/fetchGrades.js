const puppeteer = require('puppeteer');
const config = require('../../config.json');
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function loginAndFetchGrades(studentID, password, io, socket, quarter, course) {
    // io is the socket.io server object
    // socket is the socket object from the socket.io server
    
    
    (async () => {
        const browser = await puppeteer.launch({
            executablePath: config.pathToFirefoxExecutable,
            product: 'firefox',
            headless: !config.showBrowser
        });
        const page = await browser.newPage();

        await page.setViewport({width: 1080, height: 600});
        await page.goto("https://student.canyonsdistrict.org/scripts/wsisa.dll/WService=wsEAplus/seplog01.w");
        
        
        
        
        // wait for page to load
        await page.waitForSelector("#login");
        // type in student id
        await page.type('#login', studentID);
        // type in password
        await page.type('#password', password);
        // click go button
        await page.click("#bLogin");
        
        // check if password is wrong
        await delay(2000);

        let passwordCheck = await page.evaluate(_ => {
            if (document.querySelector("#msgBodyCol > div > center > b:nth-child(1)") != undefined) {
                return false;
            }
            else {
                return true;
            }
            
        });
        if (passwordCheck){
            await delay(2000);
            let pages = await browser.pages();
            let page2 = pages[2];
            await page2.click("#sf_navIcon > li:nth-child(1) > a:nth-child(1)");
            await delay(1000);
            await page2.click("#sf_navMenu > li:nth-child(4) > a");
            await delay(5000);
            await page2.click("#classGradesOptions_488647_407");
            await delay(1000);
            await page2.click("#allLink_488647_407");
            await delay(2000);
            let quarterNum = "1";
            switch (quarter){
              case "13":
                quarterNum = "2";
                break;
              case "14":
                quarterNum = "4";
                break;
              case "17":
                quarterNum = "6";
                break;
              case "18":
                quarterNum = "8";
                break;
            }
            let courseNum = parseInt(course) + 1;
            //console.log(courseNum);
            await page2.click(".scrollRows > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child("+courseNum+") > td:nth-child("+quarterNum+") > div:nth-child(1) > a:nth-child(1)");
            await delay(2000);
            
           
            

            //await io.to(socket.id).emit("ps-page-home", courses);



        }
        else {
            console.error('Error:', "Password not valid");
            await browser.close();
        }

        
        
    })();
    
        
    
    
}

module.exports = { loginAndFetchGrades };