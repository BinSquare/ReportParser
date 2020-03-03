// const ReportParser= require('../report_parser')
import ReportParser from '../report_parser.js';
import chai from 'chai';
import fs from 'fs';
import {promisify} from 'util'

let assert = chai.assert

const default_parser_config = {
    'working_dir': '/var/tmp/working',
    'filename': 'qa.report',
    'target_field': 'report_status'
};

const parser_config = {
    'working_dir': '/var/tmp/working',
    'filename': 'qa.report',
    'target_field': 'report_status',
    'remove_after_parse':true

}

const error_string = "Incomplete inputs, check your inputs!"

describe('Report Parser', function () {

    it('nil inputs return error string', function () {
        let report= new ReportParser
        
        let result = report.parse(parser_config, (err, value)=> {console.log(value)})
        assert.equal(result, error_string)
    });

    it('optional remove_after_parse=false returns with file intact', function () {
    });

    it('optional remove_after_parse=true returns with file gone', function() {
    })

    it('valid inputs return with non-nil target field value', function() {
        let report= new ReportParser
        
        let result = report.parse(parser_config, (err, value)=> {console.log(value)})

        assert.isNotNaN(result, "Result is not nil.")
    })
});


describe('Directory merge', function(){
    it('nil inputs returns empty string', function(){
        let parser = new ReportParser
        let result = parser.mergePath("","")
        assert.equal( result, "")
    });

    it('valid inputs concats strings', function(){
        let parser = new ReportParser
        let result = parser.mergePath("/test", "sample.report")
        assert.equal(result, "./test/sample.report")
    })
})

describe('Remove file after parse', function(){
    it('remove_after_parse is true, return anything except false', async() =>{
        let parser = new ReportParser
        
        //ensure file exists
        fs.writeFileSync('./test.txt', "hello world")

        let result = await parser.removeFile(true, './test.txt')

        assert.notEqual(result, false)
    })

    it('remove after_parse is false, return false', function(){
        let parser = new ReportParser
        let result = parser.removeFile(false, 'test.txt')

        assert.equal(result, false)
    })
})