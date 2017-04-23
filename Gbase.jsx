export default class Gbase {
  constructor (params) {
    this.status = 0
    this.user = null
    this.isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)
    if (!this.isMobile) {
    }
  }
  static setStatus (state, user) {
    this.state = state
    this.user = user
    if (this.changeStatus instanceof Function) {
      this.changeStatus({
        user: this.user,
        status: this.status,
        desc: this.getStatus()
      })
    }
    switch (state) {
      case 0:
      case 1:
      case 2:
        if (this.logout instanceof Function) {
          this.logout()
        }
        break
      case 3:
        if (this.login instanceof Function) {
          this.login(this.user)
        }
        break
      default:
        break
    }
  }
  static getStatus () {
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
  }
  callLogout () {
  }
  static onLogin (callback) {
    this.login = callback
  }
  static onLogout (callback) {
    this.logout = callback
  }
  static onStatusChange (callback) {
    this.changeStatus = callback
  }
}
