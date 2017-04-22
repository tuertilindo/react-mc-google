import Gbase from './Gbase.jsx'
export default class Gweb extends Gbase {
  constructor (params) {
    super(params)
    window.___gcfg = {
      lang: 'es-AR',
      parsetags: 'explicit'
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
            super.changeStatus(2, null)
            this.auth2.isSignedIn.listen((isSignedIn) => {
              super.changeStatus(2, null)
              if (isSignedIn) {
                let guser = this.auth2.currentUser.get().getBasicProfile()
                super.changeStatus(3, {
                  'id': guser.getId(),
                  'name': guser.getGivenName(),
                  'image': guser.getImageUrl(),
                  'email': guser.getEmail(),
                  'id_token': this.auth2.currentUser.get().getAuthResponse(true).id_token
                })
              }
            })
            if (this.auth2.isSignedIn.get()) {
              let guser = this.auth2.currentUser.get().getBasicProfile()
              super.changeStatus(3, {
                'id': guser.getId(),
                'name': guser.getGivenName(),
                'image': guser.getImageUrl(),
                'email': guser.getEmail(),
                'id_token': this.auth2.currentUser.get().getAuthResponse(true).id_token
              })
            } else {
              super.changeStatus(2, null)
            }
          })
        })
      }
    }
    document.head.appendChild(script)
  }
  getGoogleAuth () {
    if (!this.auth2) {
      this.auth2 = gapi.auth2.getAuthInstance()
    }
    return this.auth2
  }
  callLogin () {
    if (!this.getGoogleAuth().isSignedIn.get()) {
      this.auth2.signIn()
    }
  }
  callLogout () {
    if (this.getGoogleAuth().isSignedIn.get()) {
      this.auth2.signOut()
    }
  }
}
