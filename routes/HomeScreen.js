import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { MyContext } from '../App'
import Card from '../components/card/Card'
import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from '../components/CarouselCardItem/CarouselCardItem'


export default function HomeScreen({navigation}) {
  const {data,actiondata,dramadata,animationdata,romancedata,tvdata} = useContext(MyContext);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
    <ScrollView >
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Carousel
        layout="default"
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={false}
        activeSlideAlignment='start'
        autoplay={true}
        autoplayDelay={3000}
        autoplayInterval={3000}
        loop={true}
      />
      </View> 
      {/* 1 */}
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginVertical:10,color:'white'}}>Latest & Trending</Text>
      <Carousel
        layout="default"
        data={data}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {data} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
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
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Action Movies</Text>
      <Carousel
        layout="default"
        data={actiondata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {actiondata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'  
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        
      />
      </View>
      {/* 3 */}
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Drama Movies</Text>
      <Carousel
        layout="default"
        data={dramadata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {dramadata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        
      />
      </View>
      {/* 4 */}
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Kids Movies</Text>
      <Carousel
        layout="default"
        data={animationdata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {animationdata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        
      />
      </View>
      {/* 5 */}
      <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Romance Movies</Text>
      <Carousel
        layout="default"
        data={romancedata}
        renderItem={({item})=> <Card genre_ids= {item.genre_ids} data = {romancedata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={130}
        activeSlideAlignment='start'
        inactiveSlideShift={0}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        
      />
      </View>
      {/* 6 */}
      <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',width:'100%',height:230,marginBottom:10}}>
      <Text style={{fontSize:20,fontWeight:'700',marginLeft:10,marginBottom:10,color:'white'}}>Popular TV Shows </Text>
      <Carousel
        layout="default"
        data={tvdata}
        renderItem={({item})=><Card genre_ids= {item.genre_ids} data = {tvdata} navigation={navigation} id={item.id} title={item.title} imgUrl={item.imgUrl} poster={item.poster} about={item.about} />}
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

