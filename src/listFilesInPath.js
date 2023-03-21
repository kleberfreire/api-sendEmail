const fs = require('fs').promises;

async function listFilesInPath(pathFile, arquivos) {
  if (!arquivos) {
    arquivos = [];
  }
  let listFiles = await fs.readdir(pathFile);
  for (let k in listFiles) {
    let stat = await fs.stat(pathFile + '/' + listFiles[k]);
    if (stat.isDirectory()) {
      await listFilesPathFile(
        pathFile + '/' + listFiles[k],
        arquivos,
      );
    }
    arquivos.push(listFiles[k]);
  }


  return arquivos;
}

module.exports = {
  listFilesInPath,
};
