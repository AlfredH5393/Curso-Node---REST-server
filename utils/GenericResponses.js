class GenericResponses {

    static responseWithData(msg = '', body, statusCode = 200, errors = [], totalRows = 0){
        return {
            msg,
            body,
            statusCode,
            errors: errors,
            totalRows
        }
    }

    static responseNoData(msg = '', statusCode = 200){
        return {
            msg,
            statusCode, 
        }
    }
}

module.exports = GenericResponses;