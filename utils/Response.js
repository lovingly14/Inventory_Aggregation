class Response {
    constructor (res, data, message, success = true, responseCode = 200) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.responseCode = responseCode;
        this.res = res;
        this.send();
    }

    /**
     * Send resposne
     */
    send () {
        this.res.status(this.responseCode).send(
            {
                message: this.message,
                success: this.success,
                status: this.responseCode,
                data: this.data
            }
        );
    }
}

module.exports = { Response };
