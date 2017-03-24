import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { EPaper } from "../models/epaper.model";
import { EPaperService } from '../providers/index';

@Injectable()
export class UserSettingsService {

  constructor(public storage: Storage, public epaperService: EPaperService, private events: Events) {
    storage.ready().then(() => {
      console.log("Storage driver : " + this.storage.driver);
    });
  }

  public setFavouriteEPaper(epaper: EPaper): Promise<any> {    
    return this.storage.set(this.getFavItemKey(epaper), this.getFavItemValue(epaper)).then(
      () => {this.events.publish('favourite:updated');}
    );
  }

  public isFavouriteEPaper(epaper: EPaper): Promise<any> {
    return this.storage.get(this.getFavItemKey(epaper));
  }

  public removeFavouriteEPaper(epaper: EPaper): Promise<any> {
    return this.storage.remove(this.getFavItemKey(epaper)).then(
      () => {this.events.publish('favourite:updated');}
    );
  }

  public getAllFavouritesStorage() {
    return this.storage;
  }

  private getFavItemKey(epaper: EPaper) {
    return epaper.id + "_" + epaper.editionID;
  }

  private getFavItemValue(epaper: EPaper): EPaper {
    //return JSON.stringify({ id: epaper.id, name: epaper.name, editionID: epaper.editionID, editionName: epaper.editionName });
    let tempEPaper: EPaper =  new EPaper;
    tempEPaper.id = epaper.id;
    tempEPaper.name = epaper.name;
    tempEPaper.editionID = epaper.editionID;
    tempEPaper.editionName = epaper.editionName;
    return tempEPaper;
  }

}
