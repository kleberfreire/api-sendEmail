const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');

const caminho = './src/db/Estados/AC/AC.xlsx'

function convertExcelForList(caminho) {
  return readXlsxFile(caminho).then((rows) => {
    return rows.reduce((acc, curr) => {
      return [
        ...acc,
        {
          name: curr[0],
          cnpj: curr[1],
          email: curr[2],
          cidade: curr[4],
          uf: curr[4]
        }
      ]
    },[]) 
  })
}

module.exports = {
  convertExcelForList,
};