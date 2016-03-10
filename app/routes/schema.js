
export default {

  welcome         : {
    initialRoute: true,

    title       : 'Estrenos',
    component   : require('../containers/ListVideoContainer').default,
    children    : {
      detail : {
        title    : 'Descripción',
        component: require('../containers/DetailVideo').default,
        children : {
          loading: {
            title    : 'Cargando',
            component: require('../components/Loading').default
          }
        }
      }
    }
  }
}
