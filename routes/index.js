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
    let parsed = {};

    // load html
    let ch = cheerio.load(file, { normalizeWhitespace: true });

    //start parse
    let full_name = ch('.biz-page-title').html().trim();
    parsed.full_name = full_name;
    let budget = ch('.business-attribute, .price-range').html().trim();
    parsed.budget = budget.length;
    let phone_number = ch('.biz-phone').html().trim();
    parsed.phone_number = phone_number.replace(/\D+/g, "");

    let address = ch('.street-address > address').html();
    formatAddress(address, formattedAddress => {
      parsed.address = formattedAddress;
    });

    // website
    let website = ch('.biz-website > a').html();
    if (website !== null) {
      parsed.website = website;
    }

    // category
    let categories = ch('.category-str-list').children().length;
    console.log('categories: ***************', categories);

    // attempt 2
    let cat = ch('.category-str-list').children();
    console.log('cat length: ', cat.length);

    for (let i = 0; i < cat.length; i++) {
      console.log(cat.eq(i).html())
    }
    // ^^^^^^^^^^^^^^^^^^^^^ stops work here
    cat.each( function(i) {
      console.log( 'going through: ', ch(this).text() );
    })

    resObj.parsed = parsed;
    res.send(resObj);
  })

  // })

})


export default router;
