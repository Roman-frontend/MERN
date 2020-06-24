const {Router} = require('express')
const config = require('config')
//Підключаємо бібліотеку shortid
const shortid = require('shortid')
const Link = require('../models/Link')
//Підключаємо middleware (проміжний обробник) - який використовуємо в routers
const auth = require('../middleware/auth.middleware')
const router = Router()

//post запитом ми будемо генерувати силку '/generate'
//Додавши auth - middleware (проміжний обробник) - ми захищаємо end-point і робимо доступним req.user.userId в константі link
//Щоб неавторизовані користувачі не могли створювати ці силки
router.post('/generate', auth, async (req, res) => {
  try {
//На етапі розробки додатку сервер знаходиться на хості localHost:5000 
//Коли ми заливатимо цей додаток на хостинг і прикрутимо ДОМЕН то нам доведеться змінити там 
//базовий URL тому базовий URL ми зберігаємо в config і для етапу розробки він буде "http://localhost:5000" під
//свойством 'baseUrl' - в папці config в файлі default.json 
//тут поміщаю цей хостинг в окрему змінну
    const baseUrl = config.get('baseUrl')
//from - це той шлях звідки ми робимо дану силку де внаслідок нам треба буде редиректити 
//користувача за даним шляхом
    const {from} = req.body

//shortid.generate() дозволяє сформулювати короткий код який дозволить нашій силці бути короткою 
//тобто придумати унікальний ключ - для чого використовуємо бібліотеку shortid
    const code = shortid.generate()

//Перевіряємо чи маємо в базі силку - from
    const existing = await Link.findOne({ from })

//Якщо така силка є значить всі дані по ній ми вже зформували і тому немає змісту їх заново формувати
    if (existing) {
//Тоді ми просто відправляємо її з status(200) який іде по замовчуванні
      return res.json({ link: existing })
    }

//Формуємо ту силку яка буде скороченою і що буде працювати в нашому сервісі
//формую її з допомогою baseUrl значення якої отримали з config з файлу default.js 
//+ префікс t і до цього додаєм сам код (унікальний ключ)
    const to = baseUrl + '/t/' + code

//Створюємо новий обєкт силки куда передаємо всі необхідні параметри 
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

//Зберігаємо силку link
    await link.save()

//status(201) - створено, і в форматі .json() повертаємо силку.
    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

//для отримання всіх силок
router.get('/', auth, async (req, res) => {
  try {
//Для отриманя всіх силок отримую обєкт links і чекаю поки модель Link знайде всі силки що відносяться
//до даного користувача і за допомогою req.user.userId - визначаю який користувач зараз працює
//req.user.userId - є доступним за рахунок того що при виконанні auth - в обєкті req присутнє поле 
//req.user - в якого присутнє поле userId який беремо з ТОКЕН в папці routes i в файлі auth.routes.js
//userId - містить id користувача
//Таким чином ми робимо запит в базу де шукаємо всі силки які відносяться до даного користувача
    const links = await Link.find({ owner: req.user.userId })
//Якщо все гаразд то в форматі .json повертаю links (силки які знайшло м.д.)
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

//Для отримання силки по id
router.get('/:id', auth, async (req, res) => {
  try {
//Тут отримую окрему силку і її повертаю в .json де req.params.id - дозволить отримати параметр 
//id з URL що приходить в get
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
