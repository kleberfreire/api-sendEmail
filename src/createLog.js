const fs = require('fs').promises;
const moment = require('moment');
const dateNow = moment().format("DD-MM-YY-hhmmss");

function createLog(data, name) {
  fs.writeFile(`./src/log/${name}-${dateNow}.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('O arquivo foi criado!');
  });
}   

module.exports = {
  createLog
}