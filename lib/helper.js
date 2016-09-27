var checker = require('license-checker'),
    path = require('path'),
    json2csv = require('json2csv');
 
function get_license(path) {
    var promise = new Promise(function(resolve, reject) {
        checker.init({
            start: path
        }, function(err, json) {
            if (err) {
                //Handle error
                reject(err); 
            } else {
                //The sorted json data
                resolve(json); 
            }
        });
    });
    return promise;
}

function get_licenses_by_path(path_) {
  return get_license(path_)
    .then(function(licenses) {
      for(var key in licenses) {
      }
      return licenses;
    })
    .catch(function(err) {
      console.log(err);
    })
}

function join_licenses(paths) {
    return Promise.all(paths.map(function(path) {
            return get_licenses_by_path(path);
        }))
        .then(merge_licenses)
        .then(remove_apigee_licenses)
        .then(get_version_field)
        .then(convert_to_no_key_objects)
        .then(convert_to_csv)
        .catch((err) => {console.error(err);})
}

function merge_licenses(licenses) {
    var licenses_merged = {};
    licenses.forEach((license_output) => {
        for (var key in license_output) {
            if (!licenses_merged[key]) {
                licenses_merged[key] = license_output[key];
            }
        }
    });
    return licenses_merged;
}

function remove_apigee_licenses(licenses) {
    var map = {};
    Object.keys(licenses).forEach((license_key) => {
        if (license_key.indexOf('apigee') == -1) {
            map[license_key] = licenses[license_key];
        }
    });
    return map;
}

function convert_to_no_key_objects(licenses) {
    return Object.keys(licenses).map((license_key) => {
        return licenses[license_key];
    });
}

function get_version_field(licenses) {
    var map = {};
    Object.keys(licenses).forEach((license_key) => {
        var name_array = license_key.split('@');
        licenses[license_key].name = name_array[0];
        licenses[license_key].version = name_array[1];
        map[license_key] = licenses[license_key];
    });
    return map;
}

function convert_to_csv(licenses) {
    return json2csv({data: licenses, fields: ['name', 'publisher', "name", "version", "licenses"]});
}

module.exports = {
    get_license: get_license,
    get_licenses_by_path: get_licenses_by_path,
    join_licenses: join_licenses
}