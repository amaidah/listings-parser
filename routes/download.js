import express from 'express';
import fs from 'fs';
import json2csv from 'json2csv';

const router = express.Router();

// lib
import order from '../lib/order';

const downloadFile = (file, callback) => {
  fs.writeFile('3noms-data.csv', file, (err) => {
    let msg = 'File saved!';
    if (err) {
      msg = 'Error... contact the scrub who made this!'
    }
    callback(msg);
  })
}

router.post('/', (req, res, next) => {
  const data = [ req.body.parsed ];
  const fields = order;
  const csv = json2csv({
    data,
    fields,
  })

  downloadFile(csv, (msg) => {
    res.send(msg);
  });
})


export default router;
