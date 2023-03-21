const fs = require('fs').promises;
const moment = require('moment');
const dateNow = moment().format("DD-MM-YY-hhmmss");



// fs.readFile(`./src/log/${name}-${dateNow}.txt`, 'utf-8', (err, data) => {
//   if (err) throw err;
//   let json = JSON.parse(data);
//   // ...
// });


function createLog(data, name) {
  
  // fs.readFile(`./src/log/${name}-${dateNow}.json`, 'utf-8', (err, dataReadFile) => {
  //   if (err) throw err;
  //   let json = JSON.parse(dataReadFile);
  //   data.map
  // });


  fs.writeFile(`./src/log/${name}-${dateNow}.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('O arquivo foi criado!');
  });
}   

module.exports = {
  createLog
}