import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import IspirazioniScreen from './src/screens/IspirazioniScreen';
import PianificaScreen from './src/screens/PianificaScreen';
import VicinoScreen from './src/screens/VicinoScreen';
import ProfiloScreen from './src/screens/ProfiloScreen';
import { colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopWidth: 0,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              height: 88,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.text.tertiary,
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Ispirazioni':
                  iconName = focused ? 'sparkles' : 'sparkles-outline';
                  break;
                case 'Pianifica':
                  iconName = focused ? 'calendar' : 'calendar-outline';
                  break;
                case 'Vicino':
                  iconName = focused ? 'location' : 'location-outline';
                  break;
                case 'Profilo':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  iconName = 'help';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ tabBarLabel: 'Home' }}
          />
          <Tab.Screen 
            name="Ispirazioni" 
            component={IspirazioniScreen}
            options={{ tabBarLabel: 'Ispirazioni' }}
          />
          <Tab.Screen 
            name="Pianifica" 
            component={PianificaScreen}
            options={{ tabBarLabel: 'Pianifica' }}
          />
          <Tab.Screen 
            name="Vicino" 
            component={VicinoScreen}
            options={{ tabBarLabel: 'Vicino a me' }}
          />
          <Tab.Screen 
            name="Profilo" 
            component={ProfiloScreen}
            options={{ tabBarLabel: 'Profilo' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
