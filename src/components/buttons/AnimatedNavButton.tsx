import { Text, View, Pressable, Animated } from "react-native"
import React, { useRef } from "react"

export default function AnimatedNavButton({
  label,
  onPress,
}: {
  label: string
  onPress: () => void
}) {
  const translateY = useRef(new Animated.Value(0)).current

  const pressIn = () => {
    Animated.spring(translateY, {
      toValue: 6,
      useNativeDriver: true,
      bounciness: 6,
    }).start()
  }

  const pressOut = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 6,
    }).start()
  }

  return (
    <View className="relative items-center mb-10">
      <View className="absolute w-full h-[50px] bg-blue-800 rounded-2xl  top-[6px] z-0" />
      <Animated.View
        className="z-10 w-full"
        style={{
          transform: [{ translateY }],
        }}
      >
        <Pressable
          onPressIn={pressIn}
          onPressOut={pressOut}
          onPress={onPress}
          className="w-full h-[50px] bg-blue-600 rounded-2xl items-center justify-center shadow-2xl shadow-blue-900"
        >
          <Text className="text-white font-bold text-lg tracking-wide">
            {label.toUpperCase()}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}
