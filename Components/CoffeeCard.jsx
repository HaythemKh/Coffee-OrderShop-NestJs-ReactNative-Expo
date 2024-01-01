import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLORS } from '../Constants/theme'
import {MapPinIcon,StarIcon, PlusIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const CoffeeCard = ({item}) => {
    const navigation = useNavigation();

  return (
    <View style={{
        backgroundColor : COLORS.bgDark,
        height : 350,
        width : 250,
        borderRadius : 40
    }}>
        <View style={[{
            shadowColor : 'black',
            shadowRadius : 30,
            shadowOffset : {width : 0, height : 40},
            shadowOpacity : 0.8
        }, tw`flex-row justify-center -mt-14`]}>
            <Image source={{uri : `${item.Image}` }} style={tw`h-40 w-40`} />
        </View>

        <View style={tw`px-5 mt-5`}>
            <Text style={tw`text-3xl text-white font-semibold z-10`}>
                {item.Name}
            </Text>
            <View style={[{backgroundColor : 'rgba(255,255,255,0.2)', marginTop : 10, gap : 5}, tw`flex-row items-center rounded-3xl p-1 px-2 w-16`]}>
                <StarIcon size={15} color="white"  />
                <Text style={tw`text-base font-semibold text-white`}>{item.Stars}</Text>
            </View>

            <View style={[tw`flex-row z-10 mb-6`,{marginTop : 10, gap : 5}]}>
                <Text style={tw`text-base text-white font-semibold opacity-60`}>Volume</Text>
                <Text style={tw`text-base text-white font-semibold`}>{item.MediumSizeVolume}</Text>
            </View>

            <View style={[tw`flex-row justify-between items-center rounded-4`, {marginTop : 10,backgroundColor : COLORS.bgDark, shadowColor : COLORS.bgDark,shadowRadius : 25,
                shadowOffset : {width : 0 , height : 40}, shadowOpacity : 0.8}]}>
                <Text style={tw`text-white font-bold text-lg`}>{item.MediumSizePrice} DT </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Product' , {...item})} style={[tw`p-4 bg-white rounded-full`,{shadowColor : COLORS.bgDark,shadowRadius : 25,
                shadowOffset : {width : -20 , height : -10}, shadowOpacity : 1}]}>
                    <PlusIcon size={25} strokeWidth={2} color={COLORS.bgDark} />
                </TouchableOpacity>
            </View>

        </View>

    </View>
  )
}

export default CoffeeCard