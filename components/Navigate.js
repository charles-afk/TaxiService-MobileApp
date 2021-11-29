import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/mapSlice'

const data = [
    {
        id:"1",
        title:"Get a ride",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRcU3VEpZTCN_3XulYNEOo-rUI2LYBzjJKg&usqp=CAU",
        screen:"MapScreen"
    },
    // {
    //     id:"2",
    //     title:"Get a ride",
    //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRcU3VEpZTCN_3XulYNEOo-rUI2LYBzjJKg&usqp=CAU",
    //     screen:"MapScreen"
    // },
]
const Navigate = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)
    return (
        <FlatList data={data} horizontal keyExtractor={(item)=>item.id}
            renderItem={({item})=>(    
                <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`} 
                    onPress={()=>{navigation.navigate(item.screen)}} 
                    disabled={!origin}
                >
                    <View style={tw`${!origin && 'opacity-20'}`}>
                        <Image style={{width:120, height:120, resizeMode:'contain'}}
                            source={{uri:item.image}} />
                    </View>

                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>

                    <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                        name="arrowright"
                        color="white"
                        type="antdesign"
                    />

                </TouchableOpacity>
            )}
        />
    )
}

export default Navigate

const styles = StyleSheet.create({})
