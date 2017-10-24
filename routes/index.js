import express from 'express';
import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';

// util
import formatAddress from '../lib/formatAddress';
import getDataBizTable from '../lib/getDataBizTable';
import formatSeating from '../lib/formatSeating';
import validate from '../lib/validate';
import getTimes from '../lib/getTimes';
import formatTimes from '../lib/formatTimes';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/request', (req, res, next) => {
  const { val } = req.query;
  const resObj = {
    url: `${val}`,
    parsed: {},
  };

  request(val, (error, response, body) => {
    // re-factor to modules******
    let parsed = {};

    // load html
    let ch = cheerio.load(body, { normalizeWhitespace: true });

    // start parse
    const full_name = ch('.biz-page-title').html().trim();
    parsed.full_name = validate(full_name);
    const budget = ch('.business-attribute, .price-range').html().trim();
    parsed.budget = validate(budget.length);
    const phone_number = ch('.biz-phone').html().trim();
    parsed.phone_number = validate(phone_number).replace(/\D+/g, "");

    // address
    const address = ch('.street-address > address').html();
    const { one, two, city, state, zip } = formatAddress(address);
    parsed.address_one = one;
    parsed.address_two = two;
    parsed.address_city = city;
    parsed.address_state = state;
    parsed.address_zip = zip;

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

    // load side business data table
    let bizDataTable = ch('.attribute-key').toArray();

    // credit card
    parsed.cc_accepted = getDataBizTable(bizDataTable, 'Accepts Credit Cards', ch);

    // seating
    parsed.seating = formatSeating(getDataBizTable(bizDataTable, 'Outdoor Seating', ch));

    // time
    getTimes(ch, (convertedTimes) => {
      // format military time to daily ranges
      formatTimes(convertedTimes, parsed, (parsed) => {
        resObj.parsed = parsed;
        res.send(resObj);
      })
    });
  })
})


export default router;
