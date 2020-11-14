import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import customSideBarMenu from './customSideBarMenu';
import homeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyDonations: {
        screen: homeScreen
    },
    Setting: {
        screen: SettingScreen
    }
},
{
    contentComponent: customSideBarMenu
},
{
    initialRouteName: 'Home'
})