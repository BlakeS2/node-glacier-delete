var fs = require('fs');  

file = "glacier_log/01Apr16.log"

fs.readFile(file, 'utf16le', function(err, contents) {
    console.log(JSON.parse(contents.substr(1))['archiveId']);
   });
