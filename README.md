# React Native con Redux

Redux es basicamente una herramienta para las aplicaciones de Javascript que nos permite manejar los estados de la misma en un solo lugar y asi poder manejar de manera mas facil los mismos, mostrando la informacion correspondiente segun las acciones.

En la aplicacion desarrollada en este repositorio se realizo con React Native y una simple implementacion de Redux pero suficiente para comprender como funciona.

## Lo esencial

Redux lo podemos dividir en cuatro partes esenciales de las cuales son los ejes de toda la logica de esta fabulosa herramienta:
..* Reduce, se encarga de modificar los estados a traves de acciones.
..* Store, el cual es el encargado de alojar nuestros states.
..* Dispatcher, es quien se encarga de enviar las acciones.
..* Actionss, las acciones no son mas que objetos con el atributo type que sirve como identificadorlo al ser recibido por el Reduce.

### Reduce
Es una funcion. Al encargarse de modiciar el estado segun las acciones correspondientes, recibe el estado inicial como parametro, el cual debemos inicializar con anteioridad. Como podemos observar, ademas recibe como parametro una accion mediante la cual se decide como el state se vera afectado.

En la aplicacion podemos ver su implementacion en el Archivo **App.js**

```javascript
const initialState={
  contador:0 
}

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
```
### Store
Store es el encargado de almacenar los estados pero para acceder a ellos necesita de una funcion reduce. Para crear un store es necesario importar la funcion `createStore`  de 'redux'. 
En la aplicacion podemos ver su su implementacion en el archivo **App.js**

```javascript
import {createStore} from 'redux';

const store = createStore(reducer);
```

Esto es lo principal que debe ir en nuestro archivo que usaremos de alojamiento para store, para que Redux funcione necesita un contenedor a nivel de raiz, para ello necesita de una clase llamada `Provider` la cual traeremos desde `react-redux`.

```javascript
import {Provider} from 'react-redux';
``` 
este servira de contenedor principal para el resto de nuestros contenedores (o pantallas), a los cuales les pasaremos el estado por medio del atributo `store`

```javascript
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
```

### Dispatcher y Actions
El dispatcer cumple la funcion de enviar las acciones desde cualquier archivo hasta nuestro store. Para que esto sea posible se hacen usos del comando `dispatch`. 

Pero antes de poder enviar acciones a nuestro reducer es necesario mapear el estado que no es enviado desde la clase contenedora. Para ello creamos usaremos el comando `connect` de `react-redux` y una aplicacion que nos permita mapear el estado para este contenedor.

```javascript
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        contador:state.contador
    }
}
```

Una vez mapeado nuestro nuevo estado, ya podemos empezar a crear las acciones que para modificar nuestro state, en este caso como las acciones son bien sencilas, decidi agrupar la funcion del dispatcher con las acciones.

```javascript
function mapDispatchToProps(dispatch){
    return{
        aumentar: ()=> dispatch({type:'AUMENTAR_CONTADOR'}),
        reducir : ()=> dispatch({type:'REDUCIR_CONTADOR'}),
    }
}
```

Como se puede apreciar, lo que el dispatcher envia son objetos con el atributo type, que posteriormente sirve para identificarlo.
Como ya se definieron nuestras acciones y nuestro estado, ya podemos utilizarlas en nuestros elementos.

```javascript
<TouchableOpacity onPress={() => this.props.aumentar()}>
    <Text style={styles.text}>Aumentar</Text>
</TouchableOpacity>
<Text style={styles.text}>{this.props.contador}</Text>
<TouchableOpacity onPress={() => this.props.reducir()}>
    <Text style={styles.text}>Reducir</Text>
</TouchableOpacity>
```
Finalmente solo nos hace falta conectar nuestro contenedor con el store usando el comando `connect`, esto lo hacemos exportando la clase junto con todos las dos funciones que definimos previamente `mapStateToProps` y `mapDispatchToProps`

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(Contador)
```
y listo, asi es como tenemos nuestra aplicacion sencilla de React Native con Redux integrado.

[Redux](http://www.gistia.com/beginners-guide-redux/)
[React Native] (https://facebook.github.io/react-native/)

