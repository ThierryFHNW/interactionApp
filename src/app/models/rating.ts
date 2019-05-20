export class Rating {
  public id: number;
  public rating: number;
  public propertyId: number;
  public sprintId: number;

  constructor(rating: number, propertyId: number, sprintId: number) {
    this.rating = rating;
    this.propertyId = propertyId;
    this.sprintId = sprintId;
  }
}
