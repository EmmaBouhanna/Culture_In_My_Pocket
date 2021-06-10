// Navigation/Navigation.js
import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Button, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Livre from '../Components/Livre';
import LoginView from '../Components/LoginView.js';
import SignInView from '../Components/SignInView.js';
import WelcomeView from '../Components/WelcomeView.js';
import Search from '../Components/Search';
import AuthorView from '../Components/AuthorView';
import ListesViews from '../Components/ListesView';
import MaListeView from '../Components/MaListeView';
import ThemeView from '../Components/ThemeView';
import Icon from 'react-native-vector-icons/Ionicons';
import AccueilView from '../Components/AccueilView';
import ProfileView from '../Components/ProfileView';
import ThemeDescriptionView from '../Components/ThemeDescriptionView'



const SearchStackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MyStack() {
  return (
    <SearchStackNavigator.Navigator headerMode={'none'}>
      <SearchStackNavigator.Screen name='Accueil' component={Welcome} />
      <SearchStackNavigator.Screen name='Login' component={Login} />
      <SearchStackNavigator.Screen name='Inscription' component={SignIn} />
      <SearchStackNavigator.Screen options={{ headerShown: false }} name='TabNavigation' component={MyTabs} />
      <SearchStackNavigator.Screen name='Theme' component={SelectThemes} />
      <SearchStackNavigator.Screen name='Livre' component={Book} />
    </SearchStackNavigator.Navigator>
  );
}

function MySearchStack() {
  return (
    <SearchStackNavigator.Navigator headerMode={'none ²'}>
      <SearchStackNavigator.Screen name='Search' component={SearchBar} options={{ headerShown: false }}/>
      <SearchStackNavigator.Screen name='Livre' component={Book}options={{ headerShown: false }} />
      <SearchStackNavigator.Screen name='Author' component={Author} options={{ headerShown: false }}/>
    </SearchStackNavigator.Navigator>
  );
}

function MyListStack() {
  return (
    <SearchStackNavigator.Navigator headerMode={'none ²'}>
      <SearchStackNavigator.Screen name='Mes listes' component={MesListes} />
      <SearchStackNavigator.Screen name='Liste' component={MaListe} />
      <SearchStackNavigator.Screen name='Livre' component={Book} />
      <SearchStackNavigator.Screen name='Author' component={Author} />
    </SearchStackNavigator.Navigator>
  );
}

function MyProfileStack({ navigation, params }) {
  return (
    <SearchStackNavigator.Navigator headerMode={'none ²'}>
      <SearchStackNavigator.Screen name='Profile' component={Profil} />
      <SearchStackNavigator.Screen name='Description du thème' component={ThemeDesc} />
    </SearchStackNavigator.Navigator>
  )
}

function AccueilStack({ navigation, params }) {
  return (
    <SearchStackNavigator.Navigator headerMode={'none ²'}>
      <SearchStackNavigator.Screen name='Accueil' component={Accueil} />
      <SearchStackNavigator.Screen name='Livre' component={Book} />
      <SearchStackNavigator.Screen name='Author' component={Author} />
    </SearchStackNavigator.Navigator>
  )
}



function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator tabBarOptions={{ keyboardHidesTabBar: true, style: { position: 'absolute' }, activeTintColor: '#00BCD4' }}>
      <Tab.Screen name="Accueil"
        component={AccueilStack}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Recherche"
        component={MySearchStack}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Mes Listes"
        component={MyListStack}
        options={{
          tabBarLabel: 'Mes Listes',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Mon Profil"
        component={MyProfileStack}
        options={{
          tabBarLabel: 'Mon Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function MesListes({ navigation }) {
  return (
    <ListesViews />
  )
}

function MaListe({ navigation, route }) {
  return (
    <MaListeView titre={route.params.titre} />
  )
}

function Author({ navigation, route }) {
  return (
    <AuthorView pseudo={route.params.pseudo} prenom={route.params.prenom} nom={route.params.nom} naissance={route.params.naissance} mort={route.params.mort} />
  )
}

function SearchBar({ navigation }) {
  return (
    <Search />
  )
}

function Book({ navigation, route }) {
  return (
    <Livre lid={route.params.lid} titre={route.params.titre} date={route.params.date} auteur={route.params.auteur} categorie={route.params.categorie} description={route.params.description} photo={route.params.photo} />

  )
}

function Login({ navigation }) {
  return (
    <LoginView />
  )
}

function SignIn({ navigation }) {
  return (
    <SignInView />
  )
}

function SelectThemes({ navigation }) {
  return (
    <ThemeView />
  )
}
function Welcome({ navigation }) {
  return (
    <WelcomeView />
  )
}

function Accueil() {
  return (
    <AccueilView />
  )
}

function Profil({ navigation, route }) {
  return (
    <ProfileView />
  )
}

function ThemeDesc({ navigation, route }) {
  return (<ThemeDescriptionView theme={route.params.theme} />)

}
//const AppContainer = createAppContainer(SearchStackNavigator)

//export default AppContainer
