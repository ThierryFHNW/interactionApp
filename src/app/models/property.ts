import { StatusEnum } from './statusEnum';

export class Property {
  public id: number;
  public name: string;
  public status: StatusEnum;
  public projectId: number;
  public ratingAveragesPerDay: any[]; // date with rating average
  public ratingsPerDay: any[]; // date with rating

  public rating: number;
  // create a list which contains status of 5 stars
  public starList = [true, true, true, true, true];

  public ratingAverage: number;
  // create a list which has 3 status
  public starListAverage = [0, 0, 0, 0, 0];

  // status type boolean for slide toggle
  public statusBoolean: boolean;

  public borderColor: string;

  constructor(id: number, name: string, status: StatusEnum, projectId: number, rating: number) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.projectId = projectId;
    this.rating = rating;
  }
}
