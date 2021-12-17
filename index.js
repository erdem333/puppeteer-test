const _ = require('lodash');
const puppeteer = require('puppeteer');

let scrapeList = async () => {
    browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto('https://www.immowelt.de/liste/wallerfangen/haeuser/kaufen?d=true&r=10');

    let paginationButtons = await page.$$('.Button-c3851.secondary-47144.navNumberButton-d264f');

    let allItems = await page.evaluate(() => {
        const searchListElement = document.querySelector('div[data-test="searchlist"]');
        const searchItemsElements = searchListElement.querySelectorAll('div[class*="EstateItem"]')

        let items = [];

        searchItemsElements.forEach((item) => {
            let aTag = item.querySelector('a')
            items.push({
                href: aTag.href,
                id: aTag.id
            })
        })

        return items;
    });


    for (let link of paginationButtons){
        await Promise.all([
            page.waitForNavigation(),
            link.click()
        ]);

        let evalResponse = await page.evaluate(() => {
            const searchListElement = document.querySelector('div[data-test="searchlist"]');
            const searchItemsElements = searchListElement.querySelectorAll('div[class*="EstateItem"]')
    
            let items = [];
    
            searchItemsElements.forEach((item) => {
                let aTag = item.querySelector('a')
                items.push({
                    href: aTag.href,
                    id: aTag.id
                })
            })
    
            return items;
        });
        allItems.push(...evalResponse);
    }

    await browser.close();

    return allItems;
};

scrapeInfoPage = async () => {

};

scrapeList().then(async (value) => {
    console.log('valuee', value)
});



    // for (let i = 0; i < MAXPAGENUMBER; i++) {



    //     // const sizeLinks = await page.$$('.Button-c3851.secondary-47144.navNumberButton-d264f')
    //     // await sizeLinks[1].click({delay:1000}) 


    //     const [button] = await page.$x(`//button[contains(., '${i + 2}')]`);
    //     if (button) {
    //         await button.click();
    //         await page.waitForSelector('.SearchList-22b2e', { visible: true, timeout: 0 });
    //     }




    //     // await page.click(getFirstPageButton);

    //     // await page.click('.Button-c3851.secondary-47144.navNumberButton-d264f', {delay: 500});

    //     // await page.$eval(document.querySelector('.Button-c3851.secondary-47144.navNumberButton-d264f'), form => form.click());

    //     console.log(getAdvertList);
    // }



    // await browser.close();

    // await page.click('a[href="/login"]');

    // await page.type('#username', "PedroTech", {delay: 100})
    // await page.type('#password', "Password123", {delay: 100})

    // await page.type('#username', "PedroTech")
    // await page.type('#password', "Password123")

    // await page.click('input[value="Login"]')

    // await browser.close();




    // const getAdvertInfos = await page.evaluate(() => {

    //     const tmp = document.querySelectorAll('.has-font-300');

    //     const miete = tmp[0].querySelectorAll('strong')[0];

    //     const flaeche = tmp[1].innerText;

    //     const zimmer = tmp[2].innerText;

    //     const objectsArray = [];

    //     page.click('https://www.immowelt.de/expose/23ree5r', {delay: 500})

    //     objectsArray.push({
    //         miete: miete.innerText,
    //         flaeche: flaeche,
    //         zimmer: zimmer
    //     })

    //     return objectsArray;
    // })


// const grapQuotes = await page.evaluate(() => {
//     const quotes = document.querySelectorAll('.quote');

//     let qoutesArr = [];

//     quotes.forEach((element) => {
//         const quoteInfo = element.querySelectorAll('span')
//         const actualQoute = quoteInfo[0];
//         const actualAuthor = quoteInfo[1];

//         const authorName = actualAuthor.querySelector("small");

//         qoutesArr.push({
//             qoute: actualQoute.innerText,
//             author: authorName.innerText
//         })

//     })

//     return qoutesArr;
// });