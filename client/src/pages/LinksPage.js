import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
//тут ми будемо працювати з силками тому useState() - з пустим масивом []
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
//Цим запитом я отримую силки з '/api/link' токену `Bearer ${token}`
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
//Коли силки загрузяться то поміщаємо їх в локальний стан - links
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

//Якщо ще не виконалась загрузка з сервера то loading = true і показуєм <Loader/> 
//Коли загрузка request() - виконається то loading = false і виконається return
  if (loading) {
    return <Loader/>
  }

  return (
    <>
//loading = false -> віддаємо в <LinksList /> список силок які передаєм як links={links} 
      {!loading && <LinksList links={links} />}
    </>
  )
}
