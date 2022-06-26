const admin = require("../firebase");
const nodemailer = require("nodemailer");
// const sgMail = require('@sendgrid/mail');

require('dotenv').config();
console.log("process.env.SEND_GRID_API__", process.env.SEND_GRID_API);
// sgMail.setApiKey(process.env.SEND_GRID_API);

let db = admin.database();
let ordersRef = db.ref("/order");
exports.orderCheck = (req, res, next) => {
    const user_id = ordersRef.push().key;
    ordersRef.child(user_id).set(req.body);
   //
 ordersRef.orderByKey().limitToLast(1).on('child_added', async snapshot => {
        const dataOrder =  snapshot.val();
        console.log(dataOrder);
        const orderList = dataOrder.products.map(elem => {
            const isWokDescritp = elem.descriptionWok === undefined ? "" : `<p style="text-align: center"><b>Лапша: </b> ${elem.descriptionWok}`
            const isPizzazIng = elem.descriptionIngrideents === undefined ? "" : `<p style="text-align: center"><b>Доп.Ингидеенты: </b> ${elem.descriptionIngrideents}`
            const isSizedPizza = elem.productSize === undefined ? "" : `<p style="text-align: center"><b>Размер: </b> ${elem.productSize}</p>`

            return `
             <div style="display: flex; flex-direction: column; align-items: center;
                border: 1px solid lightgrey; margin-bottom: 10px; border-radius: 8px; padding: 10px;">
                <p style="text-align: center"><b>Toвар: </b> ${elem.product}</p>
                <p style="text-align: center"><b>Состав: </b> ${elem.description}</p>
                <div>${isSizedPizza}</div>
                <div>${isPizzazIng}</div>
                <div>${isWokDescritp}</div>      
                <p style="text-align: center"><b>Штук: </b> ${elem.count}</p>
                <p style="text-align: center"><b>Цена: </b> ${elem.total}</p>
               </div>
            `});
        const deliveryInfoTime = () => {
            if(dataOrder.deliveryTime === 'Приготовить сразу') {
                return `
                <p><b style="font-size: 18px">Дата готовки: </b> ${dataOrder.deliveryTime}</p>
                `
            }
            return `
             <p><b style="font-size: 18px">Дата готовки/доставки: </b> ${dataOrder.deliveryTime.dateDelivery}</p>
             <p><b style="font-size: 18px">К какому времени доставить/приготовить: </b> ${dataOrder.deliveryTime.timeDelivery}</p>
            `
        };
        const deliveryInfo = () => {
          if(dataOrder.delivery.formDelivery !== 'Доставка курьером') {
              return `
                <p><b style="font-size: 18px">Способ получения заказа: </b> ${dataOrder.delivery}</p> 
              `
          }

          return `
            <p><b style="font-size: 18px">Способ получения заказа: </b> ${dataOrder.delivery.formDelivery}</p>
            <p><b style="font-size: 18px">Населенный пункт: </b> ${dataOrder.delivery.adress}</p>
            <p><b style="font-size: 18px">Улица: </b> ${dataOrder.delivery.home}</p>
            <p><b style="font-size: 18px">Номер дома: </b> ${dataOrder.delivery.home}</p>
            <p><b style="font-size: 18px">Номер квартиры: </b> ${dataOrder.delivery.apartment}</p>
            <p><b style="font-size: 18px">Этаж: </b> ${dataOrder.delivery.etag}</p>
            <p><b style="font-size: 18px">Код двери подьезда: </b> ${dataOrder.delivery.podezd}</p>
        `
        };
        // console.log(" process.env.EMAIL_FROM__",  process.env.EMAIL_FROM);
        // console.log(" process.env.EMAIL_TO",  process.env.EMAIL_TO);

        const emailData = {
            from: "mazarar@yandex.ru",
            to: "tbezhenova@yandex.ru",
            subject: 'Новый заказ',
            html: `
                 <div>
                    <p><b style="font-size: 18px">Имя:</b>${dataOrder.name}</p>
                    <p><b style="font-size: 18px">Телефон: </b>${dataOrder.phone}</p>
                    <a style="
                    text-decoration: none; 
                    font-weight: bold;
                    font-size: 16px;
                    color: white" href="tel:${dataOrder.phone}">
                    <div style="background-color: tomato;
                    width: 70%;
                    border-radius: 10px;
                    padding: 10px;
                    ">Позвонить</div></a>
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;
                    "><p style="font-size: 18px;"><b>Товары: </b></p>${orderList}</div>
                    </div>
                    <div>${deliveryInfo()}</div>
                    <div>${deliveryInfoTime()}</div>
                    <p><b style="font-size: 18px">Приборы(палочки): </b> ${dataOrder.chopsticks}</p>
                    <p><b style="font-size: 18px">Сдача: </b> ${dataOrder.sdacha}</p>
                    <p><b style="font-size: 18px">Общая цена к оплате: </b> ${dataOrder.totalPrice}</p>
                    <p><b style="font-size: 18px">Комментарий к заказу: </b> ${dataOrder.comments}</p>
                    <a style="
                    text-decoration: none; 
                    font-weight: bold;
                    font-size: 16px;
                    color: white" href="tel:${dataOrder.phone}">
                    <div style="background-color: tomato;
                    width: 70%;
                    border-radius: 10px;
                    padding: 10px;
                    ">Позвонить</div></a>
                    <span>подтвердить заказ</span>
                </div>
            `
        };

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
          
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.yandex.ru",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "mazarar@yandex.ru", // generated ethereal user
                pass: "gqgdgwqzxrbaqaxm" // generated ethereal password
              }
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail(emailData)
            .then(() => {})
            .catch(error => console.log(error))
             
            // console.log("Message sent: %s", info.messageId);

//         sgMail
//             .send(emailData)
//             .then(() => {}, error => {
//             console.error(error);

//             if (error.response) {
//                 console.error(error.response.body)
//             }
//   });
        
    });
    next()

};
