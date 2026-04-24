/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/presentation/screens/splash/SplashScreen';
import HomeScreen from './src/presentation/screens/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigationRef,
  type RootStackParamList,
} from './src/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  useEffect(() => {
    // Force light mode once on app mount
    Appearance.setColorScheme('light');
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
