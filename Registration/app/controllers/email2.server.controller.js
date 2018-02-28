var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isat.siuc@gmail.com',
    pass: 'GOISATSIUC'
  }
});

var mailOptions = {
  from: 'isat.siuc@gmail.com',
  to: 'charithnisanka@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 