import { View, Text,StyleSheet,StatusBar, TextInput,Dimensions } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundIconBtn from '../components/RoundIconBtn';

const Intro = ({ onFinish }) => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);
    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
      };
    return (
    <View style ={styles.mainstyle}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
      <Text style = {styles.text}>Enter Your Name</Text>
      <TextInput 
            style = {styles.TextInput}
            placeholder='Enter Your Name'
            onChangeText={handleOnChangeText}
            value={name}
      />
       {name.trim().length >= 4 ? (
          <RoundIconBtn antIconName='arrow-right' onPress={handleSubmit} />
        ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
    mainstyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    TextInput:{
        width:Dimensions.get('window').width-50,
        borderWidth:1,
        borderRadius:20,
        height:60,
        paddingLeft:20
    },
    text:{
        alignSelf:'flex-start',
        marginLeft:30,
        marginBottom:10,
        color:'black',
        opacity:0.7
    },
})
export default Intro