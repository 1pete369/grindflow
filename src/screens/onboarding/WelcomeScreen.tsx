import { Pressable, Text, View } from "react-native"
import ScreenLayout from "../../components/layouts/ScreenLayout"
import AnimatedNavButton from "../../components/buttons/AnimatedNavButton"

export default function WelcomeScreen({ navigation }: any) {
  const handleNext = () => {
    navigation.navigate("Focus")
  }

  return (
    <ScreenLayout className="flex justify-between">
      <View>
        <Text className="text-2xl font-bold text-blue-700">
          Welcome to GrindFlow
        </Text>
        <Text className="text-base mt-4 text-gray-600">
          Discipline. Focus. Flow.
        </Text>
      </View>

      <AnimatedNavButton onPress={handleNext} label="get started" />
    </ScreenLayout>
  )
}
