import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert,ScrollView  } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLORS, FONTS, SIZES } from '../Constants/theme'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import AppTextInput from '../Components/AppTextInput'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import validator from 'validator'
import { isValidNumber, parsePhoneNumber } from 'libphonenumber-js';
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'

const SignUpScreen = ({navigation}) => {

    const {signUpUser} = useContext(GlobalContext);
    
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmedPasswordShown, setIsConfirmedPasswordShown] = useState(false);

    const [firstNameFocused, setfirstNameFocused] = useState(false);
    const [lastNameFocused, setlastNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [ConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);
    const [addressFocused, setAddressFocused] = useState(false);

    const [FirstNameValue, setFirstNameValue] = useState('');
    const [LastNameValue, setLastNameValue] = useState('');
    const [EmailValue,setEmailValue] = useState('');
    const [PasswordValue,setPasswordValue] = useState('');
    const [ConfirmedPasswordValue,setConfirmedPasswordValue] = useState('');
    const [PhoneValue,setPhoneValue] = useState('');
    const [AddressValue, setAddressValue] = useState('');



    const isValidTunisianPhoneNumber = (phoneNumber) => {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'TN');
        return isValidNumber(parsedPhoneNumber);
      };

    const validateInputs  = () => {
        let result = true;
        const isValidStartDigit = /^(2|3|4|5|7|8|9)/.test(PhoneValue);

        if (!FirstNameValue || FirstNameValue.length < 3) { 
          Alert.alert('Invalid First Name', 'First Name must be at least 3 characters');
          result = false;
        }else if (!LastNameValue || FirstNameValue.length < 3) {
            Alert.alert('Invalid Last Name', 'Last Name must be at least 3 characters');
            result = false;
        }else if (!EmailValue || !validator.isEmail(EmailValue)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            result = false;
        }else if (!PasswordValue || PasswordValue.length < 6) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters');
            result = false;
        }else if (!ConfirmedPasswordValue || ConfirmedPasswordValue.length < 6) {
            Alert.alert('Invalid Password', 'ConfirmedPassword must be at least 6 characters');
            result = false;
        }else if (!PhoneValue || !isValidStartDigit || PhoneValue.length !== 8) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid Tunisian phone number');
            return false;
        }else if (!AddressValue || AddressValue.length > 50 || AddressValue.length < 20) {
            Alert.alert('Invalid Address ', 'Address should be between 20 and 50 characters');
            return false;
        }
        else if (PasswordValue !== ConfirmedPasswordValue) {
            Alert.alert('Invalid Password', 'Password does not match');
            result = false;
        }
        
        return result;
      }

      const handleSignup = async () => {
        if (validateInputs()) {
          let user = {
            FirstName : FirstNameValue,
            LastName : LastNameValue,
            Email : EmailValue,
            Password : PasswordValue,
            PhoneNumber : PhoneValue,
            FullAddress : AddressValue
          };
          const result = await signUpUser(user);
          if(!result.success)
            Alert.alert(" ",result.message);
          else
          navigation.navigate("Login",{ successMessage: result.message });
        }
      };

  return (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding : 20,marginTop : 40}}>
        <View style={{alignItems : 'center'}}>
          <Text style={{fontSize : SIZES.xLarge,color : COLORS.bgDark,
          fontFamily : FONTS.PoppinsBold,marginVertical : 30}}>Create Account</Text>
          <Text style={{fontFamily : FONTS.PoppinsSemiBold,fontSize : SIZES.small2,
          maxWidth : "80%",textAlign : 'center'}}>Create an account so you can explore all the existing Coffee</Text>
        </View>
        <View style={{
          marginVertical : 30,

        }}>

        <TextInput onFocus={() => setfirstNameFocused(true)}
        onBlur={() => setfirstNameFocused(false)} value={FirstNameValue} onChangeText={(text) => setFirstNameValue(text)}
        placeholder={"First Name"} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
        },
        firstNameFocused && style.focusedStyle
        ]}/>

        <TextInput onFocus={() => setlastNameFocused(true)}
        onBlur={() => setlastNameFocused(false)} value={LastNameValue} onChangeText={(text) => setLastNameValue(text)}
        placeholder={"Last Name"} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
        },
        lastNameFocused && style.focusedStyle
        ]}/>
            
        <TextInput onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)} value={EmailValue} onChangeText={(text) => setEmailValue(text)}
        placeholder={"Email"} keyboardType={"email-address"} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
        },
        emailFocused && style.focusedStyle
        ]}/>


        <View style={{flexDirection : 'row',width : "100%",alignItems : 'center'}}>
        <TextInput onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)} value={PasswordValue} onChangeText={(text) => setPasswordValue(text)}
        placeholder={"Password"} secureTextEntry={isPasswordShown} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
          width : "100%"
        },
        passwordFocused && style.focusedStyle
        ]}/>
        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{position : 'absolute',right : 12}}>
            {
                isPasswordShown ? (
                    <Ionicons name='eye-off' size={30} color={COLORS.black} />
                ) : (
                    <Ionicons name='eye' size={30} color={COLORS.black} />
                )
            }
        </TouchableOpacity>

        </View>

        <View style={{flexDirection : 'row',width : "100%",alignItems : 'center'}}>
        <TextInput onFocus={() => setConfirmPasswordFocused(true)}
        onBlur={() => setConfirmPasswordFocused(false)} value={ConfirmedPasswordValue} onChangeText={(text) => setConfirmedPasswordValue(text)}
        placeholder={"Confirm Password"} secureTextEntry={isConfirmedPasswordShown} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
          width : "100%"
        },
        ConfirmPasswordFocused && style.focusedStyle
        ]}/>
        <TouchableOpacity onPress={() => setIsConfirmedPasswordShown(!isConfirmedPasswordShown)} style={{position : 'absolute',right : 12}}>
            {
                isConfirmedPasswordShown ? (
                    <Ionicons name='eye-off' size={30} color={COLORS.black} />
                ) : (
                    <Ionicons name='eye' size={30} color={COLORS.black} />
                )
            }
        </TouchableOpacity>

        </View>

        <View style={[{ width: "100%",
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 10,
                overflow: 'hidden',}, phoneFocused && style.focusedStyle]}>
        <TextInput placeholder='+216' editable={false} placeholderTextColor={COLORS.darkText}
        style={{width : "12%",backgroundColor : COLORS.bgLightOpacity,textAlign : 'center',paddingLeft : 10,fontFamily : FONTS.PoppinsSemiBold}}
        />
        <TextInput onFocus={() => setPhoneFocused(true)} value={PhoneValue} onChangeText={(text) => setPhoneValue(text)}
        onBlur={() => setPhoneFocused(false)} keyboardType='numeric' maxLength={8}
        placeholder={"Mobile Number"} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          width : "90%",
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          paddingLeft : 20,
        },
        ]}/>
        </View>
        <TextInput onFocus={() => setAddressFocused(true)}
        onBlur={() => setAddressFocused(false)} value={AddressValue} onChangeText={(text) => setAddressValue(text)}
        placeholder={"Full Address"} placeholderTextColor={COLORS.darkText} style={
        [{fontFamily : FONTS.PoppinsRegular,
          fontSize : SIZES.small2,
          padding : 20,
          backgroundColor : COLORS.bgLightOpacity,
          borderRadius : 10,
          paddingLeft : 20,
          marginVertical : 10,
        },
        addressFocused && style.focusedStyle
        ]}/>

        

        </View>

        <TouchableOpacity onPress={handleSignup} style={{
          padding : 20,
          backgroundColor : COLORS.bgDark,
          marginVertical : 30,
          borderRadius : 10,
          shadowColor : COLORS.primary,
          shadowOffset : {
            width : 0,
            height : 10
          },
          shadowOpacity : 0.3,
          shadowRadius : 10,
          elevation : 5

        }}>
          <Text style={{
            fontFamily : FONTS.PoppinsBold,
            color : COLORS.onPrimary,
            textAlign : 'center',
            fontSize : SIZES.large,

          }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>navigation.navigate("Login")} style={{
          padding : 10

        }}>
          <Text style={{
            fontFamily : FONTS.PoppinsSemiBold,
            color : COLORS.text,
            textAlign : 'center',
            fontSize : SIZES.small2,

          }}>Already have an account</Text>
        </TouchableOpacity>
      </View>
      </ScrollView> 
    </SafeAreaView>
  )
}

export default SignUpScreen;

const style = StyleSheet.create({
    focusedStyle : {
        borderWidth:3,
        borderColor: COLORS.borderLight,
      }
})