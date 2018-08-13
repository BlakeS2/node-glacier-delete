
//Todo: make customizing date formate and file name easy

// THE LINE TO EXECUTE AWS GLACIER CLI COMMAND IS COMMENTED OUT BY DEFAULT,
// UNCOMMENT TO ENABLE EXECUTION

const fs = require('fs');
const childProc = require('child_process');
const parsePath = require('parse-filepath');
const moment = require('moment');

// directory where log with archiveId are located
var dirName = ""
// date formate of log file names
var dateFormat = "DDMMMYY"
// glacier vault name
var vaultName = ""
// aws account id
var accountId = "-"
//older than this will be deleted
var ageLimit = 91
//directory to log deletions at
var deleteLogsDir = ""

var counter = 0;
var notYetCounter = 0;

fs.readdir(dirName, function(err, data) {
    if(err) throw err;
    let fileNames = data;

    for (let i = 0; i < fileNames.length; i++) {
        const file = fileNames[i];
        
        fs.readFile(dirName + '\\' + file, 'utf16le', function(err, contents) {
            var duration = moment().diff(moment(parsePath(file).name, dateFormat), 'days');

            try {
                var  id = JSON.parse(contents.substr(1))['archiveId'];
                } 
            catch (error) {
                console.log(`Bad Log, Bad! ${file}`)
                }
            

            if(duration >= ageLimit && id) {

                deleteCmdString = `aws glacier delete-archive --account-id ${accountId} --vault-name ${vaultName} --archive-id ${id}`;

                try {

                //uncomment THIS TO RUN GENERATED COMMANDS

                //childProc.execSync(deleteCmdString);
                    
                } catch (error) {
                    console.log(`AWs Command Failed ${error}`)
                }

                //uncomment to see generated commands, but not run
                //console.log(deleteCmdString);

                counter++;
                console.log(counter);

                var logFileDateName = moment();
                //console.log(logFileDateName);

                // generates a log file of the deleted backup with a name of current time and contents including date, archiveId, and the number of deletions to this point
                fs.writeFile(deleteLogsDir + logFileDateName + ".txt" , `Deleted: ${counter} \n ArchiveId: ${id} \n Date: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, (err) => {
                    if (err) throw err;
                   // console.log('The log file has been saved!');

                });

            }else{
		        //console.log(contents)
		        notYetCounter++;
                console.log(`Age Limit: ${ageLimit} Age: ${duration} Count: ${notYetCounter}`);

            }

        });

    };

});

