import express from 'express';
import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';

// util
import formatAddress from '../lib/formatAddress';

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
    // parsed data object
    let parsed = {};

    // load html
    let ch = cheerio.load(file, { normalizeWhitespace: true });

    // start parse
    let full_name = ch('.biz-page-title').html().trim();
    parsed.full_name = full_name;
    let budget = ch('.business-attribute, .price-range').html().trim();
    parsed.budget = budget.length;
    let phone_number = ch('.biz-phone').html().trim();
    parsed.phone_number = phone_number.replace(/\D+/g, "");

    // address
    let address = ch('.street-address > address').html();
    formatAddress(address, formattedAddress => {
      parsed.address = formattedAddress;
    });

    // website
    let website = ch('.biz-website > a').html();
    if (website !== null) {
      parsed.website = website;
    }

    // categories
    const cat = ch('.category-str-list').children();
    const catArr = [];
    for (let i = 0; i < cat.length; i++) {
      catArr.push(cat.eq(i).html());
    }

    // validate that categories exist
    parsed.primary = catArr[0] ? catArr[0] : null;
    parsed.secondary = catArr[1] ? catArr[1] : null;

    // credit card check
    let bizDataTable = ch('.attribute-key').toArray();
    let cc_accepted = null;

    // use es6 for.. of to allow break on first match
    for (let node of bizDataTable) {
      if (ch(node).html().trim() === 'Accepts Credit Cards') {
        // save closest 'dl' parent to get access to inner text nodes
        cc_accepted = ch(node).closest('dl');
        break;
      }
    }

    // validate cc_accepted exists and 'dd' child exists
    if (cc_accepted !== null && cc_accepted.children('dd') !== null) {
      // get value from 'dd' child, trim, and store
      cc_accepted = cc_accepted.children('dd').text().trim();
    }
    parsed.cc_accepted = cc_accepted;

    resObj.parsed = parsed;
    res.send(resObj);
  })

  // })

})


export default router;
