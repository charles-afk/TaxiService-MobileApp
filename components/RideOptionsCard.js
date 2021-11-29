import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/mapSlice'
import 'intl';
import 'intl/locale-data/jsonp/en-US'

const data = [
    {
        id:1,
        title:"Regular Taxi",
        multiplier:1,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRcU3VEpZTCN_3XulYNEOo-rUI2LYBzjJKg&usqp=CAU"
    },
    {
        id:2,
        title:"XL Taxi",
        multiplier:1.2,
        image:"data:image/jpeg;base64,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"
    },
    {
        id:3,
        title:"Luxury Taxi",
        multiplier:1.75,
        image:"https://links.papareact.com/7pf"
    }
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [ selected, setSelected ] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('NavigateCard')} 
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" color="black"/>

                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList data={data} keyExtractor={item => item.id}
                renderItem={({item: {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity 
                        onPress={()=> setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 
                            ${id === selected?.id && 'bg-gray-200'}`}>
                        <Image
                            style={{
                                width:100,
                                height:100,
                                resizeMode:"contain"
                            }}
                            source={{uri:image}}
                        />
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-US', {
                                style:'currency',
                                currency: 'USD',
                            }).format( 
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) /100
                            )} 
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Request {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
