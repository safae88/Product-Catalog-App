import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FavorisScreen from './screens/FavorisScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="Favoris" component={FavorisScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    paddingTop: 40,
  },
});
