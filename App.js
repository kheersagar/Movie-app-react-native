import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons,Feather,MaterialIcons } from "@expo/vector-icons";
// screen
import HomeScreen from "./routes/HomeScreen";
import TvScreen from "./routes/TvScreen";
import MovieScreen from "./routes/MovieScreen";
import { createContext, useEffect, useReducer, useState } from "react";
import axios  from "axios";
// 
import config from "./config";

const MyContext = createContext();
export default function App() {
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  const genres = {
    Action:28,   
    Adventure:12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary:99,
    Drama:18,
    Family: 10751,
    Fantasy: 14,
    History:36,
    Horror:27,
    Music:10402,
    Mystery:9648,
    Romance:10749,
    ScienceFiction: 878,
    TVMovie:10770,
    Thriller:53,
    War:10752,
    ActionAdventure: 10759,
    News:10763,
    Reality:10764,
    SciFi:10765,
    Politics:10768,
    Western:37
  };
 const [keyarray,setKeyarray] = useState();
 const [valuearray,setValuearray] = useState();
  function convertarray(){
     setKeyarray(Object.keys(genres)) 
     setValuearray(Object.values(genres))
    
  }
  const [popularMovies,setPopularMovies] = useState([]);
  const [actionMovies,setActionMovies] = useState([]);
  const [dramaMovie,setDramaMovie] = useState([]);
  const [animationMovies,setAnimationMovies] = useState([]);
  const [romanceMovie,setRomanceMovies] = useState([]);
  const [tvShows,setLatestTVShows] = useState([]);
  const [topRatedTv,setTopRatedTv] = useState([]);

  const [similarId,setSimilarId] = useState({});
  const Tab = createMaterialBottomTabNavigator();

  function render(state,action){
    switch(action.type){
      case 'card' : setSimilarId({
        id:action.id,
        title:action.title,
        data:action.data,
        about:action.about,
        imgUrl:action.imgUrl,
        poster:action.poster,
        genre_ids:action.genre_ids
      });
      break;
    }
  }

  const [state,dispatch] = useReducer(render,0);
// get popular movies
async function getPopularMovies(){
  var options = {
    method: 'GET',
    url: `${config.BASE_URL}/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`
  };
  
  const res = await axios.request(options);
  setPopularMovies(res.data.results);
}
async function getPopularMoviesWithGenre(id,name){
  var options = {
    method: 'GET',
    url: `${config.BASE_URL}/3/discover/movie?api_key=${config.API_KEY}&with_genres=${id}`
  };
  
  const res = await axios.request(options);
  switch(name){ 
   
  case "action": setActionMovies(res.data.results);
  break;
  case "drama" : setDramaMovie(res.data.results);
  break;
  case "animation" : setAnimationMovies(res.data.results);
  break;
  case "romance" : setRomanceMovies(res.data.results);
  break;
  }
}
async function getPopularTVShows(){
  
  var options = {
    method: 'GET',
    url: `${config.BASE_URL}/3/tv/popular?api_key=${config.API_KEY}&language=en-US&page=1`
  };
  
  const res = await axios.request(options);
  setLatestTVShows(res.data.results);
}
async function getTopRatedTVShows(){ 
    var options = {
    method: 'GET',
    url: `${config.BASE_URL}/3/tv/top_rated?api_key=${config.API_KEY}&language=en-US&page=1`
  };
  
  const res = await axios.request(options);
  setTopRatedTv(res.data.results);
}
const topRateddata = [];
topRatedTv.forEach((item)=>{
  topRateddata.push({
    id: item.id,
    title: item.original_name,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
const tvdata = [];
tvShows.forEach((item)=>{
  tvdata.push({
    id: item.id,
    title: item.original_name,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
// 

const data = [];
popularMovies.forEach((item)=>{
  data.push({
    id: item.id,
    title: item.original_title,
    imgUrl:baseImageUrl+item.backdrop_path,
    about:item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})

const actiondata = [];
actionMovies.forEach((item)=>{
  actiondata.push({
    id: item.id,
    title: item.original_title,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
const dramadata = []
dramaMovie.forEach((item)=>{
  dramadata.push({
    id: item.id,
    title: item.original_title,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
const animationdata = []
animationMovies.forEach((item)=>{
  animationdata.push({
    id: item.id,
    title: item.original_title,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
const romancedata = []
romanceMovie.forEach((item)=>{
  romancedata.push({
    id: item.id,
    title: item.original_title,
    imgUrl:baseImageUrl+item.poster_path,
    about: item.overview,
    poster:baseImageUrl+item.backdrop_path,
    genre_ids:item.genre_ids
  })
})
useEffect(()=>{
  getPopularMovies();
  getPopularMoviesWithGenre(genres.Action,"action");
  getPopularMoviesWithGenre(genres.Drama,"drama");
  getPopularMoviesWithGenre(genres.Animation,"animation");
  getPopularMoviesWithGenre(genres.Romance,"romance");
  getPopularTVShows();
  getTopRatedTVShows();
  convertarray();
},[])
  return (
    <MyContext.Provider value={{
      dispatch,
      baseImageUrl,
      genres,
      data,
      actiondata,
      dramadata,
      animationdata,
      romancedata,
      tvdata,
      topRateddata,
      similarId,
      keyarray,
      valuearray
    }}>
    <NavigationContainer>
      <Tab.Navigator
        shifting={false}
        barStyle={{ backgroundColor: 'rgba(34,36,40,1)' }}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingVertical:10,
          },
          tabBarActiveTintColor:"white",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-minus-outline" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen name="Tv" component={TvScreen} 
          options={{
            tabBarLabel: "Tv",
            tabBarIcon: ({ color, size }) => (
              <Feather name="tv" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen name="Movies" component={MovieScreen} 
          options={{
            tabBarLabel: "Movies",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="movie-open" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </MyContext.Provider>
  );
}

export {MyContext};