const regexFilterEmail = /^\s|\S+@\S+\.\S+/g;

const filterEmailInNameFiles = (arquivos = []) => {
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
  filterEmailInNameFiles,
};
