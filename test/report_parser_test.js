// const ReportParser= require('../report_parser')
import ReportParser from '../report_parser.js';
import chai from 'chai';
import fs from 'fs';
import {
    promisify
} from 'util'

let assert = chai.assert

const default_parser_config = {
    'working_dir': '/var/tmp/working',
    'filename': 'qa.report',
    'target_field': 'report_status'
};

const parser_config_complete = {
    'working_dir': '/var/tmp/working',
    'filename': 'qa.report',
    'target_field': 'report_status',
    'remove_after_parse': true
}

const parser_config_incomplete = {
    'working_dir': '',
    'filename': '',
    'target_field': '',
    'remove_after_parse': true
}

const error_string = "Incomplete inputs, check your inputs!"

describe('Report Parser', function () {

    it('nil inputs return error string', function () {
        let report = new ReportParser

        let result = report.parse(parser_config_incomplete, (err, value) => {
            console.log(value)
        })
        assert.equal(result, error_string)
    });

    it('valid inputs return with non-nil target field value', function () {
        let report = new ReportParser

        let result = report.parse(parser_config_complete, (err, value) => {
            console.log(value)
        })

        assert.isNotNaN(result, "OK")
    })
});


describe('Directory merge', function () {
    it('nil inputs returns empty string', function () {
        let parser = new ReportParser
        let result = parser.mergePath("", "")
        assert.equal(result, "")
    });

    it('valid inputs concats strings', function () {
        let parser = new ReportParser
        let result = parser.mergePath("/test", "sample.report")
        assert.equal(result, "./test/sample.report")
    })
})

describe('Remove file after parse', function () {
    it('remove_after_parse is true, return non-false ', async () => {
        let parser = new ReportParser

        //ensure file exists
        fs.writeFileSync('./test.txt', "hello world")

        let result = await parser.removeFile(true, './test.txt')

        assert.notEqual(result, false)
    })

    it('remove after_parse is false, return false', function () {
        let parser = new ReportParser
        let result = parser.removeFile(false, 'test.txt')

        assert.equal(result, false)
    })
})

describe('Parse lines', function () {
    it('parse line logs each line', async () => {
        let parser = new ReportParser

        let value = await parser.parseLine("./test/assets/qa.report", "x")
        assert.equal(value, "38525348573.230")
    })
})