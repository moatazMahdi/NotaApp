import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Colors from '../assits/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
      <View style={[styles.container, { ...containerStyle }]}>
        <AntDesign name='search1' size={20} color ={'black'} style ={styles.searchicon}/>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          placeholder='Search here..'
        />
        {value ? (
          <AntDesign
            name='close'
            size={20}
            color={'black'}
            onPress={onClear}
            style={styles.clearIcon}
          />
        ) :null}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    searchBar: {
      borderColor: Colors.PRIMARY,
      height: 45,
      borderRadius: 40,
      paddingLeft: 40,
      fontSize: 20,
      alignItems:'center'
    },
    container: {
      justifyContent: 'center',
      backgroundColor:'#ebebe0',
      borderRadius: 40,
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
    },
    searchicon:{
      position:'absolute',
      left:10,
      
    }
  });
  
  export default SearchBar;