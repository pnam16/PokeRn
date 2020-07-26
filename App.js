import Details from './src/Details';
import Pokemons from './src/Pokemons';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Pokemons,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(appNavigator);

export default function App() {
  return <AppContainer />;
}
