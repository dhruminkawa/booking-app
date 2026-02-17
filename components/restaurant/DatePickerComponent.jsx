import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'

const DatePickerComponent = ({date,setDate}) => {
    const [show, setShow] = useState(false)
  
    const onChange=(event,selectedDate)=>{
       const currentDate = selectedDate || date;
       setShow(false);
       setDate(currentDate)
    }
    const handlePress = () => {
        setShow(true)
    }
  return (
    <View className="flex p-2 flex-row">
        <TouchableOpacity onPress={handlePress} 
         className="rounded-lg left-2  px-6 py-2 justify-center bg-[#474747]"

        >
            {Platform.OS === "android" &&<Text className="text-white">{date.toLocaleDateString()}</Text>}
            {Platform.OS ==="android" && show && (
           <DateTimePicker 
           accentColor="#f49b33" 
           textColor="#f49b33"
           value={date}
            mode="date" 
            onChange={onChange}
           display="default" 
           minimumDate={new Date()}
           maximumDate={new Date(new Date().setDate(new Date().getDate()+7))}
       
           />
             
           )}
           {
            Platform.OS=="ios" &&  (
           
           <DateTimePicker 
           accentColor="#f49b33" 
           textColor="#f49b33"
           value={date} 
           mode="date" 
           onChange={onChange}
           display="default" 
           minimumDate={new Date()}
           maximumDate={new Date(new Date().setDate(new Date().getDate()+7))}
       
           />
        )}
        </TouchableOpacity>
     
    </View>
  )
}

export default DatePickerComponent




// import DateTimePicker from '@react-native-community/datetimepicker'
// import { useState } from 'react'
// import { Text, TouchableOpacity, View } from 'react-native'

// const DatePickerComponent = () => {
//   const [show, setShow] = useState(false)
//   const [date, setDate] = useState(new Date())

//   const onChange = (event, selectedDate) => {
//     setShow(false)
//     if (selectedDate) {
//       setDate(selectedDate)
//     }
//   }

//   return (
//     <View style={{ marginTop: 20, padding: 10 }}>
      
//       {/* Button */}
//       <TouchableOpacity onPress={() => setShow(true)}>
//         <Text style={{ color: "#f49b33", fontSize: 16 }}>
//           {date.toDateString()}
//         </Text>
//       </TouchableOpacity>

//       {/* Picker (only shows when show = true) */}
//       {show && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           minimumDate={new Date()}
//           maximumDate={
//             new Date(new Date().setDate(new Date().getDate() + 7))
//           }
//           onChange={onChange}
//         />
//       )}

//     </View>
//   )
// }

// export default DatePickerComponent
