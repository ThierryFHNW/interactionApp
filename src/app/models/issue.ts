import { Person } from './person';
import { Attachable } from './attachable';
import { Comment as IssueComment } from './comment';
import { Status } from './status';

export interface Issue {

  assignee: Person;
  reporter: Person;
  attachments: Attachable[];
  comments: IssueComment[];
  /** This could be done with properties instead but first we would need to unify the properties of task and userstory,
   * i.e. the title/summary, state/status etc. */
  getId(): number;
  // Returns the Id of the parent-Issue if a parent exists. Else return the id of the issue itself
  getParentIssueId(): number;
  getDescription(): string;
  setDescription(text: string): any;
  getTitle(): string;
  setTitle(text: string): any;
  getStatus(): Status;
  setStatus(status: Status);
  getStoryPoints(): number;
  setStoryPoints(points: number): any;
  update(issue: Issue): any;
  getCopy(): Issue;

}
