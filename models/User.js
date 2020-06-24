//Створюю модель 
const {Schema, model, Types} = require('mongoose')

//Створюємо скему(schema) через конструктор класу Schema
const schema = new Schema({
//тут створюю поля для користувача де першим параметром буде поле для вводу 
//email де тип поля String(це клас в js тому пишу з великої букви) - строка
//required: true - друн=гий параметр - обовязкове поле 
//Оскільки email в нас може бути унікальним то для задання цього пишем третім параметром unique: true
  email: {type: String, required: true, unique: true},
//password - поле аналогічне полю email - єдине що тут пароль не мусить бути унікальним тому ми  
//не вказуєм третій параметр
  password: {type: String, required: true},
//У кожного користувача буде свій масив силок, щоб кожна людина бачила свої дані 
//Для цьрого створюю масив і тут створюю модель в якого тип буде взятий з обєкту Types який берем з MongoDB і
// з якого береме .ObjectId 
//Другим параметром ref: - вказуєм до якої колекції ми привязуємось вона буде "Link" - яку я створю в 
  links: [{ type: Types.ObjectId, ref: 'Link' }]
})

//Експортуємо з файлу результат роботи функції model де першим параметром ми даємо назву нащій моделв
//другиц обєкт по якому він працює це schema - обєкт який ми створили
module.exports = model('User', schema)
