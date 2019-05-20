import { AvatarUrls } from './avatarurls';

export class Person {
  public id: number;
  public key: string;
  public name: string;
  public reachable: string;
  public status: string;
  public info: string;
  public version: number;
  public displayName: string;
  public avatarUrl: string;
  public avatarUrls: AvatarUrls;



  constructor(id: number, displayName: string, name: string, key: string, avatarUrl: string, avatarUrls: AvatarUrls, reachable: string,
    status: string, info: string) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.reachable = reachable;
    this.status = status;
    this.info = info;
    this.displayName = displayName;
    this.avatarUrl = avatarUrl;
    this.avatarUrls = avatarUrls;
  }

  public static createFromPywallData(data): Person {
    const id = data['id'];
    const key = data['key'];
    const name = data['name'];
    const displayName = data['displayName'];
    const status = data['status'];
    const reachable = ('reachable' in data) ? data['reachable'] : '';
    const info = ('info' in data) ? data['info'] : '';
    const avatarUrl = ('avatarUrl' in data) ? data['avatarUrl'] : '';
    const avatarUrls: AvatarUrls = ('avatarUrls' in data) ? <AvatarUrls>data['avatarUrl'] : null;

    return new Person(id, displayName, name, key, avatarUrl, avatarUrls, reachable, status, info);
  }

}

