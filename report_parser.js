export default class ReportParser{
    constructor(dir, filename, field){
        //checks valid inputs

        this._dir = dir;
        this._filename= filename;
        this._field = field
    }

    parse(config, callback){
        return callback(config)
    }

}
