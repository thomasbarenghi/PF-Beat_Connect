'use client'
import i18next from 'i18next'

export const ValidateRecoverMail = (data: any) => {
  const error = {} as any
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!regexEmail.test(data)) {
    if (i18next?.language === 'en') {
      error.email = 'Please enter a valid email address.'
    } else {
      error.email = 'Por favor ingresa un email válido'
    }
  }

  return error
}
