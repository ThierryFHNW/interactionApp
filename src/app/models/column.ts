import { Status } from './status';
import { Task } from './task';

export class Column {

    public name: string;
    public statuses: Status[];

    constructor(name: string, statuses: Status[]) {
        this.name = name;
        this.statuses = statuses;
    }

    /**
     * Returns true if this column should support adding new issues.
     * Current implementation: They column must have a status of the statuscategory with key 'new'. This
     * refers to 'TO DO'-Status
     */
    supportsAddingIssues() {
        this.statuses.forEach((status) => {
            if (status.statusCategory.key === 'new') {
                return true;
            }
        });
        return false;
    }

    /**
     * Checks if the task has a status that matches one of the statuses of this column.
     * Used to place the task in the correct column^.
     */
    statusMatchesTask(task: Task): boolean {
        let taskStatusMatchesColumnStatus = false;

        for (const status of this.statuses) {
            if (task.status.id === status.id) {
                taskStatusMatchesColumnStatus = true;
                break;
            }
        }
        return taskStatusMatchesColumnStatus;
    }

    /**
     * Used as class-string in the template. Method should probably be moved to utility class
     */
    getStatusesIdsAsString(): string {
        let statusesIds = '';
        this.statuses.forEach(status => {
            statusesIds += ' ' + status.id;
        });
        return statusesIds;
    }
}
