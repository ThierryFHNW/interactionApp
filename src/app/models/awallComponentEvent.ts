/** Custom-Data-Object to be used with the Listener-interface. Allows to handle Listener-Events to be handled by name */
export class AwallComponentEvent {

    private _name: string;
    private _value: Object;

    constructor(name: string, value: Object) {
        this._name = name;
        this._value = value;
    }

    public get name(): string {
        return this._name;
    }

    public get value(): Object {
        return this._value;
    }


}

