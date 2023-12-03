import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Image, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment-timezone';
import Main from './Main';
import png from "../assets/pngs/01d.png"


const imgs = [
    {
        id: 1,
        imgName: '01d',
        img: require( '../assets/pngs/01d.png' ),
    },
    {
        id: 2,
        imgName: '01n',
        img: require( '../assets/pngs/01n.png' ),
    },
    {
        id: 3,
        imgName: '02d',
        img: require( '../assets/pngs/02d.png' ),
    },
    {
        id: 4,
        imgName: '02n',
        img: require( '../assets/pngs/02n.png' ),
    },
    {
        id: 5,
        imgName: '03d',
        img: require( '../assets/pngs/03d.png' ),
    },
    {
        id: 6,
        imgName: '03n',
        img: require( '../assets/pngs/03n.png' ),
    },
    {
        id: 7,
        imgName: '04d',
        img: require( '../assets/pngs/04d.png' ),
    },
    {
        id: 8,
        imgName: '04n',
        img: require( '../assets/pngs/04n.png' ),
    },

    {
        id: 10,
        imgName: '09d',
        img: require( '../assets/pngs/09d.png' ),
    },
    {
        id: 11,
        imgName: '09n',
        img: require( '../assets/pngs/09n.png' ),
    },
    {
        id: 12,
        imgName: '10d',
        img: require( '../assets/pngs/10d.png' ),
    },
    {
        id: 13,
        imgName: '10n',
        img: require( '../assets/pngs/10n.png' ),
    },
    {
        id: 14,
        imgName: '11d',
        img: require( '../assets/pngs/11d.png' ),
    },
    {
        id: 15,
        imgName: '11n',
        img: require( '../assets/pngs/11n.png' ),
    },
    {
        id: 16,
        imgName: '13d',
        img: require( '../assets/pngs/13d.png' ),
    },
    {
        id: 17,
        imgName: '13n',
        img: require( '../assets/pngs/13n.png' ),
    },
    {
        id: 18,
        imgName: '50d',
        img: require( '../assets/pngs/50d.png' ),
    },
    {
        id: 18,
        imgName: '50n',
        img: require( '../assets/pngs/50n.png' ),
    },
]


