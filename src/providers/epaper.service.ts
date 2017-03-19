import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { File, Transfer } from 'ionic-native';
import { EPaper } from '../models/index';
import * as moment from 'moment';

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
        epaper.thumbnailsFullUrl = this.siteUrl + epaper.url + "/Thumbnails/" + moment(epaper.publishDate).format("YYYYMMDD") + "_1_carousalthumb.jpg";
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

  public downloadEPaperPdfPages(epaperUrl: string, fileDirectory: string, fileNamePrefix: string, startPageNo: number, endPageNo: number) {

    //let url = this.siteUrl + "/" + epaperUrl + "/" + fileNamePrefix + ".PDF";
    let url = null;
    console.log(fileDirectory);

    let promiseChain: Array<any> = [];
    for (let page = startPageNo; page <= endPageNo; page++) {
      url = this.siteUrl + "/" + epaperUrl + "/" + fileNamePrefix + page + ".PDF";
      console.log(page + " Loop: " + url);
      promiseChain.push(this.downloadEPaperPdfPage(url, fileDirectory, fileNamePrefix + page + ".PDF"));
    }
    return Promise.all(promiseChain);
  }

  private downloadEPaperPdfPage(fileUrl, fileDirectory, fileName) {
    const fileTransfer = new Transfer();
    console.log("Remote: " + fileUrl);
    return File.checkFile(fileDirectory, fileName).then(
      (exists) => {
        console.log("File Exists: " + fileName);
      },
      (error) => {
        console.log("File does not exist: " + fileName + ". Attempting to create.");
        return fileTransfer.download(fileUrl, fileDirectory + fileName).then(
          (success) => {
            console.log("Download Successful");
          });
      }
    );
  }


}
