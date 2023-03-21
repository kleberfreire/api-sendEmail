const path = require('node:path');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
//const { oauth2 } = require('googleapis/build/src/apis/oauth2');

const textos = require('./db/textos');

const { listarArquivosDoDiretorio } = require('./leituraDeArquivos');
const { arquivoExcel } = require('./leituraDeExcel');
const { createLog } = require('./createLog');
//const { gmail } = require('googleapis/build/src/apis/gmail');

const OAuth2_client = new OAuth2(
  process.env.GMAIL_CLIENTE_ID,
  process.env.GMAIL_CLIENTE_SECRET,
);

OAuth2_client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  // refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

let logData = []

function get_html_message(name) {
  return textos.textoCarta;
}

function send_mail(name, recipient, caminho, arquivo) {
  const acessToken = OAuth2_client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USER,
      clientId: process.env.GMAIL_CLIENTE_ID,
      clientSecret: process.env.GMAIL_CLIENTE_SECRET,
      refreshToken:process.env.GMAIL_REFRESH_TOKEN,
      acessToken: acessToken,
    },
  });

  const mailOptions = {
    subject: `Campanha de arrecadação da NCST`,
    from: `Cobrança NCST <${process.env.MAIL_USER}>`,
    to: recipient,
    html: get_html_message(name),
    attachments: [
      {
        filename: arquivo,
        path: `./src/db/${caminho}`,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, result) {
    if (error) {
      // console.log('Error ---: ', error);
      logData = error
    } else {
      // console.log('Success: --- ', result);
      logData = result
    }
  });
  transporter.close();
}



function getListSendEmail(arquivos = [], pathDocuments) {
  return arquivos.map((item, index) => {  
    return {
      nome: item.name,
      email: item.email,
      caminhoArquivo: `${pathDocuments}/${item.cnpj}.pdf`,
      arquivo:`${item.cnpj}.pdf`
    };
  });
}




async function sendAllEmail() {
  const caminho = '/Estados/AC/boletos';
  // const arquivos = await listarArquivosDoDiretorio('./src/db/Estados/AC/boletos');
  const listSender = await arquivoExcel
  const arquivosFiltrados = getListSendEmail(listSender, caminho);
 
  arquivosFiltrados.forEach((item) => {
    if (item.email) {
      // send_mail(item.nome, item.email,item.caminhoArquivo);
      send_mail(item.nome, 'ch4r4d4@gmail.com',item.caminhoArquivo);
    }
  });

  console.log(logData)
  createLog(logData, 'AC')
}



sendAllEmail();
