import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, selectOrigin, setHome, setWork, selectHome, selectWork } from '../slices/mapSlice';
import Navigate from '../components/Navigate'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const origin = useSelector(selectOrigin)
    const home = useSelector(selectHome)
    const work = useSelector(selectWork)
    const navigation = useNavigation()
    return (
        <SafeAreaView stlye={tw`bg-white h-full`}>
            <View style={tw`p-5 py-10`}>

                <Text style={tw`text-3xl`}>Charles's Taxi Service</Text>

                <GooglePlacesAutocomplete
                    placeholder="Where from?"
                    styles={styles}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    query={{ key:GOOGLE_MAPS_APIKEY, language:'en' }}

                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}
                />

                <TouchableOpacity style={tw`flex-row items-center p-1`}
                    onPress={ () => {
                        if(origin === null) return 
                        else {
                            dispatch(setHome({
                                location: origin.location,
                                description: origin.description
                            }))
                        }
                    }}>
                    <Icon
                            style={tw`mr-4 rounded-full bg-black p-3`}
                            name="add-outline"
                            type="ionicon"
                            color="white"
                            size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>Set as Home Location</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex-row items-center p-1`}
                    onPress={ () => {
                        dispatch(setWork({
                            location: origin.location,
                            description: origin.description
                        }))
                    }}>
                    <Icon
                            style={tw`mr-4 rounded-full bg-black p-3`}
                            name="add-outline"
                            type="ionicon"
                            color="white"
                            size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>Set as Work Location</Text>
                    </View>
                </TouchableOpacity>


                <Navigate/>


                <TouchableOpacity style={tw`flex-row items-center p-1 `}
                    onPress={()=>{
                        if(home.location === null || home.description === null) return
                        else {
                            dispatch(setOrigin({
                                location: home.location,
                                description: home.description
                            }))
                            navigation.navigate("MapScreen")
                        }
                    }}>
                    <Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name="home"
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>Home</Text>
                        <Text style={tw`text-gray-500`}>{home.description}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex-row items-center p-1 `}
                    onPress={()=>{
                        if(work.location === null || work.description === null) return
                        else {
                            dispatch(setOrigin({
                                location: work.location,
                                description: work.description
                            }))
                            navigation.navigate("MapScreen")
                        }
                    }}>
                    <Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name="briefcase"
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>Work</Text>
                        <Text style={tw`text-gray-500`}>{work.description}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:0
    },
    textInput:{
        fontSize:18
    }
})
