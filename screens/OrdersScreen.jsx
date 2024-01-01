import { View, Text, SafeAreaView,StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React , { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../Constants/theme';
import {FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'
import OrderHistoryCard from '../Components/OrderHistoryCard';
import {FlashList} from '@shopify/flash-list';

const OrdersScreen = () => {

    const {fetchUserOrders} = useContext(GlobalContext);
    const [OrderItems,setcartOrders] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchData = async () => {
        const data = await fetchUserOrders();
        setcartOrders(data);
    }



  const refreshCart = async() =>{
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false)
  }

    useEffect(() =>{

        fetchData();
      
    }, [fetchUserOrders,fetchData])
  return (
    <SafeAreaView style={{backgroundColor : COLORS.White, flex : 1,}}>
   
      <View style={style.header}>
      </View>
      <FlashList showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom : 80}} 
        data={OrderItems}
        refreshing={isRefreshing}
        onRefresh={refreshCart}
        estimatedItemSize={50}
        ListHeaderComponentStyle={{paddingHorizontal : 20,marginTop : 20}}
        ListHeaderComponent={()=>(
            <View>
                <View style={{marginHorizontal : 30}}>
                        <View style={style.btnContainer}>
                            <Text style={style.title}>Your orders</Text>
                        </View>
                </View>
            </View>
        )}
        renderItem={({item}) => <OrderHistoryCard item={item}/>} 
      />
    </SafeAreaView>
  )
}

export default OrdersScreen;

const style = StyleSheet.create({
    header:{
        paddingVertical : 20,
        flexDirection : 'row',
        alignItems : 'center',
        marginHorizontal : 20,
        marginTop : 20
    },
    title: {color: COLORS.black, fontSize: 30,fontFamily : FONTS.PoppinsBold},
    btnContainer: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})