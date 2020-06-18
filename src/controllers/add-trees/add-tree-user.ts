import express from 'express';
import con from '../../dbCon';
import { Observable, Observer } from 'rxjs';
import { Tree } from '../../models';
import { StromI, CommentI, LokalI, PisemneDI, ObrazoveDI, KategI, OhroI } from '../../lib/index';

export function AddTreeUser(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log('PUT REQUEST HERE: ', req.body)
  const T: Tree = new Tree()
  const strom: StromI = req.body.strom;
  const lokal: LokalI = req.body.lokal;
  const pisemneD: PisemneDI = req.body.pisemneD;
  const obrazoveD: ObrazoveDI = req.body.obrazoveD;
  const kateg: KategI = req.body.kateg;
  const comment: CommentI = req.body.comment;
  const ohro: OhroI = req.body.ohro;
  T.loadTree(strom, lokal, pisemneD, obrazoveD, kateg, comment, ohro)

  const idObservable = addTreeQuerry(T);
  idObservable.subscribe((querry:any) => {
    console.log("THIS IS ID OF ADDED TREE")
    res.status(200).json({
      "message": querry
    })
  })
}

const addTreeQuerry = (T: Tree): Observable<any> => {
  const observable: Observable<any> = Observable.create((observer: Observer<any>) => {
    const stromQ: string = T.S.getQuerry();
    con.query(stromQ, (errID, querryID) => {
      if (errID) {
        observer.next({status: "err", message: errID.sqlMessage});
        console.log(errID)
        observer.complete();
        return observable;
      };
      con.query('SELECT LAST_INSERT_ID();', (err, querryId) => {
        let id = querryId[0]['LAST_INSERT_ID()'];
        con.query(T.L.getQuerry(id), (errL, querryL) => {
          if (errL) {
            observer.next({status: "err", message: errL.sqlMessage});
            console.log(errL)
            observer.complete();
            return observable;
          };
          con.query(T.PD.getQuerry(id), (errPD, querryPD) => {
            if (errPD) {
              observer.next({status: "err", message: errPD.sqlMessage});
              console.log(errPD)
              observer.complete();
              return observable;
            };
            con.query(T.OD.getQuerry(id), (errOD, querryOD) => {
              if (errOD) {
                observer.next({status: "err", message: errOD.sqlMessage});
                console.log(errOD)
                observer.complete();
                return observable;
              };
              con.query(T.K.getQuerry(id), (errK, querryK) => {
                if (errK) {
                  observer.next({status: "err", message: errK.sqlMessage});
                  console.log(errK)
                  observer.complete();
                  return observable;
                };
                console.log("K querry", T.K.getQuerry(id))
                con.query(T.C.getQuerry(id), (errC, querryC) => {
                  if (errC) {
                    observer.next({status: "err", message: errC.sqlMessage});
                    console.log(errC)
                    observer.complete();
                    return observable;
                  };
                  con.query(T.O.getQuerry(id), (errO, querryO) => {
                    if (errO) {
                      observer.next({status: "err", message: errO.sqlMessage});
                      console.log(errO)
                      observer.complete();
                      return observable;
                    };
                    observer.next({id, status: "ok"});
                    observer.complete();
                  })
                })
              })
            })
          })
        })
      })
    });
  })
  return observable;
}