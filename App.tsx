/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/splash/SplashScreen';
import HomeScreen from './src/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigationRef,
  type RootStackParamList,
} from './src/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
 
// Force light mode
Appearance.setColorScheme('light');
  return (
    <PaperProvider>
      <AppContent />
    </PaperProvider>
  );
}



export default App;


function AppContent() {
  return (
    <SafeAreaProvider>

    
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
