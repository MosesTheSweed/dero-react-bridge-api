import {createContext, useState} from 'react';

export const ApiContext = createContext({})

export const ApiResponseProvider = ({children}) => {
  const [funcName, funcNameSet] = useState()
  const [result, resultSet] = useState()
  const [message, messageSet] = useState()
  const [success, successSet] = useState(false)

  const context = {
    success, successSet,
    message, messageSet,
    result, resultSet,
    funcName, funcNameSet,
  }

  return (
    <ApiContext.Provider value={context}>{children}</ApiContext.Provider>
  )
}