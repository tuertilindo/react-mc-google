import Gbase from './Gbase.jsx'
export default class Gapp extends Gbase {
  constructor (params) {
    super(params)
    document.addEventListener('deviceready', () => {
        this.LoginWithGoogle(true)
      }, false)
  }
  LoginWithGoogle (silent) {
    if (super.status === 0) {
      return false
    }
    if (this.status === 3) {
      return false
    }
    if (!window.plugins) {
      super.changeStatus(2, null)
      return false
    }
    if (silent) {
      window.plugins.googleplus.trySilentLogin(
        {},
        (guser) => {
          super.changeStatus(3, guser)
        },
        (msg) => {
          super.changeStatus(2, null)
          console.log(msg)
        }
      )
      return true
    }
    window.plugins.googleplus.login(
      {},
      (guser) => {
        super.changeStatus(2, guser)
      },
      (msg) => {
        super.changeStatus(2, null)
        console.log(msg)
      }
    )
    return true
  }
  callLogin () {
    if (super.status === 1 || super.status === 3) {
      return false
    }
    this.LoginWithGoogle()
  }
  callLogout () {
    if (super.status !== 3) {
      return false
    }
    super.changeStatus(2, null)
    window.plugins.googleplus.logout(
      (msg) => {
        console.log(msg)
      },
      (msg) => {
        console.log(msg)
      }
    )
  }
}
