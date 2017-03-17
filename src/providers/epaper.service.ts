import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { File, Transfer } from 'ionic-native';
import { EPaper } from '../models/index';

@Injectable()
export class EPaperService {

  private baseUrl = "https://ionic2-epaper.firebaseio.com";
  private siteUrl = null;

  constructor(public http: Http) { }

  public getAllEPapers(): Observable<any> {
    return this.http.get(this.baseUrl + "/site_01.json")
      .map(response => {
        this.siteUrl = response.json().url;
        return response.json().epapers;
      });
  }

  getEPaperDetails(epaper: EPaper): Observable<EPaper> {
    return this.http.get(this.siteUrl + "/" + epaper.url + "/")
      .map(response => {
        let body = response.text();
        epaper.noOfPages = ((body.split('.PDF').length - 1) / 2);
        return epaper;
      });
  }

  createDirectory(storageDirectory, directory): Promise<any> {

    let pathSplit = directory.split('/');
    let subPath: string[] = new Array(5);

    /* This approach calls all promises in Parallel. Need to call it sequential.
   let promiseChain: Array<any> = [];   
   for (var i = 0; i < pathSplit.length; i++) {
     console.log(subPath);
     promiseChain.push(() => this.createFolder(storageDirectory, subPath, pathSplit[i]));
     subPath = subPath + "/" + pathSplit[i];
   }    
   return Promise.all(promiseChain);
   */

    //Workaround
    subPath[0] = "";
    for (let i = 1; i <= pathSplit.length; i++) {
      subPath[i] = subPath[i - 1] + "/" + pathSplit[i - 1];
    }

    return this.createFolder(storageDirectory, subPath[0], pathSplit[0]).then(
      () => {
        return this.createFolder(storageDirectory, subPath[1], pathSplit[1]).then(
          () => {
            return this.createFolder(storageDirectory, subPath[2], pathSplit[2]).then(
              () => {
                return this.createFolder(storageDirectory, subPath[3], pathSplit[3]).then(
                  () => {
                    return this.createFolder(storageDirectory, subPath[4], pathSplit[4]).then();
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  createFolder(storageDirectory, path, folderName): Promise<any> {
    console.log("Attempt to create folder : " + storageDirectory + "/" + path + "/" + folderName);
    return File.createDir(storageDirectory + path, folderName, true)
      .then(
      (success) => {
        console.log("Result of create folder : " + storageDirectory + "/" + path + "/" + folderName);
        console.log(success);
      },
      (error) => {
        console.log("Result of create folder : " + storageDirectory + "/" + path + "/" + folderName);
        console.log(error);
      }
      );
  }

  public downloadEPaperPagePDF(epaperUrl: string, fileDirectory: string, fileName: string) {
    const fileTransfer = new Transfer();
    let url = this.siteUrl + "/" + epaperUrl + "/" + fileName + ".PDF";
    console.log(url);
    console.log(fileDirectory);
    return fileTransfer.download(url, fileDirectory + fileName + ".PDF").then(
      (success) => {
        console.log("Download Successful");
      });
  }
}
