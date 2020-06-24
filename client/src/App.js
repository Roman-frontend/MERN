import React from 'react'
//Щоб використовувати routers(роути - шляхи) ми обертаємо роути з 'react-router-dom' 
//в компонент BrowserRouter який прописавши BrowserRouter as Router передаємо як Router 
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
//Скріпти що дозволять оживити деякі input які ми використовуватимо
import 'materialize-css'

function App() {
//Використовуємо хук useAuth() щоб отримати з його всі необхідні дані. 
//token, login, logout, userId, ready - ці значення передаємо через 
//контекст з файлу AuthContext що в папці context всьому нашому додатку
  const {token, login, logout, userId, ready} = useAuth()
//!!token - приведе значення token до bolean значення
  const isAuthenticated = !!token
//Тут імпортуємо routes(роути). Підгружаємо routes при наявності token
  const routes = useRoutes(isAuthenticated)

//ready - буде = true після того як useEffect() - з auth.hook.js буде виконано і тоді після 
//зміни стану ready перестроїться віртуальний і реальний DOM і цей if не спрацює завдяки цьому
//AuthContext отримає необхідний TOKEN якщо він є в AuthContext.js
//А доки ready = false буде виконуватись компонент <Loader />
  if (!ready) {
    return <Loader />
  }

  return (
//Обертаємо наш додаток в контекст - AuthContext але оскільки він 
//не може бути контекстом то передаємо його як .Provider якому в якості значення передаємо з тими 
//значеннями які я отримав з хука useAuth()
    <AuthContext.Provider value={{
//isAuthenticated - константа що містить значення true чи false
      token, login, logout, userId, isAuthenticated
    }}>
//Обертаємо routers в 'react-router-dom' за допомогою його методу BrowserRouter який переоприділили як  Router
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
