import express from 'express';
import con from '../../dbCon';
import { Observable, Observer } from 'rxjs';
import { Tree } from '../../models/index';

// getTree reaches database find out if tree exists, return true if it does 
// and return strom_id, strom, lokal, pisemneD, obrazoveD, kateg, comment, ohro
// if the id doesn't exists it return tree object in default values
// at frontend check if tree exists with property exist= boolean 
export function GetTreeById(req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = req.body.id;
  const treeObservable = getTreeQuerry(id)
  treeObservable.subscribe(data => {
    res.status(200).json({
      exist: data.exist,
      S: data.S,
      L: data.L,
      PD: data.PD,
      OD: data.OD,
      K: data.K,
      C: data.C,
      O: data.O
    })
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




