const puppeteer = require('puppeteer');
const config = require('../../config.json');
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
            let courses = await page2.evaluate(_ => {
                let courses = [];
                let table = document.querySelector(".fixedRows > table:nth-child(1) > tbody:nth-child(1)").children;
                let table2 = document.querySelector(".scrollRows > table:nth-child(1) > tbody:nth-child(1)").children;
                courses.push(document.querySelector("#sf_StudentLabel").innerText);
                for (let i = 0; i < table.length; i++){
                    if (table[i].style.display == ""){
                        courses.push(table[i].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].innerText);
                        let quarters = table2[i].children;
                        for (let x = 1; x < quarters.length; x += 2){
                            try{
                                courses.push(table2[i].children[x].children[0].children[0].innerText);
                            }
                            catch{
                                courses.push("");
                            }
                            
                            
                        }
                        courses.push(i);
                        
                    }
                    
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