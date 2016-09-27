#!/usr/bin/env node

var helper = require('../lib/helper'),
    json2csv = require('json2csv'),
    fields = [''];

/*get_licenses_by_path(process.env.LICENSE_PATH || '.')
  .then(function(licenses) {
    console.log(licenses);
  });*/

try {
  helper.join_licenses(process.env.LICENSE_PATHS.split(',') || [__dirname])
    .then((merged_licenses) => {
      console.log(merged_licenses);
    });

} catch(err) {
  console.log(err.stack);
}