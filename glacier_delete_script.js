
const fs = require('fs');
const childProc = require('child_process');
const parsePath = require('parse-filepath');
const moment = require('moment');

var dirName = ""
var vaultName = ""
var accountId = "-"
var ageLimit = 91


fs.readdir(dirName, function(err, data) {
    if(err) throw err;
    let fileNames = data;

    for (let i = 0; i < fileNames.length; i++) {
        const file = fileNames[i];

        fs.readFile(dirName + '\\' + file, 'utf16le', function(err, contents) {
            var duration = moment().diff(moment(parsePath(file).name, "DDMMMYY"), 'days');
            var  id = JSON.parse(contents.substr(1))['archiveId']
            if(duration >= ageLimit) {
                deleteCmdString = `aws glacier delete-archive --account-id ${accountId} --vault-name ${vaultName} --archive-id ${id}`;
                childProc.exec(deleteCmdString);
                //console.log(deleteCmdString);
            }else{
                console.log("Not Yet");
                }
        });

    };

});

