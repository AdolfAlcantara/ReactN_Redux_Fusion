import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

class Contador extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.elements}>
            <TouchableOpacity onPress={() => this.props.aumentar()}>
                <Text style={styles.text}>Aumentar</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{this.props.contador}</Text>
            <TouchableOpacity onPress={() => this.props.reducir()}>
                <Text style={styles.text}>Reducir</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//para que el reducer pueda realizar cambios necesita acciones 
//y las acciones deben ser "despachadas" por alguien
//la acciones es un objeto solo con la propiedad type
function mapDispatchToProps(dispatch){
    return{
        aumentar: ()=> dispatch({type:'AUMENTAR_CONTADOR'}),
        reducir : ()=> dispatch({type:'REDUCIR_CONTADOR'}),
    }
}

//setea un state para esta clase
function mapStateToProps(state){
    return {
        contador:state.contador
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contador)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elements:{
    flexDirection:'row',
    width:200,
    justifyContent:'space-around'
  },
  text:{
    fontSize:20,
  },
});
