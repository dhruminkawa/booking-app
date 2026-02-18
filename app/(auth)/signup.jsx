import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import logo from "../../assets/images/dinetimelogo.png";
import validationSchema from '../../utils/authSchema';



const entryImg = require("../../assets/images/Frame.png")

const Signup = () => {
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();
    const handleGuest= async () =>{ 
     await AsyncStorage.setItem("isGuest","true")
     router.push("/home")
  }
    const handleSignup =  async(values) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,values.email,values.password
            )
            const user= userCredentials.user;

            await setDoc(doc(db,"users",user.uid),{
                email:values.email,
                createdAt:new Date(),
            })
            await AsyncStorage.setItem("userEmail", values.email)
            await AsyncStorage.setItem("isGuest","false")

               router.push("/home")
        

        } catch (error) {
           if(error.code==="auth/email-already-in-use"){
            Alert.alert("Signup Failed!",
                "This email address is already in use. use different email",[{text:"OK"}]
            )
           }
           else {
            Alert.alert("Signup Error",
                "Unexpected error",[{text:"OK"}]
            )
           }
            
        }
    }
    return (
        <SafeAreaView className={`bg-[#2b2b2b]`}>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="m-2 flex justify-center items-center">
                    <Image source={logo} style={{ height: 100, width: 200 }} />
                    <Text className="text-lg text-center text-white font-bold mb-10">Let's get started</Text>

                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSignup}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="w-full">
                                    <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                                    <TextInput
                                        className="h-12 border border-white text-white rounded px-2"
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                        value={values.email} onBlur={handleBlur("email")}
                                    />
                                    {touched.email && errors.email && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.email}
                                        </Text>
                                    )}

                                    <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                                    <TextInput
                                        className="h-12 border border-white text-white rounded px-2"
                                        secureTextEntry
                                        onChangeText={handleChange("password")}
                                        value={values.password} onBlur={handleBlur("password")}
                                    />
                                    {touched.password && errors.password && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.password}
                                        </Text>
                                    )}
                                    <TouchableOpacity onPress={handleSubmit} className="p-2 my-2 bg-[#f49b33]  text-black mt-10 rounded-lg">
                                        <Text className="text-lg font-semibold text-center">
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity >
                                </View>
                            )}
                        </Formik>
                        <View>
                            
                            <TouchableOpacity className="flex flex-row justify-center mt-5 p-2 items-center" onPress={() => router.push("/signin")}>
                                <Text className="text-white font-semibold">
                                    Already a User? {" "}
                                </Text>
                                <Text className="text-base text-[#f49b33] underline font-semibold text-center">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            <Text className="text-center text-base font-semibold mb-1 text-white">
               <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or {" "}
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
             <TouchableOpacity className="flex flex-row justify-center mb-5 p-2 items-center" onPress={handleGuest}>
                                <Text className="text-white font-semibold">
                                    Be a 
                                </Text>
                                <Text className="text-base text-[#f49b33] underline font-semibold text-center">
                                   {" "} Guest User
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-1">
                        <Image source={entryImg} className="w-full h-full" resizeMode="contain" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup