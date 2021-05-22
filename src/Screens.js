import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Screens({route, navigation}) {
  const { description, temperature, cityName, countryName, lang} = route.params;
  let snowScreen, wQCountryName, screens;
  let wQCityName = cityName.split('"').join('');
  if(countryName === undefined) wQCountryName = '';
  else wQCountryName = countryName.split('"').join('');
  let wQDescription = description.split('"').join('');
  let language = JSON.parse(lang);
  language ? screens = [
    {text: "Snowy Day Walk", iconName:"md-snow-outline", temp: -15, bg: '#69e2f5'},
    {text: "It's Cold Outside", iconName:"md-snow", temp: -5, bg: '#16e5ff'},
    {text: "Light Rain ", iconName:"md-rainy", description: "light rain", bg: '#ff81e5'},
    {text: "Sunny Day Walk", iconName:"md-sunny", temp: 18, bg: '#ff8362'},
    {text: "Today Is Cloudy", iconName:"md-cloud", description: "overcast clouds", bg: '#83bec7'},
    {text: "It's Mist Outside", iconName:"md-cloudy", description: "mist", bg: '#bbc3c4'},
    {text: "Cool Weather", iconName:"md-leaf", temp: 0, bg: '#cfa1e3'},
    {text: "Today Is Haze", iconName:"md-cloudy", description: "haze", bg: '#c5d6cb'},
    {text: "It's Dust Now", iconName:"md-cloud", description: "dust", bg: '#e8c48e'},
    {text: "Sand Day", iconName:"md-cloudy", description: "sand", bg: '#cc8f33'},
    {text: "It's Raining Now", iconName:"md-rainy", description: "moderate rain", bg: '#8494e0'},
  ]
  :
  screens = [
    {text: "Ооочень Холодно", iconName:"md-snow-outline", temp: -15, bg: '#69e2f5'},
    {text: "Пока Ещё Ходим В Куртках, Дублёнках", iconName:"md-snow", temp: -5, bg: '#16e5ff'},
    {text: "Сейчас Идёт Небольшой Дождик", iconName:"md-rainy", description: "light rain", bg: '#ff81e5'},
    {text: "Солнечная Погода", iconName:"md-sunny", temp: 18, bg: '#ff8362'},
    {text: "Облачно", iconName:"md-cloud", description: "overcast clouds", bg: '#83bec7'},
    {text: "Туманно", iconName:"md-cloudy", description: "mist", bg: '#bbc3c4'},
    {text: "Сегодня Прохладно", iconName:"md-leaf", temp: 0, bg: '#cfa1e3'},
    {text: "Легкий туман", iconName:"md-cloudy", description: "haze", bg: '#c5d6cb'},
    {text: "В Воздухе Пыльновато, Надень Маску!", iconName:"md-cloud", description: "dust", bg: '#e8c48e'},
    {text: "Возможны Песочные Бури", iconName:"md-cloudy", description: "sand", bg: '#cc8f33'},
    {text: "За Окном Rain, На Душе Pain", iconName:"md-rainy", description: "moderate rain", bg: '#8494e0'},
  ];
  
  if(wQDescription === "light rain"){
    snowScreen = screens[2];//rain
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if(wQDescription === "moderate rain"){
    snowScreen = screens[10];//moderate rain
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if(wQDescription === "haze"){
    snowScreen = screens[7];//haze
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if(wQDescription === "dust"){
    snowScreen = screens[8];//dust
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if(wQDescription === "sand"){
    snowScreen = screens[9];//sand
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if((wQDescription === "overcast clouds" || 
            wQDescription === "few clouds" ||
            wQDescription === "broken clouds" ||
            wQDescription === "scattered clouds") &&
            +temperature >= 0
          ){
    snowScreen = screens[4];//cloud
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  }else if(wQDescription === "mist"){
    snowScreen = screens[5];//mist
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(snowScreen.bg);
  } else{
    if(+temperature <= -15){
      snowScreen = screens[0];//too cold
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(snowScreen.bg);
    }
    if(+temperature > -15 && +temperature <= -5){
      snowScreen = screens[1];//cold
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(snowScreen.bg);
    }
    if(+temperature > -5 && +temperature <= 16){
      snowScreen = screens[6]; //cool
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(snowScreen.bg);
    }
    if(+temperature > 16){
      snowScreen = screens[3]; //sunny
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(snowScreen.bg);
    }
  }

  function btnHandler(){
    navigation.goBack();
    StatusBar.setBackgroundColor('#c0c0c0');
  }

  return (
    <View style={styles.wrap}>
      <View style={{'backgroundColor': snowScreen.bg,
                    'paddingTop':windowHeight*0.08,
                    'borderBottomRightRadius': 20,
                    'borderBottomLeftRadius': 20}}>
        <View style={styles.cardContainer}>
          <View style={styles.goBackBtn}>
            <TouchableOpacity onPress={() => btnHandler()}>
              <Ionicons name={'md-arrow-back'} size={40} color="white" />
            </TouchableOpacity>
          </View>
          {language ?
            <Text style={styles.encardText}>{snowScreen.text}</Text>
            :
            <Text style={styles.rucardText}>{snowScreen.text}</Text>
          }
          <Ionicons name={snowScreen.iconName} size={50} color="white" />
        </View>
        
        <View style={styles.degContainer}>
          <Text style={styles.degText}>{temperature}&deg;</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Text style={styles.countryCity}>{`${wQCityName}, ${wQCountryName}`}</Text>
        <Image style={styles.img} source={
                                    (snowScreen.description == "moderate rain" && require("../assets/imgs/rain.png")) ||
                                    (snowScreen.description == "dust" && require("../assets/imgs/dust.png")) ||
                                    (snowScreen.description == "sand" && require("../assets/imgs/sand.png")) ||
                                    (snowScreen.description == "haze" && require("../assets/imgs/haze.png")) ||
                                    (snowScreen.temp == "-15" && require("../assets/imgs/Cold-Weather.jpg")) ||
                                    (snowScreen.description == "light rain" && require("../assets/imgs/light-rain.png")) ||
                                    (snowScreen.temp == "18" && require("../assets/imgs/sunny.png")) ||
                                    (snowScreen.temp == "-5" && require("../assets/imgs/snowman.png")) ||
                                    (snowScreen.description == "overcast clouds" && require("../assets/imgs/cloud.png")) ||
                                    (snowScreen.description == "mist" && require("../assets/imgs/mist.png")) ||
                                    (snowScreen.temp == "0" && require("../assets/imgs/wind.png"))
        }
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  encardText: {
    color: '#fff',
    fontSize: 36
  },
  rucardText: {
    width: 190,
    color: '#fff',
    fontSize: 36,
    flexWrap: 'wrap'
  },
  degContainer: {
    alignItems: 'center',
    width: windowWidth,
    justifyContent:'center',
    margin: 20
  },
  degText: {
    color: '#fff',
    fontSize: 48
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: '80%',
    width: windowWidth*0.8,
    resizeMode: "contain",
  },
  goBackBtn: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#eee'
  },
  countryCity: {
    fontSize: 20
  }
});
