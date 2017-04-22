import Gapp from './Gapp.jsx'
import Gweb from './Gweb.jsx'
let instance = null
let creador = (params) => {
  if (!instance) {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      instance = new Gapp(params)
    } else {
      instance = new Gweb(params)
    }
  }
  return instance
}
export default creador
