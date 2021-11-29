import React from 'react'
import { StyleSheet, View, TouchableOpacity} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY} from "@env"
import { setDestination } from '../slices/mapSlice';
import { useDispatch } from 'react-redux';
const MapScreen = () => {
    const dispatch = useDispatch()
    const Stack = createStackNavigator()
    const navigation = useNavigation()
    return (
        <View>
            
            <TouchableOpacity style={tw`bg-gray-100 absolute top-20 left-8 z-50 p-3 rounded-full shadow-lg`}
                onPress={()=>navigation.navigate('HomeScreen')}
            >
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <GooglePlacesAutocomplete
                    placeholder="Where to?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    styles={whereTo}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    query={{ key:GOOGLE_MAPS_APIKEY, language:'en' }}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        navigation.navigate('RideOptionsCard')
                    }}
                />
                <Map/>
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator> 
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{headerShown:false}}
                    />   
                </Stack.Navigator> 
            </View> 
        </View>
    )
}

export default MapScreen

const whereTo = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop: 20,
        flex:0
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        fontSize:18
    },
    textInputContainer: {
        paddingHorizontal:20,
        paddingBottom:0
    }
})
