import { Statuscategory } from './statuscategory';

export class Status {

  public description: string;
  public iconUrl: string;
  public id: number;
  public name: string;
  public statusCategory: Statuscategory;

  constructor(description: string, iconUrl: string, id: number, name: string, statusCategory: Statuscategory) {
    this.description = description;
    this.iconUrl = iconUrl;
    this.id = id;
    this.name = name;
    this.statusCategory = statusCategory;
  }
}
