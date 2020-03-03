import fs from 'fs';
import path from 'path';
import {
    promisify
} from 'util'
import readline from 'readline'

const readFile = promisify(fs.readFile)
const deleteFile = promisify(fs.unlink)

export default class ReportParser {
    mergePath(dir, filename) {
        dir = '.' + dir
        let mergedDir = dir.concat('/', filename)
        if (mergedDir.endsWith('/') == false) {
            return mergedDir
        }
        return ""
    }

    //TODO: deprecated in favor parseline()
    async parseFile(filename) {
        try {
            const text = await readFile(filename, 'utf8');
            return text
        } catch (err) {
            throw (err)
        }
    };

    async parseLine(filename, key) {
        const reader = readline.createInterface({
            input: fs.createReadStream(filename),
        })

        for await (const line of reader) {
            if (line.includes(":") && line.includes(key)) {
                var trimmedLine = line.substring(line.indexOf(":") + 2)
                console.log(trimmedLine)
                return trimmedLine
            }

        }
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

    async parse(config, callback) {

        let filepath = this.mergePath(config.working_dir, config.filename)
        let value = await this.parseLine(filepath, config.target_field)
        return value

    }
}