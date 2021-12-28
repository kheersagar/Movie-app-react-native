import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { MyContext } from '../App'
import Card from '../components/card/Card'
import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from '../components/CarouselCardItem/CarouselCardItem'


export default function TvScreen({navigation}) {
  const {tvdata,topRateddata} = useContext(MyContext);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
    <ScrollView >
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Carousel
        layout="default"
        data={tvdata}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={false}
        activeSlideAlignment='start'
        autoplay={true}
        autoplayDelay={5000}
        autoplayInterval={5000}
        loop={true}
      />
      </View> 
      {/* 1 */}
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginVertical:10,color:'white'}}>Latest Tv Shows</Text>
      <Carousel
        layout="default"
        data={tvdata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {tvdata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}        
      />
      </View>
      {/* 2 */}
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Top Rated Shows</Text>
      <Carousel
        layout="default"
        data={topRateddata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {topRateddata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'  
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        
      />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

