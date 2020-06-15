import express from 'express';
import con from '../../dbCon';
import { Observable, Observer } from 'rxjs';
import { Tree } from '../../models/index';

export function GetNTrees(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(req.body)
  console.log(req.body.start)
  const start = req.body.start || 0;
  let n = req.body.n || 100;
  if (n > 500) {n=500};
  
  let Trees: Tree[] = []

  con.query(`SELECT * FROM strom LIMIT ${start},${n};`, (err, querry) => {
    if(err) {
      res.status(200).json({
        "status": 'err',
        "message": err.sqlMessage
      })
      console.log(err)
    }

    // for each id from querry
    for(let i: number=0; i<querry.length; i++) {
      let id = querry[i].strom_id;
      let treeObservable = getTreeQuerry(id)
      treeObservable.subscribe(T => {
        T.id = id;
        Trees.push(T);
        if(i+1 == querry.length) {
          res.status(200).json({
            "status": 'ok',
            "trees": Trees
          })
        }
      })
    }


  })
}

const getTreeQuerry = (id: number): Observable<Tree> => {
  let T: Tree = new Tree()

  const observable: Observable<Tree> = Observable.create((observer: Observer<Tree>) => {
    con.query(`SELECT * FROM strom where strom_id=${id} LIMIT 0,1`, (err, querry) => {
      if (err) throw err;
      if (querry.length > 0) {
        T.exist = true;
        T.S.loadQuerry(querry);
        con.query(`SELECT * FROM lokal where strom_id=${id} LIMIT 0,1`, (errL, querryL) => {
          if (errL) throw errL;
          T.L.loadQuerry(querryL);
          con.query(`SELECT * FROM pisemne_d where strom_id=${id} LIMIT 0,1`, (errPD, querryPD) => {
            if (errPD) throw errPD;
            T.PD.loadQuerry(querryPD);
            con.query(`SELECT * FROM obrazove_d where strom_id=${id} LIMIT 0,1`, (errOD, querryOD) => {
              if (errOD) throw errOD;
              T.OD.loadQuerry(querryOD);
              con.query(`SELECT * FROM kateg where strom_id=${id} LIMIT 0,1`, (errK, querryK) => {
                if (errK) throw errK;
                T.K.loadQuerry(querryK);
                con.query(`SELECT * FROM comment where strom_id=${id} LIMIT 0,1`, (errC, querryC) => {
                  if (errC) throw errC;
                  T.C.loadQuerry(querryC);
                  con.query(`SELECT * FROM ohro where strom_id=${id} LIMIT 0,1`, (errO, querryO) => {
                    if (errO) throw errO;
                    T.O.loadQuerry(querryO);
                    observer.next(T);
                    observer.complete();
                  });
                });
              });
            });
          });
        });
      } else {
        observer.next(T);
        observer.complete();
      }
    })
  })
  return observable;
}
