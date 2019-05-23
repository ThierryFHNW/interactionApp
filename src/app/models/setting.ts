export class Setting {
    projectName: string;
    pyWallServer: string;
    syncServer: string;
    sprintId: string;

    public constructor(projectName: string, pyWallServer: string, syncServer: string, sprintId: string) {
        this.projectName = projectName;
        this.pyWallServer = pyWallServer;
        this.syncServer = syncServer;
        this.sprintId = sprintId;
    }
}
