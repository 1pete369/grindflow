import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import WelcomeScreen from "../screens/onboarding/WelcomeScreen"
import MainNavigator from "./MainNavigator"
import FocusScreen from "../screens/onboarding/FocusScreen"
import PromiseScreen from "../screens/onboarding/PromiseScreen"
import SignUpScreen from "../screens/onboarding/SignUpScreen"
import StruggleScreen from "../screens/onboarding/StruggleScreen"

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem("onBoardingDone")
      setIsFirstLaunch(completed === null)
    }
    checkOnboarding()
  }, [])

  if (isFirstLaunch === null) return null // or splash screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Focus" component={FocusScreen} />
          <Stack.Screen name="Struggle" component={StruggleScreen} />
          <Stack.Screen name="Promise" component={PromiseScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  )
}
