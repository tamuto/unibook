import { create } from 'zustand'
import { Amplify, Auth } from 'aws-amplify'
import axios from 'axios'

import environ from '~/environ.json'

Amplify.configure(environ.AwsConfig)
axios.defaults.baseURL = environ.BaseURL

const useLoginState = create((set) => ({
  mode: 0,
  userInfo: {},
  alertInfo: {
    display: false,
    message: '',
    variant: ''
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  setAlertInfo: (alertInfo) => set({ alertInfo }),
  init: async () => {
    try {
      const data = await Auth.currentSession()
      axios.defaults.headers.common.Authorization = data.idToken.jwtToken
      await axios.get('/api/init')
      // ログイン状態の初期化
      set({ mode: 1, userInfo: data })
    } catch (e) {
      set({ mode: 0 })
    }
  },
  toSignIn: async (alertInfo) => {
    set({ mode: 0, alertInfo })
  },
  signIn: async () => {
    useLoginState.getState().init
  },
  signUp: async () => {
    set({ mode: 2 })
  },
  accountInfoCheck: async (value) => {
    set({ mode: 3, userInfo: value })
  },
  confirmed: async (value) => {
    set({ mode: 4, userInfo: value })
  },
  passwordReset: async () => {
    set({ mode: 5 })
  },
  newPassword: async (value) => {
    set({ mode: 6, userInfo: value })
  },
  singOut: () => set({ mode: 0 })
}))

export default useLoginState
