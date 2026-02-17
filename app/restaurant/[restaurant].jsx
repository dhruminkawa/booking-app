import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '../../components/restaurant/DatePickerComponent';
import GuestPickerComponent from '../../components/restaurant/GuestPickerComponent';
import { db } from '../../config/firebaseConfig';

const Restaurant = () => {
  const {restaurant} = useLocalSearchParams();
 const flatlistRef = useRef(null)
 const windowWidth = Dimensions.get("window").width
 const [currentIndex,setCurrentIndex] = useState(0);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
    const [selectedNumber, setSelectedNumber] = useState()
    const [date,setDate] = useState(new Date());
  const [slotsData, setSlotsData] = useState({});
  const handleNextImage=()=>{
    const carousellength= carouselData[0]?.images.length;
    if(currentIndex < carousellength - 1){
      const nextIndex = currentIndex+1;
      setCurrentIndex(nextIndex)
      flatlistRef.current.scrollToIndex({index:nextIndex,animated:true});

    }
    if(currentIndex == carousellength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatlistRef.current.scrollToIndex({index:nextIndex,animated:true});
    }
  }
   const handlePrevImage=()=>{
    const carousellength= carouselData[0]?.images.length;
    if(currentIndex > 0){
      const prevIndex = currentIndex-1;
      setCurrentIndex(prevIndex)
      flatlistRef.current.scrollToIndex({index:prevIndex,animated:true});

    }
    if(currentIndex == 0) {
      const prevIndex = carousellength -1;
      setCurrentIndex(prevIndex);
      flatlistRef.current.scrollToIndex({index:prevIndex,animated:true});
    }
  }
  const carouselItem = ({item})=>{
     return(
      <View style={{width:windowWidth-2}} className="h-64 relative ">
        <View style={{position:'absolute',top:"50%",backgroundColor:"rgba(0,0,0,0.6)", borderRadius:50,padding:5,zIndex:10,right:"6%"}}>
           <Ionicons onPress={handleNextImage} name='arrow-forward' size={24} color="white" />
        </View>
        <View style={{position:'absolute',top:"50%",backgroundColor:"rgba(0,0,0,0.6)", borderRadius:50,padding:5,zIndex:10,left:"2%"}}>
           <Ionicons onPress={handlePrevImage} name='arrow-back' size={24} color="white" />
        </View>

        <View style={{position:"absolute",display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", left:"50%",transform:[{translateX:-50}],zIndex:10,bottom:15}}>
          {
            carouselData[0].images?.map((_,i)=>(
              <View key={i} className={`bg-white h-2 w-2 ${i==currentIndex && "h-3 w-3" } p-1 mx-1 rounded-full`}></View>
            ))
          }
          
        </View>
        <Image 
           source={{uri:item}}
           style={{
            opacity:0.5,
            backgroundColor:"black",
            marginRight:20,
            marginLeft:5,
            borderRadius:25
           }}
           className="h-64"
           />
      </View>
     )
  }

  const getRestaurantData = async ()=>{
    try {
      const restaurantQuery= query(collection(db,"restaurants"),where("name","==",restaurant))
      const restaurantSnapshot =  await getDocs(restaurantQuery);

      if(restaurantSnapshot.empty){
          console.log("No matchng ");
          return;
      }
       
      for(const doc of restaurantSnapshot.docs){
        const restaurantData = doc.data();
        setRestaurantData(restaurantData)
       
        const carouselQuery = query(
          collection(db,"carousel"),
          where("res_id", "==", doc.ref)
        )
        const carouselSnapshot =  await getDocs(carouselQuery); 
        const carouselImages = [];

        if(carouselSnapshot.empty){
          console.log("No matchng carousel ");
          return;
      }

        carouselSnapshot.forEach((carouselDoc)=>{
          carouselImages.push(carouselDoc.data());
        })
        setCarouselData(carouselImages)


        const slotsQuery = query(
          collection(db,"slots"),
          where("ref_id", "==", doc.ref)
        )
        const slotsSnapshot =  await getDocs(slotsQuery); 
        const slots = [];

        if(carouselSnapshot.empty){
          console.log("No matchng slots ");
          return;
      }

        slotsSnapshot.forEach((slotDoc)=>{
          slots.push(slotDoc.data());
        })
        setSlotsData(slots)
      }


    } catch (error) {
      console.log("errror", error)

    }
  }

  const handleLocation= async()=>{
    const url = "https://maps.app.goo.gl/TtSmNr394bVp9J8n8";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL", url);
    }
  }

   useEffect(() =>{
     getRestaurantData();
   }, [])
   console.log(restaurantData,carouselData,slotsData)
  return (
    <SafeAreaView
       style={[
        {backgroundColor:"#2b2b2b"},
         Platform.OS==="android"&&{paddingBottom:20}]}
    >   
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
         <Text className="text-2xl text-[#f49b33] mr-2 font-semibold">
          {restaurant}
          </Text>
          <View className="border-b border-[#f46b33]" />
        </View>
       <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
        <FlatList
         ref={flatlistRef}
         data={carouselData[0]?.images} 
         renderItem={carouselItem}
         horizontal
         scrollEnabled={false}
         style={{borderRadius:25}} 
         />
       </View>
       <View className="flex-1 flex-row mt-2 p-2">
          <Ionicons 
              name='location-sharp'
              size={24}
              color="#f49b33"
              />
              <Text className="max-w-[75%] text-white">
                {restaurantData?.address} {"  "}
              <Text onPress={handleLocation} className="underline flex items-center mt-1 text-[#f49b33] italic font-semibold">
                Get Direction
              </Text>
              </Text>
       </View>

       <View className="flex-1 flex-row  p-2">
          <Ionicons 
              name='time'
              size={20}
              color="#f49b33"
              />
              <Text className="max-w-[75%] mx-2 font-semibold text-white">
                {restaurantData?.opening} -{restaurantData?.closing} 
              
              </Text>
       </View>
       <View>

       
       <View className=" flex-1 flex-row m-2 p-2  justify-end items-center">
        <View className="flex-1 flex-row">
          <Ionicons name='calendar' size={20} color="#f49b33" />
          <Text className="text-white mx-2">
            Select bookingdate
          </Text>
        </View>
        <DatePickerComponent date={date} setDate={setDate} />
        </View>
        <View className=" flex-1 flex-row m-2 p-2  justify-end items-center">
        <View className="flex-1 flex-row">
          <Ionicons name='calendar' size={20} color="#f49b33" />
          <Text className="text-white mx-2">
            Select number of guests
          </Text>
        </View>
        <GuestPickerComponent SelectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
        </View>
       </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Restaurant