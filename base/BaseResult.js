/**
 * this will be used by router when return data to front end
 * status = success or fail
 * data = data that wants to return to front end
 * @author Xingjing Li
 */
class BaseResult{
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}

module.exports = BaseResult;
