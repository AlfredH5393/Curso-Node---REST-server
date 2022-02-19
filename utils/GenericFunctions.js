class GenericFunctions {

    static genericResponse(msg = '', body, statusCode = 200, errors = [], totalRows = 0){
        return {
            msg,
            body,
            statusCode,
            errors: errors,
            totalRows
        }
    }
}

module.exports = GenericFunctions;