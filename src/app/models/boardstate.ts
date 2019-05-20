import { Column } from './column';

// TODO rename to 'BoardConfiguration'
export class BoardState {

    public columns: Column[] = [];

    constructor(columns: Column[]) {
        this.columns = columns;
    }

    /**
     * Returns an Array of all statuses of all columns
     */
    getAllStatuses() {
        const statuses = [];
        this.columns.forEach(column => {
            column.statuses.forEach(status => {
                statuses.push(status);
            });
        });
        return statuses;
    }

    /**
     * Returns the Status-Object with <statusId> or null if not found.
     * If there are multiple Status with the same id only the last found match will be returned.
     */
    getStatus(statusId: number) {
        let result = null;
        this.columns.forEach(column => {
            column.statuses.forEach(status => {
                if (Number(status.id) === statusId) {
                    result = status;
                }
            });
        });
        return result;
    }


    // TODO refactor/unify the way a statusobject can be retrieved
    /**
     * Returns the first Status-Object of the column with <columnName>
     * Assumes every column has at least one status.
     */
    getStatusForColumn(columnName: string) {
        let result = null;
        this.columns.forEach(column => {
            if (column.name === columnName) {
                result = column.statuses[0];
            }
        });
        return result;
    }
}
