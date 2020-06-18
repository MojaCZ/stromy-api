import { StromI } from '../lib/index';

export class Strom implements StromI {
  IDEX: string | null = null;
  NAME: string | null = null;
  TYP_OBJ: string = "";
  DATIN: string | Date = "";
  DATAK: string | null = null;
  DATVY: string | null = null;
  VLAST: string = "";
  EXURL: string | null = null;
  IDNAZ: string | null = null;
  PRIJEM: string = "";

  loadQuerry = (querry: any) => {
    this.IDEX = querry[0].IDEX !== "" ?  querry[0].IDEX : null;
    this.NAME = querry[0].NAME !== "" ?  querry[0].NAME : null;
    this.TYP_OBJ = querry[0].TYP_OBJ;
    this.DATIN = querry[0].DATIN;
    this.DATAK = querry[0].DATAK !== "" ?  querry[0].DATAK : null;;
    this.DATVY = querry[0].DATVY !== "" ?  querry[0].DATVY : null;;
    this.VLAST = querry[0].VLAST;
    this.EXURL = querry[0].EXURL !== "" ?  querry[0].EXURL : null;;
    this.IDNAZ = querry[0].IDNAZ !== "" ?  querry[0].IDNAZ : null;;
    this.PRIJEM = querry[0].PRIJEM;
  }

  loadParams = (params: StromI) => {
    this.IDEX = params.IDEX !== "" ?  `'${params.IDEX}'` : null;
    this.NAME = params.NAME !== "" ?  `'${params.NAME}'` : null;
    this.TYP_OBJ = `'${params.TYP_OBJ}'`;
    this.DATIN = `'${params.DATIN}'`;
    this.DATAK = params.DATAK !== "" ?  `'${params.DATAK}'` : null;
    this.DATVY = params.DATVY !== "" ?  `'${params.DATVY}'` : null;
    this.VLAST = `'${params.VLAST}'`;
    this.EXURL = params.EXURL !== "" ?  `'${params.EXURL}'` : null;
    this.IDNAZ = params.IDNAZ !== "" ?  `'${params.IDNAZ}'` : null;
    this.PRIJEM = params.PRIJEM == "0" || params.PRIJEM == "" ? `'0'` : "1";
  }

  getQuerry = () : string => {
    let querry: string = `INSERT INTO 
    strom (strom_id, IDEX, NAME, TYP_OBJ, DATIN, DATAK, DATVY, VLAST, EXURL, IDNAZ, PRIJEM) 
    VALUES (NULL, ${this.IDEX}, ${this.NAME}, ${this.TYP_OBJ}, ${this.DATIN}, ${this.DATAK}, ${this.DATVY}, ${this.VLAST}, ${this.EXURL}, ${this.IDNAZ}, ${this.PRIJEM});`;
    return querry
  }

  _get = (): StromI => {
    return {
      "IDEX": this.IDEX,
      "NAME": this.NAME,
      "TYP_OBJ": this.TYP_OBJ,
      "DATIN": this.DATIN,
      "DATAK": this.DATAK,
      "DATVY": this.DATVY,
      "VLAST": this.VLAST,
      "EXURL": this.EXURL,
      "IDNAZ": this.IDNAZ,
      "PRIJEM": this.PRIJEM
    }
  }
};
