import {useState, useCallback} from 'react'

export const useHttp = () => {
//Цей стейт дозволяв в даному компоненті показувати індикатор loading доки виконується занрузка await
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

//Щоб React не входив в рекурсію додаємо хук useCallback()
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
//По замовчуванні body приводиться до строки і ми в результаті отримуєм [object Object] тому 
//перевіряємо - якщо ми передаємо body в реквест то 
      if (body) {
//Приводимо body до строки
        body = JSON.stringify(body)
//Явно вказуємо що передаємо по мережі json бо інакше в результаті отримає пустий обєкт а так ми
// на сервері приймемо правильні дані
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

//Щоб передавати список залежностей необхідно обернути в useCallback()
  const clearError = useCallback(() => setError(null), [])

//Результатом функції буде loading, request, error, clearError
  return { loading, request, error, clearError }
}
