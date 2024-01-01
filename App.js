import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import HomeScreen from './screens/HomeScreen';
import AppNavigation from './navigation/AppNavigation';
import GlobalWrapper, { GlobalContext } from './context/GlobalWrapper';

export default function App() {

  const [fontLoaded] = useFonts({
    InterBold:require('./assets/fonts/Inter-Bold.ttf'),
    InterLight:require('./assets/fonts/Inter-Light.ttf'),
    InterMedium:require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular:require('./assets/fonts/Inter-Regular.ttf'),
    InterSemiBold:require('./assets/fonts/Inter-SemiBold.ttf'),
    PoppinsBold:require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular:require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold:require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if(!fontLoaded) return null;

  return (
    <GlobalWrapper>
   
      <AppNavigation/>
     
    </GlobalWrapper>
  );
}

