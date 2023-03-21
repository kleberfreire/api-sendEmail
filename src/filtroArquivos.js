const arquivosss = [
  'AM.xlsx',
  'SEAACSEA-seaacs_am@ig.com.br.pdf',
  'SIN TR IN - sintam@bol.com.br.pdf',
  'SIND. DOS MADEREIROS-.pdf',
  'SINDCOM.pdf',
  'SINDCOMAM-.pdf',
  'SINDICARGASAM-.pdf',
  'SINDVENDAS-sindvendas@uol.com.br.pdf',
  'SINTRABEM- stibam@hotmail.com.pdf',
  'SOETIIEGHSM-stieletricistas@hotmail.com.pdf',
  'STECDFHMADPFCPSEAM-stecdrogas@hotmail.com.pdf',
];

const regexFilterEmail = /^\s|\S+@\S+\.\S+/g;

const arquivosFiltrados = (arquivos = []) => {
  arquivos.map((item, index) => {
    const filterEmail = item.match(regexFilterEmail);
    const result = {
      nome: 'teste ' + index,
      email: filterEmail ? filterEmail[0].split('.pdf')[0] : filterEmail,
      caminhoArquivo: item,
    };
    return result;
  });
};

module.exports = {
  arquivosFiltrados,
};
