const moment = require('moment');
const fs = require('fs');
const userData = './mainDir/app/getIp.txt';
const dirMax = './mainDir/host/userData.txt';
const database = require('./database');
const date = moment(new Date(), 'YYYY-MM-DD');
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
                            bData.hed = moment(bData.hed, 'YYYY-MM-DD');
                            if (bData.hed != undefined) {
                                let bt = moment(bData.hed).isAfter(date);
                                if (bt == true) {
                                    // console.log(bData.hed);
                                } else {
                                    // console.log(bData);
                                    let duration = moment.duration(date.diff(bData.hed));
                                    let days = duration.asDays();
                                    // console.log(days)
                                    if (days >= 150) {
                                        let wName = bData.websitename;
                                        fs.appendFile(dirMax, wName + '\r\n', 'utf-8', (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log('success');
                                    });
                                    }       
                                    
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
