import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
//За допомогою useHistory() - будемо робити навігацію
  const history = useHistory()
//Імпортємо заданий контекст з папки context файлу AuthContext.js
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
//Відміняємо дефолтну(по замовчуванні) поведінку щоб силка не оброблялася
    event.preventDefault()
    auth.logout()
//(при виклику logoutHandler відбудеться перехід на головну сторінку - як я зрозумів)
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
