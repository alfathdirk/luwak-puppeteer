const puppeteer = require('puppeteer');

module.exports = function(options) {
  return async function (context) {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const res = await page.goto(context.url);
    let body = await page.evaluate(() => {
      return document.documentElement.outerHTML;
    })

    context.set(res.headers);
    context.url = res.url;
    context.body = body;

    await browser.close();
    return context;
  }
}