const Home = () =>
{
    const [ city, setCity ] = useState( '' )
    const [ weather, setWeather ] = useState( {} )
    const [ myweather, setmyWeather ] = useState( {} )

    const getWeather = async () =>
    {
        if ( !city.trim() ) { return }
        try
        {
            const res = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${ city }&units=metric&appid=f8278ac38003cbe7b750203fc601d34b` )
            setWeather( res.data )
        }
        catch ( error )
        {
            alert( 'Incorrect city name' )
        }
    }
    useEffect( () =>
    {
        axios
            .get( `https://api.openweathermap.org/data/2.5/weather?q=$cairo&units=metric&appid=f8278ac38003cbe7b750203fc601d34b` )
            .then( ( res ) =>
            {
                setmyWeather( res.data )
            }
            )
    }, [] );


    const timeZoneOffsetInSeconds = weather.timezone - 7190;
    const now = moment()
    const adjustedTime = now.clone().add( timeZoneOffsetInSeconds, 'seconds' );
    const formattedAdjustedTime = adjustedTime.format( 'YYYY-MM-DD HH:mm' );
    const [ element, setelement ] = useState( {} )
    const img = weather.weather

    return (
        <ScrollView Style={ { flex: 1, } } contentContainerStyle={ { backgroundColor: 'rgb(32,32,32)', flex: 1 } }>
            <View style={ styles.searchContainer }>
                <View style={ styles.search }>
                    <TextInput
                        style={ styles.TextInput }
                        value={ city }
                        placeholder='Search City'
                        placeholderTextColor={ 'gray' }
                        onChangeText={ ( text ) => setCity( text ) }
                    />
                    <Ionicons name="search-sharp" size={ 18 } color="white"
                        onPress={ getWeather }
                        style={ styles.Icon } />
                </View>
            </View>
            { Object.keys( weather ).length > 0 ?
                <View style={ styles.mainContainer }>
                    <View style={ styles.locationContainer }>

                        <View style={ styles.loc }>
                            <Entypo name="location-pin" size={ 30 } color="rgb(255,0,255)" />
                            <Text style={ styles.location }>
                                { weather.name }, { weather.sys.country }
                            </Text>
                        </View>
                        <View style={ styles.timeComtainer }>
                            <MaterialIcons name="date-range" size={ 24 } color="rgb(255,0,255)" />
                            <Text style={ { color: 'white' } }>{ formattedAdjustedTime }</Text>
                        </View>
                    </View>

                    <View style={ styles.tempContainer }>

                        <View style={ styles.tempGrid }>
                            <View style={ [ styles.tempView, { flex: 1 } ] }>

                                <Image source={ ( imgs.find( e => e.imgName = img[ 0 ].icon ) ).img } style={ { height: 100, aspectRatio: 1 } } />
                            </View>
                            <View style={ [ styles.tempView, { flex: 1, gap: 5 } ] }>
                                <Text style={ [ { width: '90%', color: 'white', fontSize: 15, textTransform: 'capitalize', textAlign: 'center' } ] }>{ weather.weather[ 0 ].description }</Text>
                                <View style={ { width: '100%', alignItems: 'center', flexDirection: 'row' } }>
                                    <Text style={ styles.temp }>{ weather.main.temp }°</Text>
                                    <FontAwesome name="thermometer-4" size={ 24 } color="rgb(255,0,255)" />

                                </View>

                            </View>
                        </View>


                    </View>

                    <View style={ styles.weatherContainer }>
                        <View style={ [ styles.tempGrid, { marginTop: 0, flexDirection: 'column' } ] }>
                            <View style={ { flex: 3, flexDirection: 'row', gap: 3 } }>
                                <View style={ styles.weather }>
                                    <FontAwesome5 name="thermometer-empty" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.main.temp_min }°</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>min. Temp</Text>
                                </View>
                                <View style={ styles.weather }>
                                    <FontAwesome5 name="thermometer-full" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.main.temp_max }°</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>max. Temp</Text>
                                </View>
                                <View style={ styles.weather }>
                                    <MaterialCommunityIcons name="gauge" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.main.pressure } mb</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>Pressure</Text>
                                </View>
                            </View>
                            <View style={ { flex: 3, flexDirection: 'row', gap: 3 } }>
                                <View style={ styles.weather }>
                                    <Ionicons name="water-outline" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.main.humidity } %</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>Humidity</Text>
                                </View>
                                <View style={ styles.weather }>
                                    <FontAwesome5 name="wind" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.wind.speed } km/h</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>Wind</Text>
                                </View>
                                <View style={ styles.weather }>
                                    <AntDesign name="eyeo" size={ 24 } color="rgb(255,0,255)" />
                                    <Text style={ styles.wearherText }>{ weather.visibility } m</Text>
                                    <Text style={ [ styles.wearherText, { fontSize: 10, color: 'lightgray' } ] }>Visibility</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> : <Main /> }
        </ScrollView>
    )
}

export default Home
const styles = StyleSheet.create( {
    searchContainer: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    mainContainer: {
        height: '85%',
    },
    locationContainer: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    timeComtainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    tempContainer: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },

    search: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignSelf: 'center',
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
    },
    Icon: {
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'rgb(255,0,255)', height: '100%', width: 50,
        textAlign: 'center',
        lineHeight: 50,
        alignSelf: 'center',
    },
    TextInput: {
        height: 50,
        width: '80%',
        fontWeight: '600',
        padding: 15,
        color: 'white',
    },
    loc: {
        flex: 1,
        gap: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    location: {
        fontSize: 30,
        fontWeight: '600',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        textTransform: 'capitalize',

    },
    tempGrid: {
        paddingVertical: 20,
        width: '90%',
        margin: 20,
        flex: 2,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
    },
    tempView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    temp: {
        fontSize: 30,
        fontWeight: '600',
        color: 'white',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 5,
        textAlign: 'center',
        width: '70%',
    },
    weather: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    wearherText: {
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        fontSize: 15,
    }

} )