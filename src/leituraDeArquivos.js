const fs = require('fs').promises;

async function listarArquivosDoDiretorio(diretorio, arquivos) {
  if (!arquivos) {
    arquivos = [];
  }
  let listaDeArquivos = await fs.readdir(diretorio);
  for (let k in listaDeArquivos) {
    let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
    if (stat.isDirectory()) {
      await listarArquivosDoDiretorio(
        diretorio + '/' + listaDeArquivos[k],
        arquivos,
      );
    }
    arquivos.push(listaDeArquivos[k]);
  }


  return arquivos;
}

module.exports = {
  listarArquivosDoDiretorio,
};
