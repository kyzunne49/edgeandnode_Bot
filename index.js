const puppeteer = require ('puppeteer');
const fs = require ('fs');
const readlineSync = require ('readline-sync');
const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const { faker } = require('@faker-js/faker');
const chalk = require('chalk');
const moment = require ('moment');
const { ifError } = require('assert');

function getString(start, end, all) {
    const regex = new RegExp(`${start}(.*?)${end}`);
    const str = all
    const result = regex.exec(str);
    return result;
}

const fakeName = () => {
    const randomName = faker.name.findName().toLowerCase();
    const random1 = faker.word.adjective().toLowerCase();
    const random2 = faker.word.adverb().toLowerCase();
    const name = random1 + randomName;
    const result = {
        firstName: random1.replace(/\s/g, ""),
        lastName: randomName.replace(/\s/g, ""),
        name: name.replace(/\s/g, "")
    }
    return result
};

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const getEmailRandom = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const result = [];
            $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
                result.push($(element).text());
            });
            resolve(result);
        })
        .catch(err => reject(err));
});

 const functionGetLink = (email, domain) => new Promise((resolve, reject) => {
     fetch(`https://generator.email/${domain}/${email}`, {
         method: "get",
         headers: {
             accept:
                 "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
             "accept-encoding": "gzip, deflate, br",
             cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
             "upgrade-insecure-requests": 1,
             "user-agent":
                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
         }
     })
         .then(res => res.text())
         .then(text => {
             const $ = cheerio.load(text);
             const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p:nth-child(4) > span").text()
             resolve(src);
         })
         .catch(err => reject(err));
 });

(async () => {

    let ulang;
    while (!ulang) {
        
    



const domainList = await getEmailRandom();
const domain = domainList[Math.floor(Math.random() * domainList.length)];

const name = fakeName().name.replace("'", '');
const email = `${name}${await randstr(5)}@${domain}`;
// console.log(email);


  console.log(`[ ${moment().format("HH:mm:ss")} ]`,chalk.yellow('Starting BOT'));
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://edgeandnode.com/geo/');

  const fieldEmail = await page.$('input[class="jsx-1448363648 css-8ci419"]');
  await fieldEmail.type(email);

  
  const newPageGaes = await browser.newPage();
  await newPageGaes.goto(`https://generator.email/${email}`);

  if (!newPageGaes === false) {
    console.log(`[ ${moment().format("HH:mm:ss")} ]`,chalk.white('Tidak masuk OTP'));
  }

  await browser.close();
  await page.waitForTimeout(1000);

  
  console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Registering Email ${email}`));
  console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Data Berhasil di simpan di dataakun.txt`));

  const dataresult = fs.appendFileSync ('dataakun.txt', `${email} \n`);
  //console.log(dataresult);
  
  //await page.screenshot({path: 'example.png'});
  
  console.log(`[ ${moment().format("HH:mm:ss")} ]`,chalk.yellow('Closes BOT'));

  console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.blue ("======================================================"));
} 
  

})();