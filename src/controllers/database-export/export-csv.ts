import express from 'express';
import con from '../../dbCon';
const Json2csvParser = require('json2csv').Parser;

export function GetTreeCSV(req: express.Request, res: express.Response, next: express.NextFunction) {
  con.query(`SELECT * FROM strom`, (err, querry) => {
    if (err) throw err;
    
    const json2csvParser = new Json2csvParser({header: true});
    const csv = json2csvParser.parse(querry);
    res.setHeader('Content-disposition', 'attachment; filename=strom.csv')
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  })
}
