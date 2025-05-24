import { View, Text, Animated, Pressable } from "react-native"
import React, { useRef } from "react"

type AnimatedButtonProps = {
  label: string
  onPress: () => void
  type: "primary" | "secondary"
  selected?: boolean
}

export default function AnimatedButton({
  label,
  onPress,
  selected = false,
  type,
}: AnimatedButtonProps) {
  const scale = useRef(new Animated.Value(1)).current

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start()
  }

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start()
  }

  // Tailwind styles based on type and selected
  const baseStyle =
    "px-4 py-3 mt-3 rounded-lg border-2 transition-all duration-150"

  const typeStyle =
    type === "primary"
      ? selected
        ? "bg-blue-100 border-blue-500"
        : "bg-white border-gray-300"
      : selected
      ? "bg-green-100 border-green-500"
      : "bg-white border-gray-300"

  const textStyle =
    type === "primary"
      ? selected
        ? "text-blue-700"
        : "text-gray-800"
      : selected
      ? "text-green-700"
      : "text-gray-800"

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={animateIn}
        onPressOut={animateOut}
        onPress={onPress}
        className={`${baseStyle} ${typeStyle}`}
      >
        <Text className={`text-base font-semibold ${textStyle}`}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
