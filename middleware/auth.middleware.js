//По суті middleware(перекладається як проміжний обробник) - це звичайна функція що 
//дозволяє перехоплювати певні дані і робити логіку яка описана в тілі

//Підключаємо бібліотеку jsonwebtoken щоб розкодувати Token
const jwt = require('jsonwebtoken')
//Підключаємо config щоб дістати секретний ключ з папки config i файлу default.js
const config = require('config')

//middleware - приймає 3 параметри req, res, next - де 3-тій параматр next дозволяє продовжити 
//виконання запиту.
module.exports = (req, res, next) => {
//.method - спеціальний метод який просто перевіряє доступність серверу - тут тобто якщо це 'OPTIONS' - то
//нам нічого робити не треба  і ми повертаємо некст
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

//Якщо запити не 'OPTIONS' то значить це get або post і тому з запиту отримуємо токен
//.authorization - строка яку ми будемо передавати з фронтенда і виглядає вона приблизно 
//"Bearer (+ наш) TOKEN" і враховуючи що це строка то ми можемо методом .split розділити її в місці ' '
//Де під індексом [1] отримаємо TOKEN
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

//Якщо токена немає
    if (!token) {
//.status(401) - вказує на те що немає авторизації і в .json() - на фронтенд відправим message: 'Нет авторизации'
      return res.status(401).json({ message: 'Нет авторизации' })
    }

//Якщо TОKEN є то розкодовуємо його, метод .verify() з бібліотеки jsonwebtoken дозволяє це зробити
//в якого першим параметром вказуєм сам TOKEN 
//другим - секретний ключ який ми вказували при формуванні самого ТОКЕНУ (з папки config файлу default.js)
    const decoded = jwt.verify(token, config.get('jwtSecret'))
//Кладем розкодований ТОКЕН  в обєкт req в поле user
    req.user = decoded
//Виконую next() - щоб продовжити виконання запиту 
    next()

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
