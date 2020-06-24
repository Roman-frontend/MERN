const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
//Визначаємо звідки іде дана силка, не робимо її унікальною використовуючи unique: true бо іноді
//для бізнесу іноді треба закодувати одну силку але за різними адресами наприклад щоб трекати різні сервіси
  from: {type: String, required: true},
//Вказую куди буде вести дана силка і її робимо унікальною тобто той код який ми згенеруємо має бути унікальним
  to: {type: String, required: true, unique: true},
  code: {type: String, required: true, unique: true},
//Дата коли наша силка була створена по default: викликаю Date.now - але не викликаю а передаю як reference даний метод 
//(як я поняв вона викликатиметься вже там де її викликатимуть).
  date: {type: Date, default: Date.now},
//Так будемо вести аналітику по кількості кліків з типом Number і першим значенням буде 0
  clicks: {type: Number, default: 0},
//Звязуємо силки з користувачем що її створив задавши тип Types.ObjectId і ref на колекцію користувача - 
// тобто до моделі користувача і даний рядок в нас співпадає з 23 рядком в файлі User.js в ційже папці
  owner: {type: Types.ObjectId, ref: 'User'}
})

//Модель називаємо 'Link' бо так ми її назвали в User.js в свойстві links
module.exports = model('Link', schema)
