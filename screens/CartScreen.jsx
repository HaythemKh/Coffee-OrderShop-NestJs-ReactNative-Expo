import { View, Text, SafeAreaView,StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React , { useState, useEffect } from 'react'
import { COLORS, FONTS, SIZES } from '../Constants/theme';
import {MaterialIcons } from '@expo/vector-icons';
import { cardsItems } from '../Constants/data';
import CartCard from '../Components/CartCard';
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import {FlashList} from '@shopify/flash-list';


const CartScreen = ({navigation}) => {

    const {fetchCartItems,checkout} = useContext(GlobalContext);
    const [Total, setTotal] = useState(0);
    const [cartItems,setcartItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const fetchData = async () => {
      const data = await fetchCartItems();
      setcartItems(data);

      const initialTotalPrice = cartItems.reduce((acc, item) => {
        return acc + item.Quantity * item.Price;
      }, 0);
    setTotal(initialTotalPrice);
    };

  const handleCheckout = async () =>{
    Alert.alert(
      "Cart Checkout",
      "You want to checkout ?",
      [
        {
          text : "No" , onPress: () => console.log("cancel pressed"),
        },
        { 
          text : "Yes" , onPress: async() => {
            const result = await checkout();
              setIsSuccess(result.success)
              setIsModalVisible(true);

              setTimeout(() => {
                setIsModalVisible(false);
                navigation.navigate("Orders");
              }, 3000);
           
          }
        },
      ]
    )


  }

  const EmptyCart = () =>{
    return (
      <View style={style.notFoundContainer}>
          <Image style={style.image} source={require("../assets/images/pngwing.png")} />
      </View>
    )
  }
    useEffect(() =>{

        fetchData();
        const initialTotalPrice = cartItems.reduce((acc, item) => {
          return acc + item.Quantity * item.Price;
        }, 0);
      setTotal(initialTotalPrice);
      
    }, [fetchCartItems,fetchData])
    

  return (
    <SafeAreaView style={{backgroundColor : COLORS.White, flex : 1,}}>
   
      <View style={style.header}>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            {
              isSuccess ?
              (<>
                <Text style={style.modalHeader}>Checkout succeed</Text>
                <Text style={style.modalText}>your orders has been added successfully <FontAwesome5 name="smile-beam" size={24} color="black" /></Text>
                </>
              ):
              (
              <>
                <Text style={style.modalHeader}>Checkout Failed</Text>
                <Text style={style.modalText}>Checkout failed try again please <FontAwesome5 name="sad-tear" size={24} color="black" /></Text>
                </>
              )
            }
           
          </View>
        </View>
      </Modal>

      {!cartItems.length ? (
        <EmptyCart/> 
        ) : (
      <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom : 80}} 
        data={cartItems}
        renderItem={({item}) => <CartCard item={item}/>}
        keyExtractor={(item) => item.Name}
        ListFooterComponentStyle={{paddingHorizontal : 20,marginTop : 20}}
        ListFooterComponent={()=>(
            <View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical : 15}}>
                    <Text style={{fontSize : 18, fontWeight : 'bold'}}>Total Price</Text>
                    <Text style={{fontSize : 18, fontWeight : 'bold'}}>{Total} DT</Text>
                </View>
                <View style={{marginHorizontal : 30}}>
                <TouchableOpacity onPress={handleCheckout}>
                  <View style={style.btnContainer}>
                   <Text style={style.title}>CHECKOUT</Text>
                  </View>
                  </TouchableOpacity>
                </View>
            </View>
        )
      }
      />
      )}
    </SafeAreaView>
  )
}

export default CartScreen;

const style = StyleSheet.create({
    header:{
        paddingVertical : 20,
        flexDirection : 'row',
        alignItems : 'center',
        marginHorizontal : 20,
        marginTop : 20
    },
    title: {color: COLORS.White, fontWeight: 'bold', fontSize: 18},
    btnContainer: {
    backgroundColor: COLORS.cardBg,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode : 'cover',
    width: 300,
    height: 300,
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
    fontFamily: FONTS.PoppinsBold,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontFamily: FONTS.PoppinsRegular,
    textAlign: 'center',
  },
})