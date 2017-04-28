# react-mc-google
Google login web for mascocitas

Exporta el Store e inicia automaticamente el login con google. requiere
**window.gconfig** para tomar como parametros de inicio.

      window.gconfig = {
      'apiKey': 'AIzaSyBmFn5zPy7Bo354Ja9mJVMdwqd0HGQ9h80',
      // clientId and scope are optional if auth is not required.
      'clientId': 'clientidasdasdasdasdasd.apps.googleusercontent.com',
      'scope': 'profile'
      }
Los componentes se crean con **Reflux.Component**

          import React from 'react'
          import Reflux from 'reflux'
          import Ustore from 'react-mc-google'
          import Uactions from 'react-mc-google/Uactions.jsx'
          import ObjectAssign from 'object-assign'
          export default class Ubar extends Reflux.Component {
            constructor (props) {
              super(props)
              this.state = ObjectAssign({
                name: 'Iniciando sesión...',
                image: 'images/loading.gif',
                status: 'CONNECTING'
              }, window.mcuser)
              this.mapStoreToState(Ustore, this.configureState)
            }
            configureState (fromStore) {
              var obj = {
                status: fromStore.status
              }
              if (fromStore.status) {
                if (fromStore.status === 'ONLINE') {
                  obj.name = fromStore.first_name || fromStore.name
                  obj.image = fromStore.image
                } else if (fromStore.status === 'CONNECTING') {
                  obj.name = 'Iniciando...'
                  obj.image = 'images/loading.gif'
                } else {
                  obj.name = 'Iniciar sesión'
                  obj.image = 'images/logo32.png'
                }
              }
              return obj
            }

          }
