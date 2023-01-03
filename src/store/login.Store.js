import { makeAutoObservable } from "mobx"
import { http } from "@/utils"

class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }

  getToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    console.log(res.data)
    this.token = res.data.token
  }
}

export default LoginStore