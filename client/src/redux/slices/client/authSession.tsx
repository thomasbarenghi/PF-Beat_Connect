'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { createUserSession } from '@/utils/createUserSession.utils'
import { setBougthBeats, setOwnedBeats, setFavoriteBeats } from './beats'
import { setOwnedReviews } from './reviews'
import { setOrders } from './orders'
import i18next from 'i18next'
import { axiosPutter, axiosPoster } from '@/services/axios.service'
import {
  createFormData,
  createSellerData,
  fetchUserData,
  getUserIdFromState,
  processUserData,
  updatePassword,
  updateUserData
} from '@/utils/state'

const initialState = {
  auth: {
    isLogged: false,
    loginMethod: '',
    isSeller: false,
    isAdmin: false,
    tokenValid: false,
    google: {
      googleSessionID: ''
    },
    json: {
      token: ''
    }
  },
  session: {
    current: {} as any
  },
  theme: ''
}

// ------------------ ASYNC THUNKS ------------------//
// JSON LOGIN
export const jsonLogin = createAsyncThunk('authSession/jsonLogin', async (data: any, { dispatch }) => {
  try {
    const userResponse = await axiosPoster({
      url: 'auth',
      body: data
    })

    const session = createUserSession(userResponse.user)
    const auth = {
      isLogged: true,
      loginMethod: 'json',
      isSeller: userResponse.user.isSeller,
      isAdmin: userResponse.user.superAdmin,
      tokenValid: true,
      json: {
        token: userResponse.token
      }
    }
    dispatch(getUserData(userResponse.user._id))
    return { auth, session }
  } catch (error) {
    console.error('jsonLogin error', error)
    throw error
  }
})

// --------------------
// JSON REGISTER
export const jsonRegister = createAsyncThunk('authSession/registerClientUser', async (data: any) => {
  try {
    const response = await axiosPoster({
      url: 'auth/register',
      body: data
    })
    return response
  } catch (error) {
    console.error('jsonRegister error', error)
    throw error
  }
})

// --------------------
// RECOVER PASSWORD
export const recoverPassword = createAsyncThunk('authSession/recoverPassword', async (data: any) => {
  try {
    const response = await axiosPoster({
      url: 'mail/password',
      body: data
    })
    return response
  } catch (error) {
    console.error('recoverPassword error', error)
    throw error
  }
})

// --------------------
export const convertInSeller = createAsyncThunk(
  'authSession/convertInSeller',
  async (data: { mpcode: string }, { getState }) => {
    try {
      const clientId = getUserIdFromState(getState)
      const send = createSellerData(data)
      const response = await updateUserData(clientId, send)
      return response
    } catch (error) {
      console.error('convertInSeller error', error)
      throw error
    }
  }
)

// --------------------
// EDIT CLIENT
export const editClient = createAsyncThunk('authSession/editClient', async (data: any, { getState }) => {
  try {
    const clientId = getUserIdFromState(getState)
    const formData = createFormData(data)
    const response = await updateUserData(clientId, formData)
    const userResponse = createUserSession(response)
    return { userResponse }
  } catch (error) {
    console.error('editClient error', error)
    throw error
  }
})

// --------------------
// PASSWORD RECOVERY
export const passwordRecovery = createAsyncThunk('authSession/passwordRecovery', async (data: any) => {
  try {
    await axiosPutter({
      url: 'recover/password',
      body: data
    })
  } catch (error) {
    console.error('passwordRecovery error', error)
    throw error
  }
})

// --------------------
// CHANGE PASSWORD
export const changePassword = createAsyncThunk('authSession/changePassword', async (data: any, { getState }) => {
  try {
    const clientId = getUserIdFromState(getState)
    const formData = createFormData(data)
    await updatePassword(clientId, formData)
  } catch (error) {
    console.error('changePassword error', error)
    throw error
  }
})

