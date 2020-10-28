const keys = require('../keys')

module.exports = (body, message) => {

    const adress = message.adress === undefined || message.adress === '' ? '' : `<b>Населенный пункт: </b> ${message.adress}</p>`
    const street = message.street === undefined || message.street === '' ? '' : `<b>Улица: </b> ${message.street}</p>`
    const home = message.home === undefined || message.home === '' ? '' : `<b>Дом: </b> ${message.home}</p>`
    const podezd = message.podezd === undefined || message.podezd === '' ? '' : `<b>Подьезд: </b> ${message.podezd}</p>`
    const kodDveri = message.kodDveri === undefined || message.kodDveri === '' ? '' : `<b>Код двери: </b> ${message.kodDveri}</p>`
    const etag = message.etag === undefined || message.etag === '' ? '' : `<b>Этаж: </b> ${message.etag}</p>`
    const comments = message.comments === undefined || message.comments === '' ? '' : `<b>Комментарий: </b> ${message.comments}</p>`
    const date = message.date === undefined || message.date === '' ? '' : `<b>Дата доставки: </b> ${message.date}</p>`
    const time = message.time === undefined || message.time === '' ? '' : `<b>Время доставки: </b> ${message.time}</p>`
    // console.log(message)

return {
    to: keys.EMAIL_TO,
    from: keys.EMAIL_FROM,
    subject: body || "[No subject]",
    html: `
    <div>
        <p><b>Имя: </b> ${message.name}</p>
        <p><b>Телефон: </b>${message.phone}</p>
        <div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;
        "><p style="font-size: 18px;"><b>Товары: </b></p>${message.product}</div>
        </div>
        <p><b>Самовывоз или доставка: </b> ${message.delivery}</p>
        <p>${date}</p>
        <p>${time}</p>
        <p>${adress}</p>
        <p>${street}</p>
        <p>${home}</p>
        <p>${podezd}</p>
        <p>${etag}</p>
        <p>${kodDveri}</p>
        <hr>
        <p><b>Палочек(шт): </b> ${message.chopsticks}</p>
        <p><b>Сдачас с суммы: </b> ${message.sdacha}</p>
        <hr>
        <p><b>Общая цена к оплате: </b> ${message.totalPrice}</p>
        <p>${comments}</p>
    </div>
    ` || "[No message]",
    }
}

