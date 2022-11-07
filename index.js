const pptr = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
    const browser = await pptr.launch({
        headless: false,
        args: [`--window-size=${1280},${1024}`],
        // devtools: true,
      });
      const page = await browser.newPage();
      await page.goto("https://monkeytype.com/");
      await page.setViewport({ width: 1920, height: 1080 });
      await page.waitForSelector("#words");
      await page.focus("#words");
      await page.waitForTimeout(4000);
      await page.waitForSelector("body");
      let html = await page.$eval("body", (element) => {
        return element.innerHTML;
      });
      let wordsArray = [];
      const $ = await cheerio.load(html);
        await $(".word").each((index, elem) => {
        wordsArray.push($(elem).text());
      }) 
      console.log(wordsArray);
    
      const inputText = await wordsArray.join(" ");
      console.log(await inputText)
    await page.waitForSelector("body");
    await page.waitForSelector(".rejectAll");
    await page.click(".rejectAll");
    await page.keyboard.type(inputText, {delay: 130})
})()