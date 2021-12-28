import React, { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MyContext } from '../../App'
import style from './Cardstyle'

export default function Card({id,title,imgUrl,poster,genre_ids,about,rating,index,data,navigation}) {
  const {dispatch} = useContext(MyContext);
  return (
      <TouchableOpacity style={style.container} key={index} onPress={()=> {
        navigation.navigate('Movies');
        dispatch({type:'card',id:id,data:data,imgUrl:imgUrl,poster:poster,title:title,genre_ids:genre_ids,about:about,rating:rating})
      }}>
        <Image
          source={{ uri: imgUrl }}
          style={style.image}
        />
      </TouchableOpacity>
  )
}

