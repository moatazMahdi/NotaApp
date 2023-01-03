import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../assits/colors/Colors';
import Icon from 'react-native-vector-icons/AntDesign';



const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const handleModalClose = () => {
      Keyboard.dismiss();
    };
  
    useEffect(() => {
      if (isEdit) {
        setTitle(note.title);
        setDesc(note.desc);
      }
    }, [isEdit]);
  
    const handleOnChangeText = (text, valueFor) => {
      if (valueFor === 'title') setTitle(text);
      if (valueFor === 'desc') setDesc(text);
    };
  
    const handleSubmit = () => {
      if (!title.trim() && !desc.trim()) return onClose();
  
      if (isEdit) {
        onSubmit(title, desc, Date.now());
      } else {
        onSubmit(title, desc);
        setTitle('');
        setDesc('');
      }
      onClose();
    };
  
    const closeModal = () => {
      if (!isEdit) {
        setTitle('');
        setDesc('');
      }
      onClose();
    };
  
    return (
      <>
        <StatusBar  barStyle='dark-content' backgroundColor={'white'} />
        <Modal visible={visible} animationType='fade' style ={{flex:1}}>
          <View style={styles.container}>
            <Icon name='arrowleft' size={25} color={'black'} />
            <TextInput
              value={title}
              multiline
              onChangeText={text => handleOnChangeText(text, 'title')}
              placeholder='Title'
              style={[styles.input, styles.title]}
            />
            <View style = {{height:'90%',marginBottom:90}}>
            <TextInput
              value={desc}
              multiline
              placeholder='Note'
              style={[styles.inputdes, styles.desc]}
              onChangeText={text => handleOnChangeText(text, 'desc')}
            />
            </View>
            <View style={styles.btnContainer}>
              <View style = {styles.checkcontainer}>
              <Icon name='check' size={30} onPress ={handleSubmit} color={'white'} />
              </View>
              {title.trim().length >=4 || desc.trim().length >=5 ? (
                <View style={styles.checkcontainer}>
                <Icon name='close' size={30} onPress={closeModal} color={'white'} />
                </View>
              ) : null}
            </View>
          </View>
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.PRIMARY,
      fontSize: 25,
      color: Colors.DARK,
      marginTop:30,
      height:90

      
    },
    inputdes: {
      borderBottomColor: Colors.PRIMARY,
      fontSize: 20,
      color: Colors.DARK,
      height:300,
      marginBottom:90
    },
    title: {
      height: 40,
      marginBottom: 15,
      fontWeight: 'bold',

    },
    desc: {
      height: 100,
    },
    modalBG: {
      flex: 1,
      zIndex: -1,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 15,
      position:'absolute',
      right:10,
    },
    checkcontainer:{
      backgroundColor:Colors.PRIMARY,
      borderRadius:20,
      width:40,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      margin:5
    },
  });
  
  export default NoteInputModal;