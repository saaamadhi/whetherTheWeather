import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar,Image} from 'react-native';

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('#c0c0c0');

export default function Form({navigation}) {
  const [isEnLangClicked, setEnLangClicked] = useState(true);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');
  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  const unit = '&units=metric';
  const key = '&APPID=1b42211d0884924c9d39f6bb5aa4abcb';

  async function getWeather(){
    setError('');
    const url = `${baseUrl}${cityName}${unit}${key}`;
    let response = await fetch(url);
    if(response.ok){
      let data = await response.json();
      let results = {
        description: JSON.stringify(data['weather'][0]['description']),
        temperature: JSON.stringify(Math.round(data['main']['temp'])),
        cityName: JSON.stringify(data['name']),
        countryName: JSON.stringify(data['sys']['country']),
        lang: JSON.stringify(isEnLangClicked)
      }
      navigation.navigate('Screens', results);
    } else {
      isEnLangClicked ? setError('*Error! City not found!') : setError('*Ошибка!Город не найден!');
    }
  }

  function enHandler(){
    setEnLangClicked(true)
  }
  function ruHandler(){
    setEnLangClicked(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.langContainer}>
        <View style={styles.ruBtn}>
          <TouchableOpacity onPress={() => ruHandler()}>
            <Image style={styles.langImg} source={require("../assets/imgs/russia.png")}/>
          </TouchableOpacity>
        </View>
        <View style={styles.enBtn}>
          <TouchableOpacity onPress={() => enHandler()}>
            <Image style={styles.langImg} source={require("../assets/imgs/united-kingdom.png")}/>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {isEnLangClicked ?
        <Text style={styles.label}>Enter city name and press search button</Text>
        :
        <Text style={styles.label}>Введите город и нажмите кнопку поиска</Text>
        }
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {isEnLangClicked ?
            <TextInput style={styles.input} placeholder="Enter city name..." onChangeText={(text) => setCityName(text)} value={cityName}></TextInput>
            :
            <TextInput style={styles.input} placeholder="Введите город..." onChangeText={(text) => setCityName(text)} value={cityName}></TextInput>
          }
          
        </View>
        <View>
            <Text style={styles.error}>{error}</Text>
        </View>
        <View style={styles.getWeatherBtn}>
          <TouchableOpacity onPress={() => getWeather()}>
          {isEnLangClicked ?
            <Text style={styles.getWeatherBtnText}>Get Weather</Text>
            :
            <Text style={styles.getWeatherBtnText}>Погода?</Text>
          }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: '5%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formContainer: {
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  label: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  getWeatherBtn: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#99e8dc",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10
  },
  getWeatherBtnText: {
    color: '#fff',
    fontSize: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: 240,
    fontSize: 25,
    borderBottomColor: '#909992',
    borderBottomWidth: 1
  }, 
  error: {
    color: 'red',
    fontSize: 18
  },
  langImg: {
    width: 40,
    height: 40
  },
  langContainer: {
    width: 150,
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
