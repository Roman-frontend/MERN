const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()


//Тут ми отримуватимемо динамічний код
router.get('/:code', async (req, res) => {
  try {

//link - Отимуєм ту силку з якою зараз працюємо по коду. 
//.findOne - Отримуємо єдину силку бо код в нас унікальний
    const link = await Link.findOne({ code: req.params.code })

    if (link) {
//link.clicks - поверне к-ть кліків а ++ додасть 1 до тої к-ті
      link.clicks++
//Зберігаю змінену link
      await link.save()
//(.redirect - перенаправляю res по силці 
//link.from де зберігається початкова силка яку ми вписували в input
      return res.redirect(link.from)
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
