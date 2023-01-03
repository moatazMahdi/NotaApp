import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetails from '../components/NoteDetail';
import NoteScreen from "../screens/NoteScreen";

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen name="NoteScreen" component={renderNoteScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation