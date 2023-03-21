const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');

const caminho = './src/db/Estados/AC/AC.xlsx'
const arquivoExcel = readXlsxFile(caminho).then((rows) => {
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

// Readable Stream.
// const arquivoExcel = readXlsxFile(fs.createReadStream(caminho)).then((rows) => {
//   console.log(rows)
// })

// Buffer.
readXlsxFile(Buffer.from(fs.readFileSync(caminho))).then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.
})


module.exports = {
  arquivoExcel,
};