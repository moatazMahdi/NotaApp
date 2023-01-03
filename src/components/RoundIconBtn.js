import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet } from 'react-native';
import Colors from '../assits/colors/Colors';

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
   <Icon 
   name={antIconName}
   size={size || 20}
   color={color || Colors.LIGHT}
   style={[styles.icon, { ...style }]}
   onPress={onPress}
   />
  )
}

const styles = StyleSheet.create({
    icon: {
      width:70,
      height:70,
      backgroundColor: Colors.PRIMARY,
      padding: 15,
      paddingHorizontal:22,
      paddingVertical:19,
      borderRadius: 35,
      elevation: 5,
      marginTop:20,
      alignSelf:'flex-end',
      marginRight:15
    },
  });
export default RoundIconBtn