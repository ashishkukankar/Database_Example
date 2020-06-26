/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import TodoListComponent from './src/component/TodoListComponent';


const Stack = createStackNavigator()

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name= "ToDoList"
         component= {TodoListComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
