import Gbase from './Gbase.jsx'
export default class Gapp extends Gbase {
  LoginWithGoogle (silent) {
    if (silent) {
      window.plugins.googleplus.trySilentLogin(
        {},
        (guser) => {
          this.setStatus(3, guser)
        },
        (msg) => {
          this.setStatus(2, null)
        }
      )
      return true
    }
    window.plugins.googleplus.login(
      {},
      (guser) => {
        let user = {
          name: guser.givenName,
          image: guser.imageUrl,
          id: guser.userId,
          id_token: guser.idToken
        }
        this.setStatus(3, user)
      },
      (msg) => {
        this.setStatus(2, null)
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
    this.setStatus(2, null)
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
