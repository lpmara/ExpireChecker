const moment = require('moment');
const database = require('./database');
const test = 'www.thailandonlinemarketing.com';
const date = new Date();
const fs = require('fs');
const userData = '/Users/itopplus/Desktop/Expire Checker/ExpireChecker/Backup';


// fs.readdir(userData, (err, result) => {
//     if(err){
//         //
//     }
//     console.log(result);
// })


let cDate = '2015-07-19';
let curDate = moment(date).format('YYYY-MM-DD');
console.log(curDate);

let checkDate = moment(cDate).isAfter(date);
let testDate = moment(checkDate).diff(date, 'days')
console.log(testDate);


// database.execQuery('SELECT * FROM erp_website WHERE websitename = ?', test)
//     .then((result) => {
//         let bData = result;
//         console.log(bData);
//         // console.log('-----------------' + date);
//     })
//     .catch((reject) => {
//         let eData = reject;
//         console.log('It a ERRORRRRRRRR : ' + eData)
//         // console.log(eData)
//     })



// database.execQuery('SELECT MAX(host_expired_date) as hed, websitename FROM erp_website GROUP BY websitename = ?', test)
//     .then((result) => {
//         let bData = result[2];
//         console.log(bData);
//         console.log('-----------------' + date);
//     })
//     .catch((reject) => {
//         let eData = reject;
//         console.log('It a ERRORRRRRRRR : ' + eData)
//         // console.log(eData)
//     })