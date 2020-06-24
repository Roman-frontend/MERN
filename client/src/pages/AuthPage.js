import React, {useContext, useEffect, useState} from 'react'
//Створений нами власний хук що дозволить зручно працювати з ассинхронними запитами на сервер
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
//використовуємо useContext() з контекстом який ми створили в папці context в файлі AuthContext.js
// і тепере в auth містяться всі дані які ми передаємо в файлі App.js в AuthContext.Provider і в 
//auth є метод login який ми можемо викликати 
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

//Тут опрацьовуємо помилки і в [] вказуємо що будемо залежати від error 
//який отримали з хуку useHttp()
  useEffect(() => {
//message - хук useMessage()- видасть помилку в вікні window 
    message(error)
//після виконання хуку message(error) з допомогою функції clearError() 
//яку імпортуємо useHttp() і якою очищаєм помилку в useHttp()
    clearError()
//error, message, clearError - є залежностями для виконання useEffect() - (як я поняв при умові
//їхньої наявності виконуватиметься хук useEffect())
  }, [error, message, clearError])

  useEffect(() => {
//Дозволяє Зробити inputs авторизації активними при запуску сторінки
    window.M.updateTextFields()
  }, [])

//changeHandler - першим параметром - отримує дані з input як form і розгортає їх оператором spread
//другим параметром оприділяєм яке саме поле я змінюю email чи password в setForm() - звертаюсь до 
//динамічного ключа [event.target.name] і туди передаю event.target.value - де завдяки тому що на кожному 
//input в нас є атрибут name: ми будемо змінювати або email або password за допомогою одного метода changeHandler()
//який передаю як атрибут встроєного свойства onChange()
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

//Функція відповідаюча за реєстрацію користувача
  const registerHandler = async () => {
    try {
//Запит робим на URL '/api/auth/register'
      const data = await request('/api/auth/register', 'POST', {...form})
//використовуючи функцію message() з хуку useMessage() ми виводим повідомленням з матеріалайз 
//дані з аргументу data.message - який передаємо в цю функцію по виконанні request() без помилки
      message(data.message)
    } catch (e) {}
  }

//Функція відповідаюча за логін користувача (тобто вхід зареєстрованого користувача)
  const loginHandler = async () => {
    try {
//Запит робим на URL '/api/auth/login'
      const data = await request('/api/auth/login', 'POST', {...form})
//auth.login використовую метод .login() з useContext(AuthContext) 
//якому передаю data.token і data.userId - які отримую з сервера
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
//Карточки головної сторінки
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

//блок input для email
              <div className="input-field">
                <input
//Текст в input
                  placeholder="Введите email"
                  id="email"
                  type="text"
//name="email" - необхідний атрибут для обробки форми
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

//блок input для password
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
//type="password" - щоб парольпри вводі не було видно
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
//Додаємо дві книпки для вибору реєстрація чи вхід
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
