export class Sprint {

  public id: number;
  public name: string;
  public startDate: string;
  public endDate: string;
  public duration: number;
  public state: string;
  public projectId: number;

  constructor(id: number, name: string, startDate: string, endDate: string, state: string) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.state = state;
  }
}
