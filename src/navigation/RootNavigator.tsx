import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { useUserContext } from "../contexts/UserContext"
import FocusScreen from "../screens/onboarding/FocusScreen"
import LoginScreen from "../screens/onboarding/LoginScreen"
import PromiseScreen from "../screens/onboarding/PromiseScreen"
import SignUpScreen from "../screens/onboarding/SignUpScreen"
import StruggleScreen from "../screens/onboarding/StruggleScreen"
import WelcomeScreen from "../screens/onboarding/WelcomeScreen"
import MainNavigator from "./MainNavigator"

const Stack = createNativeStackNavigator()

function InitialLoader() {
  const navigation = useNavigation()
  const { user, isCheckingAuth } = useUserContext()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const run = async () => {
      const onboarded = await AsyncStorage.getItem("onBoardingDone")

      if (isCheckingAuth) return // wait for auth check to finish

      if (user) {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: "Main" }],
        })
      } else if (onboarded === null) {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: "Welcome" }],
        })
      } else {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: "Login" }],
        })
      }

      setChecking(false)
    }

    run()
  }, [user, isCheckingAuth]) // ← re-run when auth context updates

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#2563EB" />
      <Text className="mt-2 text-gray-600">Loading...</Text>
    </View>
  )
}


export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Init" component={InitialLoader} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Focus" component={FocusScreen} />
      <Stack.Screen name="Struggle" component={StruggleScreen} />
      <Stack.Screen name="Promise" component={PromiseScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  )
}