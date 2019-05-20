import {Person} from './person';
import {Status} from './status';
import {Attachable} from './attachable';
import {Comment as IssueComment} from './comment';
import {Issue} from './issue';

export class Task implements Issue {


    public id: number;
    public summary: string;
    public description: string;
    public estimate: number;
    public time_spent: number;
    public assignee: Person;
    public reporter: Person;
    public status: Status;
    public userstory_id: number;
    public attachments: Attachable[];
    public comments: IssueComment[];
    public changelog: string[];
    public created: string;

    public constructor(id: number, summary: string, description: string, estimate: number, time_spent: number, assignee: Person,
                       reporter: Person, status: Status, userstory_id: number, attachments: Attachable[], changelog: string[], created: string) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.estimate = estimate;
        this.time_spent = time_spent;
        this.assignee = assignee;
        this.reporter = reporter;
        this.status = status;
        this.userstory_id = userstory_id;
        this.attachments = attachments;
        this.changelog = changelog;
        this.created = created;
    }

    public update(other: Task) {
        this.id = other.id;
        this.summary = other.summary;
        this.description = other.description;
        this.estimate = other.estimate;
        this.time_spent = other.time_spent;
        this.assignee = other.assignee;
        this.reporter = other.reporter;
        this.status = other.status;
        this.userstory_id = other.userstory_id;
        this.attachments = other.attachments;
        // TODO check if update happen with the same task (if not changelog must be consistence)
        this.changelog = other.changelog;
        this.created = other.created;
    }

    public getCopy(): Task {
        const copy: Task = new Task(this.id, this.summary, this.description, this.estimate,
            this.time_spent, this.assignee, this.reporter, this.status, this.userstory_id, this.attachments, this.changelog, this.created);
        return copy;
    }

    getId(): number {
        return this.id;
    }

    getParentIssueId(): number {
        return this.userstory_id;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(text: string) {
        this.description = text;
    }

    getTitle(): string {
        return this.summary;
    }

    setTitle(text: string) {
        this.summary = text;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: Status) {
        this.status = status;
    }

    getStoryPoints() {
        // Subtasks dont have storyPoints
        return 0;
    }

    setStoryPoints(points: number) {
        // Subtasks dont have storyPoints
    }


}

/**
 * the PyWall needs a different formatting from us that he gives us
 * this class maps the data to a format the PyWall expects
 */
export class UpdateTask {
    id: number;
    name: string; // task.summary
    summary: string; // task.summary
    description: string;
    estimate: number;
    time_spent: number;
    assignee: string; // assignee.key
    state: number; // state id
    userstory_id: number; // userstory id
    attachments: number[];
    changelog: string[];
    created: string;

    constructor(task: Task) {
        this.id = task.id;
        this.name = task.summary;
        this.summary = task.summary;
        this.description = task.description;
        this.estimate = task.estimate;
        this.time_spent = task.time_spent;
        this.assignee = task.assignee.key;
        this.state = task.status.id;
        this.userstory_id = task.userstory_id;
        this.attachments = task.attachments.map(a => a.id);
        this.changelog = [];
        this.created = task.created;
    }
}
