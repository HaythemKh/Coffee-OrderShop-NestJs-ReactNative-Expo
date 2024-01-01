import { useState, createContext, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BackendURL = "http://192.168.0.140:5000/api/";

export const GlobalContext = createContext();

const GlobalWrapper = ({ children }) =>{

    const fetchCoffeeData = async () =>{
        try {
            const response = await axios.get(BackendURL + "coffee-item/CoffeeItems");
            return response.data;
        }catch (error) {
            console.error('Error fetching data : ',error);
        }
    };

    const AddItemToCart = async (cartItem) => {
        try {
            const token = await AsyncStorage.getItem('CustomerToken');
          if (!token) {
            console.error('Token not found in AsyncStorage');
            return null;
          }
    
          const response = await axios.post(BackendURL + "cart/AddCoffee-To-Cart", cartItem, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 201) {
            return { success: true, message: response.data.message };
          } else {
            return { success: false, message: response.data.message };
          }
        } catch (error) {
            if (error.response) {
                return { success: false, message: error.response.data.message};
            }else
            console.error('Error adding item to cart:', error.message);
        }
      };

      const fetchCartItems = async () =>{
        try {

            const token = await AsyncStorage.getItem('CustomerToken');
            if (!token) {
              console.error('Token not found in AsyncStorage');
              return null;
            }

            const response = await axios.get(BackendURL + "cart/Cart_Items", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data;
        }catch (error) {
            console.error('Error fetching data : ',error);
        }
    };

    const updateCartItemQuantity = async (itemId, newQuantity) => {
        try {
            const token = await AsyncStorage.getItem('CustomerToken');
            if (!token) {
              console.error('Token not found in AsyncStorage');
              return null;
            }

            const response = await axios.patch(BackendURL + `cart/updateCartItemQuantity/${itemId}`, {
                Quantity : newQuantity,
            },{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if(response.status === 200){
                return true;
            }
            return false;
        } catch (error){
            if (error.response) {
                return false;
            }else
            console.error('Error updating item quantity in cart:', error.message);
        }
    }

    const signUpUser  = async (user) => {
        try {
            const response = await axios.post(BackendURL + "users/createUser",user);
            if (response.status === 201) {
                return { success: true, message: response.data.message };
              } else {
                return { success: false, message: response.data.message };
              }
            } catch (error) {
                if (error.response) {
                    return { success: false, message: error.response.data.message};
                }else
                console.error('Error user creation:', error.message);
            }
    }

    const signinUser = async (Email,Password) => {
        try {
            const response = await axios.post(BackendURL + "auth/signin" , {
                Email : Email,
                Password : Password,
            });
            if(response.status === 201){
                const jwtToken = response.data;
                await AsyncStorage.setItem('CustomerToken', jwtToken);
                console.log(jwtToken)
                return { success: true, message : jwtToken };

            } else {
                return { success: false, message: response.data.message };
              }
            }catch (error) {
                if (error.response) {
                    return { success: false, message: error.response.data.message};
                }else
                console.error('Error Login:', error.message);
            }
    }

      const isLoggedIn = async () => {
        try {
          const token = await AsyncStorage.getItem('CustomerToken');
          return token !== null;
        } catch (error) {
          console.error('Error checking Customer login status:', error.message);
          return false;
        }
      };

      const Logout = async () => {
        try {
          await AsyncStorage.removeItem('CustomerToken');
          console.log('Token removed from AsyncStorage');
        } catch (error) {
          console.error('Error removing token from AsyncStorage:', error);
        }
      };

      const FetchProfileData = async () => {
        try {
          const token = await AsyncStorage.getItem('CustomerToken');
          if (!token) {
            console.error('Token not found in AsyncStorage');
            return null;
          }
    
          const response = await axios.get(BackendURL + 'users/MyProfile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 200) {
            return response.data;
          } else {
            console.error('Failed to fetch user profile:', response.data.message);
            return null;
          }
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          return null;
        }
      };

      const checkout = async () => {
        try {
          const token = await AsyncStorage.getItem('CustomerToken');
          if (!token) {
            console.error('Token not found in AsyncStorage');
            return { success: false, message: 'User not authenticated' };
          }
    
          const response = await axios.post(BackendURL + 'commands/Checkout', null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 201) {
            return { success: true, message: response.data.message };
          } else {
            return { success: false, message: response.data.message };
          }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                }
            else
            console.error('Error checkout:', error.message);
        }
      };

      const fetchUserOrders = async () =>{
        try {

            const token = await AsyncStorage.getItem('CustomerToken');
            if (!token) {
              console.error('Token not found in AsyncStorage');
              return null;
            }

            const response = await axios.get(BackendURL + "commands/GetCommandsByUser", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data;
        }catch (error) {
            if (error.response) {
            console.log(error.response.data.message);
            }
            else
            console.error('Error fetching data : ',error);
        }
    };


const BuyCoffee = async (order) => {
        try {
            const token = await AsyncStorage.getItem('CustomerToken');
            if (!token) {
              console.error('Token not found in AsyncStorage');
              return null;
            }
            const response = await axios.post(BackendURL + 'commands/BuyItem', order, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            if(response.status === 201){
                return { success: true, message : response.data.message };
            } else {
                return { success: false, message: response.data.message };
              }
            }catch (error) {
                if (error.response) {
                    return { success: false, message: error.response.data.message};
                }else
                console.error('Error Creating order:', error.message);
            }
    }

    return (
        <GlobalContext.Provider 
        value={{fetchCoffeeData,AddItemToCart,fetchCartItems,updateCartItemQuantity,signUpUser,signinUser,isLoggedIn,Logout,FetchProfileData,checkout,fetchUserOrders,BuyCoffee}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalWrapper;
