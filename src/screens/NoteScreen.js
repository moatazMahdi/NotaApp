import React, { useEffect, useState } from 'react'
import { View, Text,StatusBar,Dimensions,StyleSheet, TouchableWithoutFeedback,Keyboard,FlatList, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotFound from '../components/NotFound';
import SearchBar from '../components/SearchBar';
import Note from '../components/Note';
import NoteInputModal from '../components/NoteInputModal';
import RoundIconBtn from '../components/RoundIconBtn';


const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };
  
const NoteScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);
    const [notes, setNotes] = useState([]);
  
  
    const findGreet = () => {
      const hrs = new Date().getHours();
      if (hrs === 0 || hrs < 12) return setGreet('Morning');
      if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
      setGreet('Evening');
    };

    const findNotes = async () =>{
      const result = await AsyncStorage.getItem('notes');
      console.log(result)
      if(result !== null) setNotes (JSON.parse(result))
    }
  
    useEffect(() => {
      findNotes()
      findGreet();
    }, []);
  
    const reverseNotes = reverseData(notes);
  
    const handleOnSubmit = async (title, desc) => {
      const note = { id: Date.now(), title, desc, time: Date.now() };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
  
    const openNote = note => {
      navigation.navigate('NoteDetail', { note });
    };
  
    const handleOnSearchInput = async text => {
      setSearchQuery(text);
      if (!text.trim()) {
        setSearchQuery('');
        setResultNotFound(false);
        return await findNotes();
      }
      const filteredNotes = notes.filter(note => {
        if (note.title.toLowerCase().includes(text.toLowerCase())) {
          return note;
        }
      });
  
      if (filteredNotes.length) {
        setNotes([...filteredNotes]);
      } else {
        setResultNotFound(true);
      }
    };
  
    const handleOnClear = async () => {
      setSearchQuery('');
      setResultNotFound(false);
      await findNotes();
    };
  
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor={'white'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
            {notes.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginVertical: 15 }}
                onClear={handleOnClear}
              />
            ) : null}
  
            {resultNotFound ? (
              <NotFound />
            ) : (
              <FlatList
                data={reverseNotes}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Note onPress={() => openNote(item)} item={item} />
                )}
              />
            )}
  
            {!notes.length ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeaderContainer,
                ]}
              >
                <Text style={styles.emptyHeader}>Add Notes</Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName='plus'
          style={styles.addBtn}
        />
        <NoteInputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleOnSubmit}
        />
      </>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop:20,
      color:'black'
    },
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
      backgroundColor:'white'
    },
    emptyHeader: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    addBtn: {
      width:60,
      height:60,
      position: 'absolute',
      right: 0,
      bottom: 50,
      zIndex: 1,
    },
  });
export default NoteScreen