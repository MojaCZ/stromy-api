import {CommentI} from '../lib/index';

export class Comment implements CommentI {
  COM_U: string = "";
  COM_A: string = "";
  loadQuerry = (querry: any) => {
    if (querry.length <= 0) { return }
    this.COM_U = querry[0].COM_U;
    this.COM_A = querry[0].COM_A;
  }

  getQuerry = (id: number) : string => {
    let querry: string = `INSERT INTO 
    comment (strom_id, COM_A, COM_U) 
    VALUES (${id}, ${this.COM_A}, ${this.COM_U});`;
    return querry
  }

  loadParams = (params: CommentI) => {
    this.COM_U = `'${params.COM_U}'`;
    this.COM_A = `'${params.COM_A}'`;
  }
  _get = (): CommentI => {
    return {
      "COM_U": this.COM_U,
      "COM_A": this.COM_A,
    }
  }
}