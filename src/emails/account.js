const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'


sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send( {
        to: email, 
        from: 'kevin.shewey@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}.  Let me know how it works for you!`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send( {
        to: email,
        from: 'kevin.shewey@gmail.com',
        subject: "We're sorry to see you go!",
        text: "You've been removed from our system.  I hope you will consider coming back soon!"
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}