// 引入 nodemailer
const nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
const config = {
  host: 'smtp.126.com',
  port: 25,
  auth: {
    user: 'lazyhome804@126.com', // 刚才注册的邮箱账号
    pass: 'lazyhome804'  // 邮箱的授权码，不是注册时的密码
  },
};

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

// 发送邮件
function mail(data, callback) {
  transporter.sendMail(data, (error, info) => {
    if (error) {
      return console.log(error);
    }
    callback(info.response);
    // console.log('mail sent:', info.response);
  });
}

module.exports = mail;
