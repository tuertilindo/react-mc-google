import Reflux from 'Reflux'
import Uactions from './Uactions.jsx'
import ObjectAssign from 'object-assign'
import Gapp from './Gapp.jsx'
import Gweb from './Gweb.jsx'
export default class Ustore extends Reflux.Store {

  constructor () {
    super()
    this.state = {
      status: 'CONNECTING'
    }
    this.listenables = Uactions
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      this.gl = new Gapp(window.gconfig)
    } else {
      this.gl = new Gweb(window.gconfig)
    }
    this.gl.onLogin((guser) => {
      this.UpdateUser(guser)
    })
    this.gl.onStatusChange((st) => {
      this.setState({googleStatus: st})
    })
  }
  UpdateUser (user) {
    console.log(user)
    user.status = 'ONLINE'
    window.mcuser = ObjectAssign(this.state, user)
    // Unicamente actualiza los parametros
    this.setState(user)
  }
  LogIn () {
    if (this.state.status === 'CONNECTING') {
      return false
    }
    this.setState({status: 'CONNECTING'})
    this.gl.callLogin()
  }
  LogOut () {
    this.setState({status: 'DISCONNECTING'})
    this.gl.callLogout()
  }
}
