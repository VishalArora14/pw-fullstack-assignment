const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  const url = ''; //removed website link
  await page.goto(url);

  // Wait for the desired elements to be visible
  await page.waitForSelector('.tableRow');

  // Extract the desired data
  const data = await page.$$eval('.tableRow', rows => {
    return rows.map(row => {
      const title = row.querySelector('p:nth-child(1)').textContent;
      const date = row.querySelector('p:nth-child(2)').textContent;
      const time1 = row.querySelector('p:nth-child(3)').textContent;
      const time2 = row.querySelector('p:nth-child(4)').textContent;
      const location = row.querySelector('p:nth-child(5)').textContent;
      const room = row.querySelector('p:nth-child(6)').textContent;
      const status1 = row.querySelector('span > p:nth-child(1)').textContent;
      const status2 = row.querySelector('span > p:nth-child(2)').textContent;

      return {
        title,
        date,
        time1,
        time2,
        location,
        room,
        status1,
        status2,
      };
    });
  });

  // Convert the data to JSON format
  const jsonData = JSON.stringify(data, null, 2);

  // Save the JSON data to a file
  fs.writeFileSync('scraped_data.json', jsonData);

  // Close the browser
  await browser.close();
})();