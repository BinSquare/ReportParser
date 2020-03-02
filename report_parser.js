import * as fs from 'fs';

export default class ReportParser {
    mergePath(dir, filename) {
        return dir.concat(filename)
    }

    parseFile(filename) {
        fs.readFile(filename, 'utf8', (err, contents)=>{
            if (err) {
                console.log(err)
            } else {
                console.log(contents)
            }

        })
        return error, contents
    }

    parse(config, callback) {

        this.parseFile(config.filename)

        console.log(error)
        console.log(data)
        return "nothing"
    }

}