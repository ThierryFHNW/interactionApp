export class Motto {
  public id: number;
  public motto: string;
  public version: number;
  public projectId: number;

  constructor(id: number, motto: string, projectId: number) {
    this.id = id;
    this.motto = motto;
    this.projectId = projectId;
  }
}
