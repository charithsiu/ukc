

const nodemailer = require('nodemailer'),
creds = require('../../config/env/development'),
    transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:creds.email.emailID,
            pass:creds.email.emailSecret,
        },
    }),
     EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

    let users =[
        {
            name:'Charith',
            email:'charithnisanka@gmail.com',
        },
        {
            name:'Ali',
            email:'charithnisanka@gmail.com',
        },
        {
            name:'Mehdi',
            email:'charithnisanka@gmail.com',
        },
    ];

function sendEmail(obj){
    return transporter.sendMail(obj);
}
function loadTemplate(templateName,contexts){
    let template= new EmailTemplate(path.join(__dirname,'templates',templateName));
    return Promise.all(contexts.map((context)=>{
        return new Promise((resolve,reject)=>{
            template.render(context,(err,result)=>{
                if(err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}
loadTemplate('welcome',users).then((results)=>{
    return Promise.all(results.map((result)=>{
        sendEmail({
            to: result.context.email,
            from:'Me :)',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }));
}).then(()=>{
    console.log("Mail sent....");
});