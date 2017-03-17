let instance = null
export default class Glogin {
  constructor (params) {
    if (!instance) {
      instance = this
      this.status = 0
      this.user = null
      let changeStatus = (state) => {
        if (this.status === state) {
          return state
        }
        this.status = state
        switch (state) {
          case 0:
          case 1:
          case 2:
            this.user = null
            if (this.logout instanceof Function) {
              this.logout()
            }
            break
          case 3:
            let user = this.auth2.currentUser.get()
            this.user = user.getBasicProfile()
            this.user.access_token = user.getAuthResponse(true).access_token
            if (this.login instanceof Function) {
              this.login(this.user)
            }
            break
          default:
            this.user = null
            break
        }
      }
      window.___gcfg = {
        lang: 'es-AR',
        parsetags: 'explicit'    //    DS?: can the onload param be removed from the line below and added here?
                                 //         E.g., 'explicit','onload'
      }
      var script = document.createElement('script')
      script.src = 'https://apis.google.com/js/client:platform.js'
      this.status = 1
      script.onload = () => {
        var ga = gapi
        if (ga) {
          ga.load('auth', () => {
            ga.client.init(params).then(() => {
              this.auth2 = ga.auth2.getAuthInstance()
              changeStatus(2)
              this.auth2.isSignedIn.listen((isSignedIn) => {
                changeStatus(2)
                if (isSignedIn) {
                  changeStatus(3)
                }
              })
              if (this.auth2.isSignedIn.get()) {
                changeStatus(3)
              } else {
                changeStatus(2)
              }
            })
          })
        }
      }
      document.head.appendChild(script)
    }
    return instance
  }
  getStatus () {
    switch (this.status) {
      case 0:
        return 'disconnect'
      case 1:
        return 'connecting'
      case 2:
        return 'offline'
      case 3:
        return 'online'
      default:
        return 'disconnect'
    }
  }
  callLogin () {
    if (!this.auth2.isSignedIn.get()) {
      this.auth2.signIn()
    }
  }
  callLogout () {
    if (this.auth2.isSignedIn.get()) {
      this.auth2.signOut()
    }
  }
  onLogin (callback) {
    this.login = callback
  }
  onLogout (callback) {
    this.logout = callback
  }
}
