const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('pay', {
        title: 'Добавить курс',
        isAdd: true
    })
})

router.post('/', (req, res) => {
console.log(req.body);
})

module.exports = router