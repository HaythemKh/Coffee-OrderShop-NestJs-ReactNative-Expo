import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator  } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { COLORS, FONTS, SIZES } from '../Constants/theme'
import { useNavigation } from '@react-navigation/native'
import AppTextInput from '../Components/AppTextInput'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validator from 'validator'
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';



const LoginScreen = ({route}) => {
const navigation = useNavigation();

const {signinUser,isLoggedIn} = useContext(GlobalContext);


const [isPasswordShown, setIsPasswordShown] = useState(false);

const [emailFocused, setEmailFocused] = useState(false);
const [passwordFocused, setPasswordFocused] = useState(false);

const [EmailValue,setEmailValue] = useState('');
const [PasswordValue,setPasswordValue] = useState('');

const [isModalVisible, setIsModalVisible] = useState(false);
const [ErrorModalVisible, setErrorModalVisible] = useState(false);
const [successMessage, setSuccessMessage] = useState('');

const [loading, setLoading] = useState(false);


useEffect(() => {
  const {successMessage} = route.params || {};
  if (successMessage) {
    setSuccessMessage(successMessage);
    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  }
},[route.params])


const validateInputs  = () => {
  let result = true;
  if (!EmailValue || !validator.isEmail(EmailValue)) { 
    Alert.alert('Invalid Email', 'Please enter a valid email address');
    result = false;
  }
  else
  if (!PasswordValue || PasswordValue.length < 6) {
    Alert.alert('Invalid Password', 'Password must be at least 6 characters');
    result = false;
  };
  return result;
}

const handleSignIn = async () => {
  if (validateInputs()) {
    setLoading(true);
    const result = await signinUser(EmailValue,PasswordValue);
    if(result.success)
    {
      const loggedIn =  await isLoggedIn();
      setLoading(false);
      if(loggedIn)
      {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeTab' }],
        });
        navigation.navigate("HomeTab");
      }   
    }else
    {
      setLoading(false);
      setErrorModalVisible(true);

      setTimeout(() => {
        setErrorModalVisible(false);
      }, 1500);
    }
  }
};

const CustomActivityIndicator = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Loading...</Text>
    </View>
  );
};
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalHeader}>Success!</Text>
            <Text style={style.modalText}>{successMessage} try to login Please <FontAwesome5 name="smile-beam" size={24} color="black" /></Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ErrorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalHeader}>Failed!</Text>
            <Text style={style.modalText}>Email or password are incorrect <FontAwesome5 name="sad-tear" size={24} color="black" /></Text>
          </View>
        </View>
      </Modal>

      <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} overlayColor="rgba(0, 0, 0, 0.7)"/>  

      <View style={{padding : 20,marginTop : 40}}>
        <View style={{alignItems : 'center'}}>
          <Text style={{fontSize : SIZES.xLarge,color : COLORS.bgDark,
          fontFamily : FONTS.PoppinsBold,marginVertical : 30}}>Login here</Text>
          <Text style={{fontFamily : FONTS.PoppinsSemiBold,fontSize : SIZES.large,
          maxWidth : "60%",textAlign : 'center'}}>Welcome back you've been missed!</Text>
        </View>
        <View style={{
          marginVertical : 30,

        }}>

        <TextInput onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        placeholder={"Email"} value={EmailValue} onChangeText={(text)=> setEmailValue(text)} placeholderTextColor={COLORS.darkText} style={
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
        onBlur={() => setPasswordFocused(false)} value={PasswordValue} onChangeText={(text)=> setPasswordValue(text)}
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
        </View>

        <View>
          <Text style={{fontFamily : FONTS.PoppinsSemiBold,
                        fontSize : SIZES.small2,
                        color : COLORS.bgLight,
                        alignSelf : "flex-end"
          }}>Forgot your password ?</Text>
        </View>

        <TouchableOpacity onPress={handleSignIn} style={{
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

          }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={loading} onPress={() =>navigation.navigate("SignUp")} style={{
          padding : 10

        }}>
          <Text style={{
            fontFamily : FONTS.PoppinsSemiBold,
            color : COLORS.text,
            textAlign : 'center',
            fontSize : SIZES.small2,

          }}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen;

const style = StyleSheet.create({
focusedStyle : {
  borderWidth:3,
  borderColor: COLORS.borderLight,
},

centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  backgroundColor: COLORS.gray,
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
},
modalHeader: {
  fontSize: 24,
  fontFamily: FONTS.PoppinsBold, // Use your font
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  fontFamily: FONTS.PoppinsRegular, // Use your font
  textAlign: 'center',
},
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
text: {
  marginTop: 10,
  fontSize: 16,
},
});