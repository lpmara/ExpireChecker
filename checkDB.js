const moment = require('moment');
const database = require('./database');
const test = 'www.devadevise.com';
const date = moment(new Date());
const fs = require('fs');
const userData = './Backup';



// fs.readdir(userData, (err, result) => {
//     if(err){
//         //
//     }
//     console.log(result);
// })


// let cDate = '2015-07-19';
// let curDate = moment(date).format('YYYY-MM-DD');
// console.log(curDate);

// let checkDate = moment(cDate).isAfter(date);
// let testDate = moment(checkDate).diff(date, 'days')
// console.log(testDate);

// const now = moment(new Date(), 'YYYY-MM-DD');
// let end = moment("2016-12-1", 'YYYY-MM-DD');
// let duration = moment.duration(now.diff(end));
// let days = duration.asDays();
// console.log(days)







database.execQuery('SELECT * FROM erp_website WHERE websitename = ?', test)
    .then((result) => {
        let bData = result;
        console.log(bData);
        // console.log('-----------------' + date);
    })
    .catch((reject) => {
        let eData = reject;
        console.log('It a ERRORRRRRRRR : ' + eData)
        // console.log(eData)
    })



// database.execQuery('SELECT MAX(host_expired_date) as hed, websitename FROM erp_website GROUP BY websitename = ?', test)
//     .then((result) => {
//         let bData = result[2];
//         console.log(bData);
//         // console.log('-----------------' + date);
//     })
//     .catch((reject) => {
//         let eData = reject;
//         console.log('It a ERRORRRRRRRR : ' + eData)
//         // console.log(eData)
//     })