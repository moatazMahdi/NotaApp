import React,{useEffect, useState} from 'react';
import Intro from './src/screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './src/navigation/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './src/components/NoteDetail';
import NoteScreen from './src/screens/NoteScreen';

const App= () => {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };
  
  useEffect(() => {
    findUser();
  }, []);

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen name="NoteScreen" component={renderNoteScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
