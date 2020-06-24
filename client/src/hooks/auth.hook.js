//Хук що відповідає за авторизацію - модуль шо відповідає за авторизацію людни в систкмі
import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

//перший параметр jwtToken - який отримуємо з бекенда
  const login = useCallback((jwtToken, id) => {
//Задаємо jwtToken для локального стану
    setToken(jwtToken)
//викликаємо з 
    setUserId(id)

//localStorage - базовий браузерний IP .setItem() - метод що дозволяє записати дані в localStorage
// який буде зберігати їх і після перезагрузки сторінки і перший параметр const storageName яка 
//містить рядок 'userData' і другий параметр обгортаєм в JSON.stringify() щоб коректно передати в 
//localStorage обєкт (бо по замовчуванні дані переводяться в строку і отримаємо [object Object])
    localStorage.setItem(storageName, JSON.stringify({
//і в який записуємо обєкт userId - якому передали id що отримали 
//і token який отримали з сервера
      userId: id, token: jwtToken
    }))
  }, [])


  const logout = useCallback(() => {
//Очищаємо стан token
    setToken(null)
//Очищаємо стан userId
    setUserId(null)
//Очищаєм localStorage
    localStorage.removeItem(storageName)
  }, [])

//При загрузці хуку useEffect() - перевірить чи містить localStorage в собі дані
//По замовчуванні ми тут грузимо шляхи де відсутня авторизація
  useEffect(() => {
//В const data поміщаємо дані з localStorage попередньо розпарсені до коректного вигляду через JSON.parse()
//бо в localStorage вони зберігаються як строка а через JSON.parse() приводимо їх в обєкт
    const data = JSON.parse(localStorage.getItem(storageName))

//Якщо data - не = null тобто якщо вона є && data.token - і якщо в data є поле .token то
    if (data && data.token) {
//викликаю функцію login() куди першим параметром передаю token i userId які я записав в localStorage
      login(data.token, data.userId)
    }
//Після виконання useEffect() -змінюєм стан на true чим показуєм що useEffect() - виконався
    setReady(true)
//Як залежність вказую login бо ми використовуємо його всередині (і тому вказую щоб useEffect() 
//виконувався тільки при виконанні login - як я зрозумів) і саме для цього ми обертали login в useCallback()
  }, [login])


//експортуємо з хуку : login, logout, token, userId, ready
  return { login, logout, token, userId, ready }
}
