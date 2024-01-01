import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { COLORS, FONTS } from '../Constants/theme'
import Modal from 'react-native-modal';


const OrderHistoryCard = ({item}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const formatOrderDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const renderOrderDetails = () => {
    return item.ListItems.map((item, index) => (
      <View key={index} style={styles.orderDetails}>
        <Text style={styles.orderDetailText}>
        {item.CoffeeName} [{item.CoffeeSize}]
        </Text>
        <Text style={[styles.orderDetailText,{marginRight : 15,marginLeft : 5}]}>x{item.CoffeeQuantity}</Text>
        <Text style={styles.orderDetailText}>{item.CoffeePrice} DT</Text>

      </View>
    ));
  };
  return (
    <View>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
    <View style={styles.orderHistoryCard}>
        <View style={styles.cardContent}>
        <Text style={styles.orderDate}>Order Date : </Text>
          <Text style={[styles.orderDate,{marginLeft : 20}]}>{formatOrderDate(item.createdAt)}</Text>
        </View>
    </View>
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Order Details</Text>
          {renderOrderDetails()}
          <Text style={{fontFamily : FONTS.PoppinsBold,fontSize : 20}}>Total : {item.Total} DT</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>


  )
}

export default OrderHistoryCard;

const styles = StyleSheet.create({
    orderHistoryCard: {
      height: 100,
      elevation: 15,
      borderRadius: 10,
      backgroundColor: COLORS.bgLight,
      marginVertical: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    orderDate: {
      fontFamily : FONTS.PoppinsSemiBold,
      fontSize: 16,
      textAlign : 'center',
      color : COLORS.White,
    },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgLight,
      },
      modalTitle: {
        fontFamily: FONTS.PoppinsSemiBold,
        fontSize: 24,
        marginBottom: 20,
      },
      orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
      },
      orderDetailText: {
        fontFamily: FONTS.PoppinsRegular,
        fontSize: 16,
      },
      closeButton: {
        backgroundColor: COLORS.cardBg,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
      },
      closeButtonText: {
        fontFamily: FONTS.PoppinsSemiBold,
        fontSize: 16,
        color: COLORS.White,
        textAlign: 'center',
      },

  });