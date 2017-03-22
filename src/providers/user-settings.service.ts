import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EPaper } from "../models/epaper.model";

@Injectable()
export class UserSettingsService {

  constructor(public storage: Storage) {
    storage.ready().then(() => {
      console.log("Storage driver : " + this.storage.driver);
    });
  }

  public setFavouriteEPaper(epaper: EPaper): Promise<any> {
    return this.storage.set(this.getFavItemKey(epaper), this.getFavItemValue(epaper));
  }

  public isFavouriteEPaper(epaper: EPaper): Promise<any> {
    return this.storage.get(this.getFavItemKey(epaper));
  }

  public removeFavouriteEPaper(epaper: EPaper): Promise<any> {
    return this.storage.remove(this.getFavItemKey(epaper));
  }

  public getAllFavouritesStorage() {
    return this.storage;
  }

  private getFavItemKey(epaper: EPaper) {
    return epaper.id + "_" + epaper.editionID;
  }

  private getFavItemValue(epaper: EPaper) {
    //return JSON.stringify({ id: epaper.id, name: epaper.name, editionID: epaper.editionID, editionName: epaper.editionName });
    return epaper;
  }

}
