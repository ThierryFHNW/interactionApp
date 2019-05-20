import { Attachable } from './attachable';

export class Attachment implements Attachable {

  public id: number;
  public fileName: string;
  public fileUrl: string;
  public fileMimeType: string;

  constructor(id: number, fileName: string, fileUrl: string, fileMimeType: string) {
    this.id = id;
    this.fileName = fileName;
    this.fileUrl = fileUrl;
    this.fileMimeType = fileMimeType;
  }


  /** Returns the icon-name of the angular material icons to represent this attachment based on mime-type */
  getIconName() {
    switch (this.fileMimeType) {
      case 'image/png': {
        return 'photo';
      }
      case 'image/jpeg': {
        return 'photo';
      }
      case 'application/pdf': {
        return 'picture_as_pdf';
      }
      default: {
        return 'attach_file';
      }
    }
  }
}

