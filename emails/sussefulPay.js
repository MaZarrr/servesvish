const keys = require('../keys')

module.exports = (body, message) => {
return {
    to: keys.EMAIL_TO,
    from: keys.EMAIL_FROM,
    subject: body || "[No subject]",
    html: message || "[No message]",
    }
}

