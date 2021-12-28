import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyContext } from "../App";
import Carousel from "react-native-snap-carousel";
import {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from "../components/CarouselCardItem/CarouselCardItem";
import Card from "../components/card/Card";
import config from "../config";

export default function MovieScreen({ navigation }) {
  const { baseImageUrl,data,similarId,keyarray,valuearray } = useContext(MyContext);
  const [similar, setSimilar] = useState([]);
  const [movieGenre,setMovieGenre] = useState([]);
  
  
  async function getGenreOfMovie(){
   await similarId.genre_ids.forEach((item)=>{
      setMovieGenre((prev)=>{
       return [...prev,keyarray[valuearray.indexOf(item)]]
      })

    })
  }

  async function getSimilar(id) {
    var options = {
      method: 'GET',
      url:  `${config.BASE_URL}/3/movie/${id}/similar?api_key=${config.API_KEY}&language=en-US&page=1`
    };
    try{
      const res = await axios.request(options)
      setSimilar(res.data.results);
    }catch(ex){
      console.log(ex);
    }
  }
  const similardata = [];
  similar.forEach((item) => {
    similardata.push({
      id: item.id,
      title: item.original_title,
      imgUrl:baseImageUrl+item.poster_path,
      about: item.overview,
      poster:baseImageUrl+item.backdrop_path,
      genre_ids: item.genre_ids
    });
  });
  useEffect(() => {
    getSimilar(similarId.id);
    setMovieGenre([]);
    getGenreOfMovie();
  }, [similarId.id]);
  if(Object.keys(similarId).length == 0 ) return (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Please Select Any Movie or Show for HomePage</Text></View>)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: similarId.poster }}
            style={{ width: "100%", height: 200 }}
          />
        </View>
        <View style={styles.second_section}>
          <View style={{ flex: 0.5, paddingVertical: 20 }}>
            <Image
              source={{ uri: similarId.imgUrl }}
              style={{ width: "100%", height: 120, borderRadius: 10 }}
            />
          </View>
          <View style={{ flex: 2 ,paddingLeft:10,justifyContent:'flex-start',alignItems:'flex-start'}}>
            <Text style={styles.title}>{similarId.title}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {movieGenre.map((item)=>{
              return <Text style={styles.genre} key={styles.genre+ Math.random(10)}>{item} </Text>
            })}
            </View>             
          </View>
        </View>
        <View style={styles.about}>
          <Text style={styles.aboutText}>{similarId.about}</Text>
        </View>
        <View
          style={{flex:1,justifyContent:'center',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}
        >
        <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,marginVertical:10,color:'white'}}>More Like This</Text>
          <Carousel
            layout="default"
            data={similardata}
            renderItem={({ item }) => (
              <Card
              genre_ids= {item.genre_ids} data = {similardata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about}
              />
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={130}
            activeSlideAlignment="start"
            inactiveSlideShift={0}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  second_section: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  about: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  title:{
    color:'white',
    fontSize:18,
    fontWeight:'700',
  },
  aboutText: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
  },
  genre:{
    color:'gray',
    fontSize:14,
    marginLeft:2,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  }
});
