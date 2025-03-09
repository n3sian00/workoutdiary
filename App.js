import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Home from './screens/Home'; 
import History from './screens/History'; 
import Settings from './screens/Settings';
import styles from './styles/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'black', tabBarStyle: styles.tabBarStyle, tabBarLabelStyle: styles.tabBarLabel }}>
          <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => <MaterialIcons name='home' size={30} /> }} />
          <Tab.Screen name='History' component={History} options={{ tabBarIcon: () => <MaterialIcons name='history' size={30} /> }} />
          <Tab.Screen name='Settings' component={Settings} options={{ tabBarIcon: () => <MaterialIcons name='settings' size={30} /> }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}