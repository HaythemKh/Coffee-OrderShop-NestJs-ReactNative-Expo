  import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native'
  import React, { useRef, useState } from 'react'
  import tw from 'twrnc'
  import { StatusBar } from 'expo-status-bar'
  import {MapPinIcon} from 'react-native-heroicons/solid'
  import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
  import { COLORS, FONTS } from '../Constants/theme'
  import { categories, coffeeItems } from '../Constants/data'
  import Carousel from 'react-native-snap-carousel';
  import CoffeeCard from '../Components/CoffeeCard'
  import { useContext } from 'react'
  import { GlobalContext } from '../context/GlobalWrapper'
  import { useEffect } from 'react'
  import { useNavigation } from '@react-navigation/native'
  import {FlashList} from '@shopify/flash-list';


  const HomeScreen = ({navigation}) => {
    // const navigation = useNavigation();

    const {fetchCoffeeData,isLoggedIn,FetchProfileData} = useContext(GlobalContext);


    const [Categoriesdata, setCategoriesData] = useState(categories);
    const [coffeeData,setCoffeeData] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [ProfileData, setProfileData] = useState(null);

const [isLogged, setIsLogged] = useState(false);

const fetchData = async () => {
  const data = await fetchCoffeeData();
  setCoffeeData(data);
};

const fetchProfile = async () => {
  const data = await FetchProfileData();
  setProfileData(data);
};

useEffect(() => {
  fetchData();

  const checkAuthentication = async () => {
    const loggedIn = await isLoggedIn();
    setIsLogged(loggedIn);

    if (loggedIn) {
      fetchProfile();
    }
  };

  checkAuthentication();
}, [fetchCoffeeData, isLoggedIn]);

    const carouselRef = useRef(null);

    const searchHandler = async () =>{
        const filteredData = coffeeData.filter((item)=> item.Name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
        if(searchQuery !== ''){
          setActiveCategory(null);
          setSearchResult(filteredData);
        }

  }

    const handleCategoryPress = (categoryName) => {
      setActiveCategory(categoryName);
      setSearchQuery('');
      setSearchResult([]);
      const targetIndex = coffeeData.findIndex((item) => item.Name === categoryName);

      carouselRef.current.snapToItem(targetIndex);
    };


    return (
      <SafeAreaView style={[tw`flex-1 relative bg-white`]}>
        <StatusBar/>
        <Image source={require('../assets/images/beansBackground1.png')}
        style={[tw`w-full absolute -top-5 opacity-10`,{height : 230}]} />

        <View style={tw`flex-1`}>

          <View style={tw`px-4 flex-row justify-between items-center top-10`} >
            
          {
                isLogged ? (
                <TouchableOpacity onPress={() => navigation.navigate("Profile",{ProfileData : ProfileData})}>
                <View style={{flexDirection : 'row',alignItems : 'center',gap : 10}}>
                <Image source={require('../assets/images/avatar.png')} style={tw`h-9 w-9 rounded-full`} />
                {
                  ProfileData ? <Text style={{fontFamily : FONTS.semiBold, fontSize : 18}}>Hi, {ProfileData.FirstName}</Text> : ''
                }
                </View>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{padding : 10,backgroundColor : COLORS.borderLight,paddingHorizontal : 20,borderRadius : 15}}>
                <Text style={tw`text-base font-semibold text-white`}>Login</Text>
                </TouchableOpacity>
                )
            }

            <View style={tw`flex-row items-center`}>
              <MapPinIcon size={25} color={COLORS.bgLight}/>
              <Text style={tw`text-base font-semibold`}>Tunisia</Text>
            </View>
            {/* <BellIcon size={27} color="black" /> */}
          </View>

          {/** Search bar */}
          <View style={tw`mx-5 mt-14`}>
            <View style={tw`flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6] top-10`}>
              <TextInput placeholder='Search By Coffee Name' onChangeText={(text) => setSearchQuery(text)} value={searchQuery} style={tw`p-4 flex-1 font-semibold text-gray-700`} />
              <TouchableOpacity onPress={searchHandler} style={[tw`rounded-full p-2`,{backgroundColor : COLORS.bgLight}]}>
                <MagnifyingGlassIcon size={25} strokeWidth={2} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/** Categories */}
          <View style={tw`px-5 mt-6 top-10`}>
            
            <FlatList horizontal showsHorizontalScrollIndicator={false}
            data={coffeeData}
            keyExtractor={(item) => (item.Name)}
            renderItem={({item}) => {
              let isActive = item.Name===activeCategory;
              let activeTextStyle = isActive? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity onPress={() => handleCategoryPress(item.Name)}
                style={[{ backgroundColor: isActive? COLORS.bgLight :'rgba(0, 0, 0, 0.07)' }, tw`p-4 px-5 rounded-full mr-2 shadow`]}>
                  <Text style={tw`font-semibold` + activeTextStyle}>
                    {item.Name}
                  </Text>
                </TouchableOpacity>
              )
            }
            }
            contentContainerStyle={tw`overflow-visible`}
            />
          </View>

          {/** Coffee cards */}
              <View style={tw`mt-16 py-2`}>
                <Carousel containerCustomStyle={{overflow : 'visible'}}
                ref={carouselRef}
                data={searchResult.length!==0? searchResult : coffeeData}
                loop={true}
                renderItem={({item}) => <CoffeeCard item={item} />}
                // firstItem={activeCategory ? coffeeData.findIndex((item) => item.Name === activeCategory) : 0}
                inactiveSlideOpacity={0.75}
                inactiveSlideScale={0.77}
                sliderWidth={400}
                itemWidth={260}
                slideStyle={{display : 'flex', alignItems : 'center', marginTop : 56 }}
              
                />
              </View>

        </View>


        
      </SafeAreaView>
    )
  }

  export default HomeScreen;