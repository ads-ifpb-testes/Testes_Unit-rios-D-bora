export class ResponseModel {
    public data: any;
	public has_error: boolean = false;
	public error: any;

	constructor(data: any, has_error: boolean, error?: any) {
		Object.assign(this, { data, has_error, error });
	}
}