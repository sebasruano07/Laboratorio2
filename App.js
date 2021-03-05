import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Picker, StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [monedas, setMonedas] = useState('');
  const [cripto, setCripto] = useState([]);
  const [criptoActual, setCriptoActual] = useState([]);
  const [criptoName, setCriptoName] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [vista, setVista] = useState(false)
  
  useEffect(() => {
    fetch('https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD')
      .then(response => response.json())
      .then (data => {
        let coinInfo = data.Data
        console.log("JSON: " + coinInfo.length)
        coinInfo.forEach(element => {
          CriptoMonedaArray.push(element.CoinInfo.Name)
          NombreCriptoArray.push(element.CoinInfo.FullName)
        });
        setCripto(CriptoMonedaArray)
        setCriptoName(NombreCriptoArray)
        console.log(CriptoMonedaArray)
      })
  }, []);
  
  let CriptoMonedaArray = [];
  let arrPickerItems = [];
  let costoCriptoArray = [];
  let NombreCriptoArray = [];
  let attrName;
  let atrrValue;

  criptoName.map((is, index) => {
    CriptoMonedaArray.push(is)
  })

  cripto.map((item, index) => {
    arrPickerItems.push(<Picker.Item label={CriptoMonedaArray[index]} value={item} key={index}/>)
  })

  return (
    <View style={styles.container}>
      {vista ? <Text style={styles.texto}>El Valor de {criptoActual} en {monedas} es: {resultado}</Text>: null}
      {/* Monedas */}
      <Picker 
        style={styles.monedas}
        selectedValue={monedas}
        onValueChange={(itemValue, itemIndex) => {
          setMonedas(itemValue)
        }}
      >
        <Picker.Item label="Elija la moneda" value="Moneda"/> 
        <Picker.Item label="Dolar Estadounidense" value="USD"/> 
        <Picker.Item label="Libras Esterlinas" value="GBP"/> 
        <Picker.Item label="Yen Japones" value="JPY"/> 
        <Picker.Item label="Euro" value="EUR"/> 
      </Picker>

      {/* Criptomonedas */}
      <Picker
        style={styles.monedas}
        selectedValue={criptoActual}
        onValueChange={(itemValue, itemIndex) => {
          setCriptoActual(itemValue)
          console.log(itemIndex)
        }}
      > 
        <Picker.Item label="Elija la criptomoneda" value="EjijaC"/>
        {arrPickerItems}
      </Picker>

      <Button
        title="Consultar Valor en Criptomoneda"
        color='#4D8076'
        onPress = {() => {
          fetch(`https://min-api.cryptocompare.com/data/price?fsym=${criptoActual}&tsyms=${monedas}`)
          .then(response => response.json())
          .then(data => {
              for (let monedas in data) {
                attrName = monedas;
                atrrValue = data[monedas]
              }
              costoCriptoArray.push(atrrValue)
            //setCostoCripto(costoCriptoArray)
            console.log(data)
            setResultado(atrrValue)
          })
          setVista(true)
        }} 
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4FCEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monedas: {
    height: 50,
    width: '60%',
    backgroundColor: '#aaa',
    borderBottomColor: '#bbb',
    borderBottomWidth: 2,
    marginBottom: 35
  },
  texto: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 35
  }
});
