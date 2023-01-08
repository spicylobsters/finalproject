import { makeAutoObservable } from "mobx"
import { setToken, getToken, http, clearToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    console.log(res.data)
    this.token = res.data.token
    setToken(this.token)
  }

  logOut = () => {
    clearToken()
    this.token = ''
  }
}

export default LoginStore