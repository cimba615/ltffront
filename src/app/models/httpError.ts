export class HttpError {
    constructor(
        public code?: number,
        public srcError?: string,
        public url?: string,
        public status?: number
    ) { }

    /**
    * Function used to override toString method
    * @returns {string[]} an string with the error data
    */
    public toString(): string {
        let errTxt = 'Error';
        if (this.code) {
            errTxt += '(' + this.code.toString() + ')';
        }
        errTxt += ': ' + this.srcError;
        return errTxt;
    }

    /**
    * Function used to return a detailed error message
    * @returns {string[]} an string with a detailed error message
    */
    public detailedError(): string {
        let errTxt = toString();
        if (this.url && this.url.length > 0) {
            errTxt += ' (' + this.url + ')';
        }
        return errTxt;
    }
}
