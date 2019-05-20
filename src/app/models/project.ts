export class Project {
  public id: number;
  public key: string;
  public version: number;
  public teamname: string;

  constructor(id: number, key: string, teamname: string) {
    this.id = id;
    this.key = key;
    this.teamname = teamname;
  }
}


