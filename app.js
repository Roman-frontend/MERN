const express = require('express')
//Щоб отримати константу PORT підключаємо модуль config в якому містяться документи з константами
const config = require('config')
//Необхідний щоб вказувати шлях
const path = require('path')
//Підключаєм mongoose щоб підключитись до mongodb
const mongoose = require('mongoose')

//app - наш майбутній сервер
const app = express()

//medleware - express.json() з параметром extended: true - дозволить коректно парсити body 
//який приходить з фронтента бо по замовчуванні node js сприймає body як стріми
app.use(express.json({ extended: true }))

//Реєструємо необхібні routes(шляхи) які будуть по різному обробляти API запити з фронтента
//Тут ми робимо модуль авторизації
//в .use першим параметром передаємо рядок що буде префіксом для майбутнього шляху
//а другим безпосередньо шлях rout де ./routes - шлях в папку routes а /auth.routes - шлях до файлу
app.use('/api/auth', require('./routes/auth.routes'))
//Підключаємо роути з папки routes і з файлу link.routes.js
app.use('/api/link', require('./routes/link.routes'))
//Враховуючи що формат силок в нас з символом '/t' як розділювачем між 
//базовим URL - "http://localhost:5000" і кодом то і тут вказуєм '/t'
//Підключаєм rout(шлях) з папки routes файлу redirect.routes.js  
app.use('/t', require('./routes/redirect.routes'))

//В режимі production - Окрім формування API на сервері - необхідно віддавати сам фронтент
//якщо змінна process.env і її системна змінна.NODE_ENV === 'production' 
//(те що ми прописали в package.json в свойстві "start")то це означає що потрібно віддавати статику
if (process.env.NODE_ENV === 'production') {
//Якщо запит іде в корінь нашого додатку то тоді я додаю midleware - 
//express.static - щоб вказати нашу статичну папку
//path.join - показує що шлях ми формуємо від 
//__dirname - даної директорії, в папку 'client' і в папку 'build' де знаходиться та статика
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//* - на будь який get запит я буду - 
  app.get('*', (req, res) => {
//res.sendFile - відправляти файл який знаходиться в папці
//__dirname, папці 'client', папці 'build', до файлу 'index.html'
//Так в нас працюватиме фронтенд і бекенд одночасно і node буде за все відповідати.
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Виносимо значення порта в спільний config - який скачуєм як модуль і створюєм папку 
//з цими документами (config) де документ default.json містить даний порт
//PORT - пишемо з великих букв бо це константа, викликаємо метод get щоб 
//отримати рядок з папки config і файлу default
const PORT = config.get('port') || 5000

async function start() {
  try {
//.connect - повертає Promise тому викликаємо цю функцію через async, цей
// метод дозволяє підключитись до бази даних
//mongoose - це проміс, в нього викликаєм конект щоб підключитись до mongodb де 
//перши пераметром передаєм URL адресу яку отримуєм з сайту mongodb.com за якими будемо додавати базу даних і цей 
//URL ми зберігаємо в config, в default.json
//Другим параметром набір опцій
    await mongoose.connect(config.get('mongoUri'), {
//Три нижна параметри необхідні щоб наш connect успішно працював бо інакше видаватиме помилку
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
//Щоб вийти з глобального обєкту nodejs використовуєм глобальний обєкт process
// .exit(1) - таким чином закінчимо наш процес в випадку якщо щось пішло не так
    process.exit(1)
  }
}

start()

