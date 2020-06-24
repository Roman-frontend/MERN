//Вданому файлі ми оприділяємо всі набори силок
import React from 'react'
//Імпортую Route - щоб оприділити Route 
//Redirect - перенаправить в випадку не виконання коду вище
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

//isAuthenticated - є флагом що скаже чи користувач зареєстрований в системі, чи є в нього дані чи ні
//І в залежності від нього повертаєм результат першого return а якщо людина не в системі то другий return
//скерує на <AuthPage /> а якщо ввели не існуючий Rout то нас перекине на головну сторінку через <Redirect to="/" />
export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
// якщо isAuthenticated дає true то викликаємо routes для людини в системі
    return (
      <Switch>
//Якщо користувач зареєстрований - показую Route(шлях) "/links" і вказуєм exact - щоб шлях викликався
//виключно на силку "/links" яка відповідає за компонент LinksPage що імпортуємо
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
