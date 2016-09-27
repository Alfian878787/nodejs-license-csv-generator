license-checker-sample
======================
The following command can be used to generate an NPM license list on a given Node.js project. I used it when I had to generated all OSS licenses that was using in multiple projects. Since LICENSE_PATHS variable supports multiple directories, it merges licenses from multiple sources. 

### To install
```
git clone this_repo
npm install -g
``` 

### To generate licenses in CSV or JSON
```
$ LICENSE_PATHS=/Users/ApigeeCorporation/Documents/tools/git/nucleus/nucleus-edge-api-swagger/apiproxy/resources/node,/Users/ApigeeCorporation/Documents/tools/git/nucleus/360/360/api-internal,/Users/ApigeeCorporation/Documents/tools/git/nucleus/360/360/api-external,/Users/ApigeeCorporation/Documents/tools/git/nucleus/360/360/api-internal,/Users/ApigeeCorporation/Documents/tools/git/nucleus/360/360/ui-internal,/Users/ApigeeCorporation/Documents/tools/git/nucleus/360/360/ui-external license-checker-sample > licenses.csv
```

