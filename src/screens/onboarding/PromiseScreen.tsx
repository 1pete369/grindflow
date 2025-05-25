import { Pressable, Text, View } from "react-native"
import ScreenLayout from "../../components/layouts/ScreenLayout"
import AnimatedNavButton from "../../components/buttons/AnimatedNavButton"
import AsyncStorage from "@react-native-async-storage/async-storage"

const features = [
  "📊 Track your goals and habits easily",
  "🔥 Get rewarded with streaks",
  "🧠 Weekly reviews & AI tips",
  "👥 Stay motivated in community chats",
]

export default function PromiseScreen({ navigation }: any) {
  const handleNext = async() => {
    await AsyncStorage.setItem("onBoardingDone","true")
    navigation.navigate("SignUp")
  }

  return (
    <ScreenLayout className="flex justify-between bg-white px-6 pt-10">
      <View>
        <Text className="text-2xl font-bold text-blue-700 mb-2">
          GrindFlow helps you by...
        </Text>
        <View className="mt-4 space-y-4">
          {features.map((feature, index) => (
            <View
              key={index}
              className="bg-blue-100 border border-blue-200 p-4 rounded-xl mt-4"
            >
              <Text className="text-blue-800 text-base font-medium">
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <AnimatedNavButton onPress={handleNext} label="next" />
    </ScreenLayout>
  )
}
