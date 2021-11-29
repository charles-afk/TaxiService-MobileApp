import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { selectHome, setDestination, selectWork } from '../slices/mapSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavigateCard = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const home = useSelector(selectHome)
    const work = useSelector(selectWork)
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>

            <Text style={tw`text-center py-2 text-xl`}>Hello There!</Text>

            <View style={tw`border-t border-gray-200 flex-shrink`}>
                
                <TouchableOpacity style={tw`flex-row items-center p-1 `}
                    onPress={()=>{
                        if(home.location === null || home.description === null) return
                        else {
                            dispatch(setDestination({
                                location: home.location,
                                description: home.description
                            }))
                            navigation.navigate('RideOptionsCard')
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
                            dispatch(setDestination({
                                location: work.location,
                                description: work.description
                            }))
                            navigation.navigate('RideOptionsCard')
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

export default NavigateCard

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
