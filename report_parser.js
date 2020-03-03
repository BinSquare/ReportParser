import fs from 'fs';
import path from 'path';

export default class ReportParser {
    mergePath(dir, filename) {
        dir = '.' + dir
        let mergedDir = dir.concat('/', filename)
        if (mergedDir.endsWith('/') == false) {
            return mergedDir
        }
        return ""
    }

    parseFile(filename) {
        fs.readFile(filename, 'utf8', (err, contents) => {
            if (err) {
                return err
            } else {
                return contents.toString()
            }

        })
    }

    removeFile(remove_after_parse, filepath) {
        if (true == remove_after_parse) {
            return fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log("success")
            })
        } else {
            return false
        }
    }

    parse(config, callback) {
        let filepath = this.mergePath(config.working_dir, config.filename)
        return this.parseFile(filepath)
    }
}