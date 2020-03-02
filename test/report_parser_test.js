// const ReportParser= require('../report_parser')
import ReportParser from '../report_parser.js';
import * as chai from 'chai';

let assert = chai.assert

const parser_config = {
    'working_dir': '/var/tmp/working',
    'filename': 'qa.report',
    'target_field': 'report_status'

};

describe('Report Parser', function () {

    it('nil inputs return error', function () {
        let result = new ReportParser(parser_config, (err, value)=> {console.log(value)})

        console.log(result)
    });

    it('optional remove_after_parse=false returns with file intact', function () {

    });

    it('optional remove_after_parse=true returns with file gone', function() {

    })

    it('valid inputs return with non-nil target field value', function() {

    })
});
