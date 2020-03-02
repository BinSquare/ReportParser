import * as fs from 'fs';

export default class ReportParser{
    mergePath(dir, filename){
        return dir.concat(filename)
    }

    parseFile(filename){
        return error, contents
    }

    parse(config, callback){
        let error, data = fs.readFile(config.filename,'utf8', (err, contents) =>{ 
            if (err){
                console.log(err)
            }
            else{
                console.log(contents)
            }
            
        })

        console.log(error)
        console.log(data )
        return "nothing" 
    }

}