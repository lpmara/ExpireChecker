const path = require('path');
const fs = require('fs');
const ping = require('ping');

//---Script To get data from Postoffices---//

const dir = '/Users/itopplus/Downloads/postoffice/Postoffices';
const dirIp = './mainDir/app';
// const mainIp = '122.155.18.255';
const nDomain = './mainDir/app/IP.txt';
const userData = './mainDir/app/getIp.txt'
const nullData = '';
const mail = 'mail';
const www = 'www';
// let dataIP = [];

function getDirectories(dir) {
    return fs.readdirSync(dir)
        .filter(dirname => fs.lstatSync(path.join(dir, dirname)).isDirectory())
}
let userDir = new getDirectories(dir);
fs.writeFile(dirIp + '/' + 'IP.txt', nullData, (err) => {
    if (err) {
        //
    }
    let pingServer = new Promise((resolve, reject) => {
        userDir.forEach((userdir) => {
            let userDomain = userdir;
            fs.appendFile(nDomain, 'mail.' + userDomain + '\r\n', 'utf-8', (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });


    pingServer.then(
        fs.writeFile(userData, nullData, (err) => {
            if (err) {
                //
            }
        }),
        fs.readFile(nDomain, 'utf-8', (err, data) => {
            if (err) {
                //
            }
            let array = data.toString().split("\r\n");
            array.forEach((array1) => {
                ping.promise.probe(array1)
                    .then((res) => {
                        let dataIP = [];
                        if (res.alive != false) {
                            dataIP.hostname = res.host;
                            dataIP.IP = res.numeric_host;
                            let newIp = dataIP.IP.match(/122.*./);
                            if (newIp != null) {
                                let newArray = dataIP.hostname.match(/mail.*./);
                                if (newArray != null) {
                                    let newData = newArray.toString().replace(mail, www);
                                    fs.appendFile(userData, newData + '\r\n', 'utf-8', (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                }
                            }
                        }
                    }).catch((reject) => {
                        let eData = reject;
                        console.log('It a ERRORRRRRRRR : ' + eData)
                        // console.log(eData)
                    });
            });
        })
    ).catch((reject) => {
        let eData = reject;
        console.log('It a ERRORRRRRRRR : ' + eData)
        // console.log(eData)
    });
});




