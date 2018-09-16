import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Contador from './container/Contador';

const initialState={
  contador:0 
}

//es el encargado de cambiar el state a traves de las acciones
const reducer = (state = initialState,action) =>{
  switch(action.type)
  {
    case 'AUMENTAR_CONTADOR':
      return {contador:state.contador+1}
    case 'REDUCIR_CONTADOR':
      return {contador:state.contador-1}
  }
  return state
}

//crea el contenedor del store para los state, necesita un reducer para poder acceder al state
const store = createStore(reducer);



export default class App extends React.Component {
  render() {
    return (
      //se separa porque se necesita un contenedor a nivel raiz
      <Provider store={store}>
        <Contador/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
