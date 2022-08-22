import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, RefreshControl, TouchableOpacity, FlatList } from 'react-native';

export default class CategoriesScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize:50}}>Categories Screen</Text>
            </View>
        )
    }
}
