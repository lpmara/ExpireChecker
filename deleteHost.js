const fs = require('fs-extra');

const userData = './mainDir/host/userData.txt';
const backupMail = './Backup';
const dir = '/Users/itopplus/Downloads/postoffice/Postoffices';
// const mail = 'mail';
const www = 'www.';

fs.readFile(userData, 'utf-8', (err, result) => {
    if (err) {
        throw err;
    }
    let array = result.toString().split('\r\n');
    array.forEach((data) => {
        let newArray = data.match(/www.*./);
        if (newArray != null) {
            let newData = newArray.toString().replace(www, '');
            let arrData = newData.split('\r\n');
            fs.copy(dir + '/' + arrData, backupMail + '/' + arrData, (err) => {
                if(err){
                    throw err;
                }
                fs.remove(dir + '/' + arrData, (err) => {
                    if(err){
                        throw err;
                    }
                    console.log('success');
                })
            })
        }
    })
})



