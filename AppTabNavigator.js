import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions:{
            toBarLabel: "Home",
        }
    },
    ExchangeScreen:{
        screen:ExchangeScreen,
        navigationOptions:{
            toBarLabel:"Excahnge Items",
        }
    }
});