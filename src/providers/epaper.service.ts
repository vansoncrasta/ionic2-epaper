import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";


@Injectable()
export class EPaperService {

  private baseUrl = "https://ionic2-epaper.firebaseio.com";

  constructor(public http: Http) {}

  public getAllEPapers(): Observable<any> {
    return this.http.get(this.baseUrl + "/site_01.json")
      .map(response => {
        console.log(response);
        return response.json().epapers;
      });
  }

  getEPaperDetails() {

  }

  downloadEPaper(): Observable<any> {
    console.log("I am called");
    return this.http.get("https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/12/")
      .map(response => {
        let body = response.text();
        console.log((body.split('.PDF').length - 1) / 2);
        //console.log(body);
      });
  }


}
