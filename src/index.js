require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const {textSend} = require('./db/textSend');


const { convertExcelForList } = require('./readFileXlsx');
const { createLog } = require('./createLog');


const OAuth2_client = new OAuth2(
  process.env.GMAIL_CLIENTE_ID,
  process.env.GMAIL_CLIENTE_SECRET,
);

OAuth2_client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const logData = []

const delay = (amount = 500) => new Promise(resolve => setTimeout(resolve, amount))

function get_html_message(name) {
  return textSend(name);
}

function send_mail(name, recipient, pathFile, file) {
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
        filename: file,
        path: `./src/db/${pathFile}`,
      },
    ],
  };


  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions)
      .then(response => {
          transporter.close();
          return resolve(response);
      })
      .catch(error => {
          transporter.close();
          return reject(error);
      });
  })
}



function getListSendEmail(arquivos = [], pathDocuments) {
  return arquivos.map((item, index) => {  
    return {
      name: item.name,
      email: item.email,
      pathFile: `${pathDocuments}/${item.cnpj}.pdf`,
      file:`${item.cnpj}.pdf`
    };
  });
}




async function sendAllEmail(estado = '') {
  const pathFiles = `/Estados/${estado}/boletos`;
  const listSender = await convertExcelForList(`./src/db/Estados/${estado}/${estado}.xlsx`)
  const listSendEmail = getListSendEmail(listSender, pathFiles);
 
  for (const item of listSendEmail) {
    const result = await send_mail(item.name, 'ch4r4d4@gmail.com',item.pathFile, item.file);
    logData.push(result);
    await delay()
  }

  createLog(logData, estado)
}



sendAllEmail('AC');
