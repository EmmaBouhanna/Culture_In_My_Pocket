import  React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export function ThemeItem(theme, update, selected, setselected){
    const navigation = useNavigation(); 

    // const is_selected = props.selected
    return(
        <TouchableOpacity title= 'ClickToSelect' onPress = {(evt)=>{update(selected, setselected, theme)}}>
        <View style={styles.content_container}>
            <Text>{theme[1]}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    normal: {
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 1,
      padding: 1,
      margin: 5
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column' 
    },
    selected:{
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        padding: 1,
        margin: 5,
        backgroundColor: 'pink'
    
    }
})
export default ThemeItem;