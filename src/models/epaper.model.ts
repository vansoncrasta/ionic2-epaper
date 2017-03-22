export class EPaper {
  id: string = "";
  name: string = "";
  editionID: string = "";
  editionName: string = "";
  noOfPages: number = 0;
  publishDate: Date;

  //Url string after base url.
  url: string = "";

  //This is the prefix for all the thumnails
  //E.g ..UVANI/MAN/2017/03/21/Thumbnails/20170321_<To be added by logic>
  thumbnailsUrl = "";

  //Server side url
  remoteUrl=""
}