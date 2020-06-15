import express from 'express';
import con from '../dbCon';

export function CountTrees(req: express.Request, res: express.Response, next: express.NextFunction) {
  const start = req.body.start || 0;
  let n = req.body.n || 100;
  if (n > 500) {n=500};
  console.log(start, n)
  con.query(`SELECT COUNT(*) FROM strom;`, (err, querry) => {
    if(err) {
      res.status(200).json({
        "status": 'err',
        "message": err.sqlMessage
      })
      console.log(err)
    }
    res.status(200).json({
      "status": 'ok',
      "count": querry[0]['COUNT(*)']
    })
  })
}
