import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment-timezone';


const Main = () =>
{
    const [ temperature, setTemperature ] = useState( null );
    const [ info, setInfo ] = useState( null );

    useEffect( () =>
    {
        const apiKey = 'f8278ac38003cbe7b750203fc601d34b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${ apiKey }&units=metric`;

        axios.get( url )
            .then( response =>
            {
                setTemperature( response.data.main.temp );

            } )
            .catch( error =>
            {
                console.error( 'Error fetching data: ', error );
            } );
    }, [] );
    return (
        <View style={ styles.container }>
            <FontAwesome name="arrow-up" size={ 50 } color="rgb(255,0,255)" />
            <Text style={ styles.mainText }>Enter location and get full informations obout its weather</Text>

        </View>
    )
}

export default Main
const styles = StyleSheet.create( {

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30

    },
    mainText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        textTransform: 'capitalize',
        textAlign: 'center',
        margin: 20,
        marginBottom: 60

    }
} )