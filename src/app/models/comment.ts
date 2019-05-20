import { Person } from './person';

export class Comment {

  public id: number;
  public content: string;
  public created: Date;
  public author: Person;

  constructor(id: number, content: string, created: Date, author: Person) {
    this.id = id;
    this.content = content;
    this.created = created;
    this.author = author;
  }

  public static createFromPywallData(data): Comment {
    const id = data['id'];
    const content = data['content'];
    const created = new Date(data['created']);
    const author: Person = Person.createFromPywallData(data['author']);

    return new Comment(id, content, created, author);
  }

}

