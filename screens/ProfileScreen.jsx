import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS, FONTS, SIZES } from '../Constants/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {ArrowLeftCircleIcon,MinusIcon,PlusIcon,ShoppingBagIcon} from 'react-native-heroicons/outline'
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'


export const { height, width} = Dimensions.get('window');


const ProfileScreen = ({navigation,route}) => {

  const {isLoggedIn,Logout} = useContext(GlobalContext);
  const { ProfileData } = route.params;

  const logout = async()=> {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout ?",
      [
        {
          text : "Cancel" , onPress: () => console.log("cancel pressed"),
        },
        { 
          text : "Logout" , onPress: async () =>
          {
            await Logout();
            const isLogged = await isLoggedIn();
            if(!isLogged)
            {
              navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
            navigation.navigate("Home");
            }
          }
        },
      ]
    )
    
  }
  const [profileData, setProfileData] = useState(null);
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <View style={style.container}>
        <StatusBar/>
        <View style={{width : "100%"}}>
          <Image source={require("../assets/images/ProfileBackground.jpg")}
          style={style.cover}
          />
           <TouchableOpacity onPress={() => navigation.goBack()} style={{position : 'absolute',marginVertical : 40,marginHorizontal : 10}}>
                <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
            </TouchableOpacity>
        </View>
        <View style={style.profileContainer}>
           <Image source={require("../assets/images/avatar.png")} style={style.profile} />
           <Text style={style.name}>{`${ProfileData.LastName} ${ProfileData.FirstName}`}</Text>
           <TouchableOpacity>
           <View style={style.loginBtn}>
              <Text style={style.menuText}>{ProfileData.Email}</Text>
           </View>
           </TouchableOpacity>
           <View style={style.menuWrapper}>
              <TouchableOpacity>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons name='account-box' color={COLORS.black} size={24} />
                  <Text style={style.menuText}>{ProfileData.FirstName}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons name='account-box' color={COLORS.black} size={24} />
                  <Text style={style.menuText}>{ProfileData.LastName}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons name='phone' color={COLORS.black} size={24} />
                  <Text style={style.menuText}>+216    {ProfileData.PhoneNumber}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={style.menuItem(0.2)}>
                <Entypo name="address" size={24} color={COLORS.black} />
                  <Text style={style.menuText}>{ProfileData.FullAddress}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={logout}>
                <View style={[style.menuItem(0.2),{ marginTop : 10,justifyContent : 'center', textAlign : 'center'}]}>
                <AntDesign name="logout" size={24} color={COLORS.black} />
                  <Text style={[style.menuText, {  fontFamily : FONTS.PoppinsBold}]}>Logout</Text>
                </View>
              </TouchableOpacity>
        </View>
        </View>
        

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen;

const style = StyleSheet.create({
container : {
  flex : 1,
  backgroundColor : "#FFFFF7"
  
},

cover : {
  width : "100%",
  height : 290,
  resizeMode : 'cover',
  

},
profileContainer : {
  flex : 1,
  alignItems : 'center'
},
profile : {
  width : 155,
  height : 155,
  borderRadius : 99,
  borderColor : COLORS.White,
  borderWidth : 2,
  resizeMode : 'cover',
  marginTop : -90
},
name : {
  fontFamily : FONTS.PoppinsBold,
  color : COLORS.cardBg,
  marginVertical : 5,
},
loginBtn : {
  backgroundColor : COLORS.bgLightOpacity,
  padding : 2,
  borderWidth : 0.4,
  borderColor : COLORS.active,
  borderRadius :SIZES.xLarge
},
menuText : {
  fontFamily : FONTS.PoppinsRegular,
  color : COLORS.darkText,
  marginLeft : 20,
  fontWeight : '600',
  fontSize : SIZES.medium,
  lineHeight : 26,

},

menuWrapper : {
  marginTop : SIZES.xLarge,
  backgroundColor : "#FFFFF7",
  borderRadius : 12,
  width : width - 20
},
menuItem :(borderBottomWidth) =>  ({
  borderBottomWidth : borderBottomWidth,
  flexDirection : 'row',
  paddingVertical : 15,
  paddingHorizontal : 30,
  borderColor : COLORS.black,
  marginBottom : 10
})
})