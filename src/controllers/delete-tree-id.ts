import express from 'express';
import con from '../dbCon';

export function DeleteTreeId(req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = req.body.id;
  console.log(req.body)
  console.log("Delete: ", id, req.body.s);
  if(id === undefined) {
    res.status(200).json({
      status: "err",
      message: 'you have to provide id'
    })
    return;
  }
  const querry = `DELETE FROM strom WHERE strom_id=${id}`;
  con.query(querry, (err, querry) => {
    if(err) {
      res.status(200).json({
        status: "err",
        message: "unable to find this id"
      })
    };
    res.status(200).json({
      status: "ok",
      message: id
    })
  })
}