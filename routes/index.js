import express from 'express';
import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';

const router = express.Router();

const readTestFile = (file, cb) => {
  fs.readFile(file, 'utf8', (err, data) => {
    cb(data);
  })
}

router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/request', (req, res, next) => {
  const { val } = req.query;
  const resObj = {};
  resObj.url = `${val}`;

  // request(val, (error, response, body) => {
  //   resObj.body = body;

  //   fs.writeFile('listing.html', body, (err) => {
  //     if (err) throw err;
  //     console.log('The file has been saved!');
  //   });

  readTestFile('listing.html', file => {
    resObj.parse = {};

    // load html
    let ch = cheerio.load(file, { ignoreWhiteSpace: true });

    //start parse
    let full_name = ch('.biz-page-title').html();
    resObj.parse.full_name = full_name.trim();

    let budget = ch('.business-attribute, .price-range').html();
    resObj.parse.budget = budget.length;

    let phone_number = ch('.biz-phone').html();
    resObj.parse.phone_number = phone_number.replace(/\D+/g, "");

    res.send(resObj);
  })

  // })

})


export default router;
