import { KategI } from '../../../lib/src';

export class Kateg implements KategI {
  KATEG1: string | null = "";
  KATEG2: string | null = "";
  KATEG3: string | null = "";
  KATEG4: string | null = "";
  KATEG5: string | null = "";

  loadQuerry = (querry: any) => {
    if (querry.length <= 0) { return }
    this.KATEG1 = querry[0].KATEG1;
    this.KATEG2 = querry[0].KATEG2;
    this.KATEG3 = querry[0].KATEG3;
    this.KATEG4 = querry[0].KATEG4;
    this.KATEG5 = querry[0].KATEG5;
  }

  getQuerry = (id: number) : string => {
    let querry: string = `INSERT INTO 
    kateg (strom_id, KATEG1, KATEG2, KATEG3, KATEG4, KATEG5) 
    VALUES (${id},${this.KATEG1},${this.KATEG2},${this.KATEG3},${this.KATEG4},${this.KATEG5});`;
    return querry
  }

  loadParams = (params: KategI) => {
    this.KATEG1 = params.KATEG1 !== "" ? `'${params.KATEG1}'` : null;
    this.KATEG2 = params.KATEG2 !== "" ? `'${params.KATEG2}'` : null;
    this.KATEG3 = params.KATEG3 !== "" ? `'${params.KATEG3}'` : null;
    this.KATEG4 = params.KATEG4 !== "" ? `'${params.KATEG4}'` : null;
    this.KATEG5 = params.KATEG5 !== "" ? `'${params.KATEG5}'` : null;
  }
  
  _get = (): KategI => {
    return {
      "KATEG1": this.KATEG1,
      "KATEG2": this.KATEG2,
      "KATEG3": this.KATEG3,
      "KATEG4": this.KATEG4,
      "KATEG5": this.KATEG5,
    }
  }
}