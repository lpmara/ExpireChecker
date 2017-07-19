const moment = require('moment');
const fs = require('fs');
const userData = './mainDir/app/getIp.txt';
const dirMax = './mainDir/host/userData.txt';
const database = require('./database');
const date = new Date();
const nullData = '';

//---------Find Expired Website----------------------------------//
fs.writeFile(dirMax, nullData, (err) => {
    if (err) {
        //
    }
}),
    fs.readFile(userData, (err, data) => {
        if (err) {
            //
        }
        let array = data.toString().split('\r\n');
        array.forEach((webname) => {
            if (webname) {
                database.execQuery('SELECT MAX(host_expired_date) as hed, websitename FROM erp_website GROUP BY websitename = ?', webname)
                    .then((result) => {
                        let bData = result[2];
                        if (bData != undefined) {
                            bData.hed = moment(bData.hed).format('YYYY-MM-DD');
                            if (bData.hed != undefined) {
                                bData.hed = moment(bData.hed).isAfter(date);
                                if (bData.hed == true) {
                                    // console.log(bData);
                                } else {
                                    if (bData.hed != null){
                                    let wName = bData.websitename;
                                    let tName = bData.hed;
                                    let sData = JSON.stringify(tName); //All Data
                                    let wData = JSON.stringify(wName); //Only websitename
                                    console.log(sData);
                                }
                                    // console.log(wData);         
                                    // fs.appendFile(dirMax, wData + '\r\n', 'utf-8', (err) => {
                                    //     if (err) {
                                    //         throw err;
                                    //     }
                                    // });
                                }
                            }
                        }

                    })
                    .catch((reject) => {
                        let eData = reject;
                        console.log('It a ERRORRRRRRRR : ' + eData)
                        // console.log(eData)
                    });
            }
        });
    });
