const puppeteer = require('puppeteer');
const config = require('../config.json');
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function initLogin(studentID, password, io, socket) {
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
            if (document.querySelector("#authn-login-form > p > span") == undefined){
                return true;
            }
            else{
                return false;
            }
            
        });
        if (passwordCheck){
            // wait until page loads
            await page.waitForSelector('#parentPageTemp');
            
        
        
            
            // reload page for popup to go away if there is one
            await page.reload();

            

            let courses = await page.evaluate(_ => {
                let courses = [];
                let table = document.querySelector("#quickLookup > table.linkDescList.grid > tbody");
                courses.push(document.querySelector("#firstlast").innerText);
                for (let i = 3; i < table.childElementCount; i++) {
                    let splitCourseName = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + i + ") > td:nth-child(12)").innerHTML.split("&");
                    let q1 = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + i + ") > td:nth-child(13)").firstChild.innerText;
                    let q2 = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + i + ") > td:nth-child(14)").firstChild.innerText;
                    let q3 = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + i + ") > td:nth-child(17)").firstChild.innerText;
                    let q4 = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(" + i + ") > td:nth-child(18)").firstChild.innerText;
                    courses.push(splitCourseName[0])
                    courses.push(q1);
                    courses.push(q2);
                    courses.push(q3);
                    courses.push(q4);
                    courses.push(i);
                }
                return courses;
            });

            await io.to(socket.id).emit("ps-page-home", courses);
            
            await browser.close();
        }
        else {
            io.to(socket.id).emit("login-error", "Password not valid");
            console.error('Error:', "Password not valid");
            await browser.close();
        }

        

    })();
    
        
    
    
}

module.exports = { initLogin };