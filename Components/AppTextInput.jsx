import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES } from '../Constants/theme'


const AppTextInput = ({placeHolder,inputType}) => {

    const [focused, setFocused] = useState(false);
    const [secured, setSecured] = useState(false);


  return (
    <TextInput 
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
    
        placeholder={placeHolder} keyboardType={"phone-pad"} secureTextEntry={false} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
        },
        focused && {borderWidth:3,
            borderColor: COLORS.borderLight,
    }
        ]
    }/>
  )
}

export default AppTextInput