import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
//.id - беремо з файлу routes.js. І тепер 
//linkId - міститиме id нашої чилки по якій ми можемо зробити запит
  const linkId = useParams().id

//Метод що дозволить загрузити силку 
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
//передавши setLink() значеннч fetched - ми локально формуємо цю силку
      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
//getLink() - буде виконано коли в нас буде готовий компонент що і оприділяємо 
//в useEffect(мабуть того що useEffect виконується при наявності залежностей мабуть як true)
    getLink()
  }, [getLink])

//loading - матиме значення true доки виконуватиметься запит на сервер і 
//false по завершенні виконання
  if (loading) {
    return <Loader />
  }

  return (
    <>
//Якщо loading = false і в link = true(топто силка присутня) тоді показую 
//<LinkCard /> якому передаю залежність link={link} 
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}
