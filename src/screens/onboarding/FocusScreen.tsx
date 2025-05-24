import { FlatList, Pressable, Text } from "react-native"
import AnimatedNavButton from "../../components/buttons/AnimatedNavButton"
import ScreenLayout from "../../components/layouts/ScreenLayout"

const focusOptions = [
  { id: "1", title: "Get fit 💪" },
  { id: "2", title: "Launch a project 🚀" },
  { id: "3", title: "Build unshakable habits 🔁" },
  { id: "4", title: "Be consistent 📅" },
  { id: "5", title: "Custom goal ✍️" },
]

export default function FocusScreen({ navigation }: any) {
  const handleNext = () => {
    navigation.navigate("Struggle")
  }

  return (
    <ScreenLayout className="flex-1 bg-white px-6">
      <Text className="text-2xl font-bold text-blue-700 mb-4">
        Whats you goal right now?
      </Text>
      <FlatList
        data={focusOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            className="bg-blue-100 rounded-lg px-4 py-3 my-2"
          >
            <Text className="text-blue-700 text-base font-medium">
              {item.title}
            </Text>
          </Pressable>
        )}
      />
      <AnimatedNavButton onPress={handleNext} label="next" />
    </ScreenLayout>
  )
}
