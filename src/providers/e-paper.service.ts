import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";


@Injectable()
export class EPaperService {

  constructor(public http: Http) {
    console.log('Hello EPaper Provider');
  }

  downloadEPaper(): Observable <any> {
    console.log("I am called");
    return this.http.get("https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/12/")
      .map(response => {
        let body = response.text();
        console.log((body.split('.PDF').length-1)/2);
        //console.log(body);
      });
  }


}