// --------------------
// GET USER DATA
export const getUserData = createAsyncThunk('authSession/getUserData', async (data: any, { getState, dispatch }) => {
  const clientId = data || getUserIdFromState(getState)
  try {
    const response = await fetchUserData(clientId)
    const { bougthBeats, ownedBeats, ownedReviews, orders, favoriteBeats, auth } = processUserData(response)
    dispatch(setBougthBeats(bougthBeats))
    dispatch(setOwnedBeats(ownedBeats))
    dispatch(setOwnedReviews(ownedReviews))
    dispatch(setOrders(orders))
    dispatch(setFavoriteBeats(favoriteBeats))
    const session = createUserSession(response)
    return { auth, session }
  } catch (error) {
    console.error('getUserData error', error)
    throw error
  }
})

// ------------------ SLICE ------------------//
const authSession = createSlice({
  name: 'authSession',
  initialState,
  reducers: {
    setLoginMethod: (state, action) => {
      state.auth.loginMethod = action.payload
    },
    setGoogleSuccessful: (state, action) => {
      state.auth.isLogged = true
      state.auth.tokenValid = true
      state.auth.google.googleSessionID = action.payload.googleSessionID
    },
    resetReducer: (state) => {
      state.auth = initialState.auth
      state.session = initialState.session
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(jsonLogin.fulfilled, (state, action) => {
        state.auth = { ...state.auth, ...action.payload.auth }
        state.session.current = {
          ...state.session.current,
          ...action.payload.session
        }
        const trad = i18next?.language === 'en' ? 'Logged in successfully' : 'Se logueo correctamente'
        toast.success(trad)
      })
      .addCase(jsonLogin.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(jsonRegister.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Registered successfully' : 'Se registró correctamente'
        toast.success(trad)
      })
      .addCase(jsonRegister.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(convertInSeller.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Becoming a seller...' : 'Se está convirtiendo en vendedor...'
        toast(trad)
      })
      .addCase(convertInSeller.fulfilled, (state, action) => {
        state.auth.isSeller = true
        const trad = i18next?.language === 'en' ? 'Became a seller' : 'Se convirtió en vendedor'
        toast.success(trad)
      })
      .addCase(convertInSeller.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(editClient.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Editing...' : 'Se está editando...'
        toast(trad)
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.session.current = {
          ...state.session.current,
          ...action.payload.userResponse
        }
        const trad = i18next?.language === 'en' ? 'Edited successfully' : 'Se editó correctamente'
        toast.success(trad)
      })
      .addCase(editClient.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(passwordRecovery.pending, (state, action) => {})
      .addCase(passwordRecovery.fulfilled, (state, action) => {
        const trad =
          i18next?.language === 'en'
            ? 'Your password has been changed successfully'
            : 'Tu contraseña se cambio correctamente'
        toast.success(trad)
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (action.payload.session.softDelete) {
          state.auth.isLogged = false
          const trad =
            i18next?.language === 'en'
              ? 'Your account is suspended, please contact support.'
              : 'Tu cuenta está suspendida, comunícate con soporte'
          toast.error(trad)
          return
        }
        state.session.current = {
          ...state.session.current,
          ...action.payload.session
        }
        state.auth = { ...state.auth, ...action.payload.auth }
      })
      .addCase(getUserData.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(recoverPassword.pending, (state, action) => {
        const trad =
          i18next?.language === 'en'
            ? 'Sending you an email with recovery request...'
            : 'Te estamos enviando un email con la solicitud de recuperación...'
        toast(trad)
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Email sent' : 'Se envió el email'
        toast.success(trad)
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        toast.error('Error')
      })
      .addCase(changePassword.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Changing password...' : 'Se está cambiando la contraseña...'
        toast(trad)
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Password changed' : 'Se cambió la contraseña'
        toast.success(trad)
      })
      .addCase(changePassword.rejected, (state, action) => {
        toast.error('Error')
      })
  }
})

export const { setLoginMethod, setGoogleSuccessful, resetReducer, setTheme } = authSession.actions

export default authSession.reducer
