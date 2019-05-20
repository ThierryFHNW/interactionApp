import { Person } from './person';
import { Status } from './status';
import { Priority } from './priority';
import { Task } from './task';
import { Attachable } from './attachable';
import { Issue } from './issue';
import { Comment as IssueComment } from './comment';

export class Userstory implements Issue {
  private disabled: boolean; // This is used for disabling / enabling dragging with cdkDragDisabled
  public assignee: Person;
  public description: string;
  public estimate: number;
  public id: number;
  public key: string;
  public name: string;
  public priority: Priority;
  public reporter: Person;
  public state: Status;
  public tasks: Task[];
  public project_id: string;
  public attachments: Attachable[];
  public rank: string;
  public storyPoints: number;
  // TODO implement
  public comments: IssueComment[] = [];
  public changelog: string[];
  public created: string;

  constructor(assignee: Person,
    description: string,
    estimate: number,
    id: number,
    key: string,
    name: string,
    priority: Priority,
    reporter: Person,
    state: Status,
    project_id: string,
    tasks: Task[],
    attachments: Attachable[],
    storyPoints: number,
    changelog: string[],
    created: string) {
    this.assignee = assignee;
    this.description = description;
    this.estimate = estimate;
    this.id = id;
    this.key = key;
    this.name = name;
    this.priority = priority;
    this.reporter = reporter;
    this.state = new Status(state.description, state.iconUrl, state.id, state.name, state.statusCategory);
    this.project_id = project_id;
    this.storyPoints = storyPoints;
    this.tasks = [];
    tasks.forEach(singleTask => {
      this.tasks.push(
        new Task(
          singleTask.id,
          singleTask.summary,
          singleTask.description,
          singleTask.estimate,
          singleTask.time_spent,
          singleTask.assignee,
          singleTask.reporter,
          singleTask.status,
          singleTask.userstory_id,
          singleTask.attachments,
          singleTask.changelog,
          singleTask.created));
    });
    this.attachments = attachments;
    this.changelog = changelog;
    this.created = created;
  }

  public update(other: Userstory) {
    this.assignee = other.assignee;
    this.description = other.description;
    this.estimate = other.estimate;
    this.id = other.id;
    this.key = other.key;
    this.name = other.name;
    this.priority = other.priority;
    this.reporter = other.reporter;
    this.state = other.state;
    this.tasks = other.tasks;
    this.project_id = other.project_id;
    this.attachments = other.attachments;
    this.storyPoints = other.storyPoints;
    // TODO check if update happen with the same task (if not changelog must be consistence)
    this.changelog = other.changelog;
    this.created = other.created;
  }

  public getCopy(): Userstory {
    const copy: Userstory = new Userstory(this.assignee, this.description, this.estimate,
      this.id, this.key, this.name, this.priority, this.reporter,
      this.state, this.project_id, this.tasks, this.attachments, this.storyPoints, this.changelog, this.created);
    return copy;
  }

  disable(): void {
    this.disabled = true;
  }

  enable(): void {
    this.disabled = false;
  }

  isDisabled() {
    return this.disabled;
  }

  getId(): number {
    return this.id;
  }
  getParentIssueId(): number {
    // For issues with no parent we just return the issue-id again
    return this.id;
  }
  getDescription(): string {
    return this.description;
  }
  setDescription(text: string) {
    this.description = text;
  }
  getTitle(): string {
    return this.name;
  }
  setTitle(text: string) {
    this.name = text;
  }
  getStatus() {
    return this.state;
  }
  setStatus(status: Status) {
    this.state = status;
  }
  getStoryPoints() {
    return this.storyPoints;
  }
  setStoryPoints(points: number) {
    this.storyPoints = points;
  }
}

/**
 * the PyWall needs a different formatting from us that he gives us
 * this class maps the data to a format the PyWall expects
 */
export class UpdateUserstory {
  id: number;
  name: string;
  description: string;
  priority: number;
  reporter: string; // reporter.key
  assignee: string; // assignee.key
  state: number;
  estimate: string;
  priorityAsName: string;
  attachments: number[];
  storyPoints: number;
  changelog: string[];
  created: string;

  constructor(userstory: Userstory) {
    this.assignee = userstory.assignee.key;
    this.description = userstory.description;
    this.id = userstory.id;
    this.name = userstory.name;
    this.priority = userstory.priority.id;
    this.reporter = userstory.reporter.key;
    this.state = userstory.state.id;
    this.estimate = '';
    this.priorityAsName = userstory.priority.name;
    this.attachments = userstory.attachments.map(a => a.id);
    this.storyPoints = userstory.storyPoints;
    this.changelog = [];
    this.created = userstory.created;
  }
}
