import { ObrazoveDI } from '../lib/index';

export class ObrazoveD implements ObrazoveDI {
  URL: string[] = [];

  loadQuerry = (querry: any) => { // 1:n
    if (querry.length <= 0) { return }
    for (let i: number = 0; i < querry.length; i++) {
      this.URL.push = querry[i].URL;
    }
  }

  // do later for multiple URLS
  getQuerry = (id: number) : string => {
    let querry: string = `INSERT INTO 
    obrazove_d (strom_id, URL) 
    VALUES (${id},${this.URL[0]});`;
    return querry
  }

  loadParams = (params: any) => {
    this.URL = []
    for(let i: number = 0; i<params.URL.length; i++) {
      this.URL.push(`'${params.URL[i]}'`)
    }
  }

  _get = (): ObrazoveDI => {
    return {
      "URL": this.URL
    }
  }
}