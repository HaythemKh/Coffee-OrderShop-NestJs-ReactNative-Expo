import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { COLORS, FONTS } from '../Constants/theme';
import tw from 'twrnc'
import {MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { GlobalContext } from '../context/GlobalWrapper'
import { useContext } from 'react'

const CartCard = ({item}) => {

  const [quantity, setQuantity] = useState(item.Quantity);
  const [quantityModal, setQuantityModal] = useState(item.Quantity);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {updateCartItemQuantity} = useContext(GlobalContext);



  const handleIncrement = () => {
    setQuantityModal((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantityModal > 1) {
      setQuantityModal((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSave = async() => {

    const updatedItems = updateCartItemQuantity(item._id, quantityModal);
    if(updatedItems)
    {
      setIsModalVisible(false);
      setQuantity(quantityModal);
    }

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setQuantity(item.Quantity);
    setTimeout(() => {
      setQuantityModal(item.Quantity)
    }, 3000);
    setQuantityModal(item.Quantity);
  };

  return (
    <View style={style.cartCard}>
      <Image source={{uri : `${item.Image}` }} style={{width : 80, height : 80}} />
      <View style={{height : 100,marginLeft : 10, paddingVertical : 20,flex : 1}}>
        <Text style={{fontWeight: 'bold', fontSize : 16}}>{item.Name}</Text>
        <Text style={{color: 'grey', fontSize : 13}}>{item.Size}</Text>
        <Text style={{fontWeight: 'bold', fontSize : 17}}>{item.Price} DT</Text>
      </View>
      <View style={{marginRight : 20, alignItems : 'center'}}>
        <Text style={{fontWeight : 'bold', fontSize : 18}}>{quantity}</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={style.actionBtn}>
            <Text style={{ color: COLORS.White,fontFamily : FONTS.bold, fontSize : 18 }}>Edit</Text>
        </View>
        </TouchableOpacity>
      </View>


      {/* Quantity Edit Modal */}
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>Edit Quantity</Text>
          <View style={style.modalQuantity}>
            <TouchableOpacity onPress={handleDecrement}>
              <MaterialIcons name="remove" size={30} color={COLORS.bgDark} />
            </TouchableOpacity>
            <Text style={style.modalQuantityText}>{quantityModal}</Text>
            <TouchableOpacity onPress={handleIncrement}>
              <MaterialIcons name="add" size={30} color={COLORS.bgDark} />
            </TouchableOpacity>
          </View>
          <View style={style.modalBtnContainer}>
          <TouchableOpacity onPress={handleSave} style={style.saveBtn}>
            <Text style={{ color: COLORS.White }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[style.modalBtn, { backgroundColor: COLORS.gray }]}>
              <Text style={style.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  )
}

export default CartCard;

const style = StyleSheet.create({
    cartCard : {
        height : 100,
        elevation : 15,
        borderRadius : 10,
        backgroundColor : COLORS.White,
        marginVertical : 10,
        marginHorizontal : 20,
        paddingHorizontal : 10,
        flexDirection : 'row',
        alignItems : 'center',
    },
    actionBtn : {
        width : 80,
        height : 35,
        backgroundColor : COLORS.bgLight,
        borderRadius : 30,
        paddingHorizontal : 5,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },

    modalContent: {
      backgroundColor: COLORS.White,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalQuantity: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    modalQuantityText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    modalBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    saveBtn: {
      backgroundColor: COLORS.bgLight,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      flex: 1,
    },
    modalBtn: {
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      marginTop: 15,
      flex: 1,
    },
    modalBtnText: {
      color: COLORS.White,
      fontSize: 16,
      fontWeight: 'bold',
    },
})