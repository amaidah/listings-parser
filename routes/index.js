import express from 'express';
import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';

// util
import formatAddress from '../lib/formatAddress';
import getDataBizTable from '../lib/getDataBizTable';
import formatSeating from '../lib/formatSeating';
import validate from '../lib/validate';

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
  const resObj = {
    url: `${val}`,
    parsed: {},
  };

  // request(val, (error, response, body) => {
  //   resObj.body = body;

  //   fs.writeFile('listing.html', body, (err) => {
  //     if (err) throw err;
  //     console.log('The file has been saved!');
  //   });

  readTestFile('listing.html', file => {
    // re-factor to modules******

    // parsed data object
    let parsed = {};

    // load html
    let ch = cheerio.load(file, { normalizeWhitespace: true });

    // start parse
    const full_name = ch('.biz-page-title').html().trim();
    parsed.full_name = validate(full_name);
    const budget = ch('.business-attribute, .price-range').html().trim();
    parsed.budget = validate(budget.length);
    const phone_number = ch('.biz-phone').html().trim();
    parsed.phone_number = validate(phone_number).replace(/\D+/g, "");

    // address
    const address = ch('.street-address > address').html();
    const formattedAddress = formatAddress(address);
    console.log('index.js address', formattedAddress);

    // website
    let website = ch('.biz-website > a').html();
    parsed.website = validate(website);

    // categories
    const cat = ch('.category-str-list').children();
    const catArr = [];
    for (let i = 0; i < cat.length; i++) {
      catArr.push(cat.eq(i).html());
    }

    // validate that categories exist
    parsed.primary = catArr[0] ? catArr[0] : null;
    parsed.secondary = catArr[1] ? catArr[1] : null;

    // get side business data table
    let bizDataTable = ch('.attribute-key').toArray();

    // credit card
    parsed.cc_accepted = getDataBizTable(bizDataTable, 'Accepts Credit Cards', ch);

    // seating
    parsed.seating = formatSeating(getDataBizTable(bizDataTable, 'Outdoor Seating', ch));

    resObj.parsed = parsed;
    res.send(resObj);
  })

  // })

})


export default router;
