import { View, Text, Image, SafeAreaView, TouchableOpacity, ToastAndroid,Alert} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import {ArrowLeftCircleIcon,MinusIcon,PlusIcon,ShoppingBagIcon} from 'react-native-heroicons/outline'
import {HeartIcon, StarIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { COLORS } from '../Constants/theme'
import { GlobalContext } from '../context/GlobalWrapper'
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';


const ProductScreen = ({route, navigation}) => {

    const item = route.params;

    const {AddItemToCart,fetchCartItems,isLoggedIn,BuyCoffee} = useContext(GlobalContext);

    const [size,setSize] = useState('Medium');
    const [quantity, setQuantity] = useState(1);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ success: false, message: '' });


    const showModal = (success, message) => {
        setModalContent({ success, message });
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      };

    const getPrice = () => {
        let Price = 0;
        if (size === "Small") {
          Price = item.SmallSizePrice;
        } else if (size === "Medium") {
          Price = item.MediumSizePrice;
        } else if (size === "Large") {
          Price = item.LargeSizePrice;
        }
        return Price;
      };
    const getVolume = () => {
        return size==="Small"? item.SmallSizeVolume : size==="Large"? item.LargeSizeVolume : item.MediumSizeVolume;
      }
      const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
      };

      const handleAddToCart = async () => {
        const cartItem = {
          CoffeeId: item._id,
          Name : item.Name,
          Size: size,
          Price: getPrice(),
          Quantity: quantity
        };
        if(await isLoggedIn())
        {
          const result = await AddItemToCart(cartItem);
          if (result.success) {
            showModal(true, result.message);
            fetchCartItems();
  
          } else {
            showModal(false, result.message);
          }
        }else
        {
          Alert.alert(
            "Add Coffee to cart",
            "You need to login",
            [
              {
                text : "Cancel" , onPress: () => console.log("cancel pressed"),
              },
              { 
                text : "Login Now" , onPress: () => navigation.navigate("Login")
              },
            ]
          )
        }
        
      };

      const handleBuy = async () => {

        const CommandItem = {
          Name : item.Name,
          Size: size,
          Price: getPrice(),
          Quantity: quantity
        };

        if(await isLoggedIn())
        {
          Alert.alert(
            "Buy Coffee",
            "Are You sure you want to buy this Coffee",
            [
              {
                text : "No" , onPress: () => console.log("cancel pressed"),
              },
              { 
                text : "Yes" , onPress: async () => {
                  
                  const result = await BuyCoffee(CommandItem);
                    if (result.success) {
                      showModal(true, result.message);
                      fetchCartItems();
                    } else {
                      showModal(false, result.message);
          }
                }
              },
            ]
          )
        }else
        {
          Alert.alert(
            "Buy Coffee",
            "You need to login",
            [
              {
                text : "Cancel" , onPress: () => console.log("cancel pressed"),
              },
              { 
                text : "Login Now" , onPress: () => navigation.navigate("Login")
              },
            ]
          )
        }
      }

      const ModalComponent = ({ isVisible, onClose, Content }) => {
        const animatedHeight = new BounceValue(0).toReactNativeValue();
      
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, height: animatedHeight }}>
                {/* Add your modal content here */}
                <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 30, right: 30 }}>
                  <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      };


  return (
    <View style={tw`flex-1`}>
      <StatusBar style='light'/>
      <Image source={require('../assets/images/beansBackground2.png')}
        style={[{height : 300, borderBottomRightRadius : 50,borderBottomLeftRadius : 50,}, tw`w-full absolute`]}
      />

      <SafeAreaView style={{marginTop : 50}}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`rounded-full border-2 border-white p-2`}>
                <HeartIcon size={24} strokeWidth={1.2} color="white" />
            </TouchableOpacity>
        </View>

        <View style={[tw`flex-row justify-center top-5`, 
        {shadowColor : COLORS.bgDark,
         shadowRadius : 30,
         shadowOffset : {width : 0, height : 30},
         shadowOpacity : 0.9,}
         ]}>
            <Image source={{uri : `${item.Image}` }} style={tw`h-60 w-60`} />
        </View>

        <View style={[{backgroundColor : COLORS.bgLight, marginTop : 40,marginBottom : 15,gap : 5},tw`flex-row mx-4 items-center rounded-3xl p-1 px-2 w-16 opacity-90`]}>
            <StarIcon size={15} color='white'/>
            <Text style={[tw`text-base font-semibold text-white`]}>{item.Stars}</Text>
        </View>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-3xl font-semibold`}>
                 {item.Name}
            </Text>
            <Text style={tw`text-lg font-semibold`}>
                 {getPrice()} DT
            </Text>
        </View>

        <View style={tw`mx-4 top-5`}>
            <Text style={[{color : COLORS.text},tw`text-lg font-bold`]}>
                Coffee size
            </Text>
            <View style={tw`flex-row justify-between`}>
            <TouchableOpacity onPress={()=> setSize('Small')} style={[{backgroundColor : size=='Small'? COLORS.bgLight : 'rgba(0,0,0,0.07)'},tw`top-2 p-3 px-8 rounded-full`]}>
                <Text style={size=='small'? tw`text-white` : tw`text-gray-700`}>Small</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> setSize('Medium')} style={[{backgroundColor : size=='Medium'? COLORS.bgLight : 'rgba(0,0,0,0.07)'},tw`top-2 p-3 px-8 rounded-full`]}>
                <Text style={size=='medium'? tw`text-white` : tw`text-gray-700`}>Medium</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> setSize('Large')} style={[{backgroundColor : size=='Large'? COLORS.bgLight : 'rgba(0,0,0,0.07)'},tw`top-2 p-3 px-8 rounded-full`]}>
                <Text style={size=='large'? tw`text-white` : tw`text-gray-700`}>Large</Text>
            </TouchableOpacity>
            </View>
        </View>

        <View style={[tw `mx-4 h-28`,{marginTop : 40}]}>
            <Text style={[{color : COLORS.text},tw`text-lg font-bold`]}>About</Text>
            <Text style={tw`text-gray-600 top-2`}>{item.Description}</Text>
        </View>

        <View style={[tw`flex-row justify-between items-center mx-4 mb-2`,{marginTop : 20}]}>
            <View style={[tw`flex-row items-center`,{gap : 5}]}>
                <Text style={tw`text-base text-gray-700 font-semibold opacity-60`}>Volume</Text>
                <Text style={tw`text-base text-black font-semibold`}>{getVolume()}</Text>
            </View>
            <View style={[tw`flex-row items-center border-gray-500 border rounded-full p-1 px-4`,{gap:15}]}>
                <TouchableOpacity onPress={handleDecrement}>
                    <MinusIcon size={20} strokeWidth={3} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={[{color:COLORS.text},tw`font-extrabold text-lg`]}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncrement}>
                    <PlusIcon size={20} strokeWidth={3} color={COLORS.text} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={tw`flex-row justify-between mx-4 top-5`}>
            <TouchableOpacity onPress={handleAddToCart} style={tw`p-4 rounded-full border border-gray-400`}>
                <ShoppingBagIcon size={30} color="gray"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBuy} style={[tw`p-4 rounded-full flex-1 ml-3`,{backgroundColor : COLORS.bgLight}]}>
                <Text style={tw`text-center text-base font-semibold`}>Buy Now</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>


      {/* Modal */}
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
            <View style={[tw` p-6 rounded-md items-center`,{backgroundColor : COLORS.gray}]}>
                {modalContent.success ? (
                <Ionicons name="checkmark-circle" size={70} color={"#4CAF50"} />
                ) : (
                <Ionicons name="close-circle" size={70} color={"#E53935"} />
                )}
                <Text style={tw`text-lg font-semibold mt-3`}>{modalContent.message}</Text>
            </View>
     </Modal>



    </View>
  )
}

export default ProductScreen;