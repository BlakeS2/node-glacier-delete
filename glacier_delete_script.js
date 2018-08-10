
const fs = require('fs');
const childProc = require('child_process');
const parsePath = require('parse-filepath');
const moment = require('moment');

var dirName = ""
var vaultName = ""
var accountId = "-"
var ageLimit = 91

var counter = 0;
//Todo: make customizing date formate and file name easy

fs.readdir(dirName, function(err, data) {
    if(err) throw err;
    let fileNames = data;

    for (let i = 0; i < fileNames.length; i++) {
        const file = fileNames[i];

        fs.readFile(dirName + '\\' + file, 'utf16le', function(err, contents) {
            var duration = moment().diff(moment(parsePath(file).name, "DDMMMYY"), 'days');
            var  id = JSON.parse(contents.substr(1))['archiveId'];
            if(duration >= ageLimit) {
                deleteCmdString = `aws glacier delete-archive --account-id ${accountId} --vault-name ${vaultName} --archive-id ${id}`;
                //childProc.execSync(deleteCmdString);
                //console.log(deleteCmdString);

                counter++;
                console.log(counter);

            }else{
                console.log("Not Yet");
                }
        });

    };

});

