import { Attachable } from './attachable';

/**
 * This class could later be deprecated. Use Attachment with the corersponding mime-type instead.
 */
export class Image implements Attachable {

  public id: number;
  public fileName: string;
  public fileUrl: string;

  constructor(id: number, fileName: string, fileUrl: string) {
    this.id = id;
    this.fileName = fileName;
    this.fileUrl = fileUrl;
  }
}
