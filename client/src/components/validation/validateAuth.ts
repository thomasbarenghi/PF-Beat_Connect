'use client'
import i18next from 'i18next'

export const ValidateAuth = (data: any) => {
  const error = {} as any
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!regexEmail.test(data.email) && data.email) {
    if (i18next?.language === 'en') {
      error.email = 'Please enter a valid email address.'
    } else {
      error.email = 'Por favor ingresa un email válido'
    }
  }

  if (!regexPassword.test(data.password) && data.password) {
    if (i18next?.language === 'en') {
      error.password =
        'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    } else {
      error.password =
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.'
    }
  }

  return error
}

export default ValidateAuth
