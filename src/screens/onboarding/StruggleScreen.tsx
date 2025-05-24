import { useState } from "react"
import { FlatList, Text } from "react-native"
import AnimatedButton from "../../components/buttons/AnimatedButton"
import AnimatedNavButton from "../../components/buttons/AnimatedNavButton"
import ScreenLayout from "../../components/layouts/ScreenLayout"

const struggles = [
  { id: "1", label: "I procrastinate" },
  { id: "2", label: "I get distracted easily" },
  { id: "3", label: "I lose motivation quickly" },
  { id: "4", label: "I forget my goals" },
  { id: "5", label: "No one holds me accountable" },
]

export default function StruggleScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleNext = () => {
    navigation.navigate("Promise")
  }

  return (
    <ScreenLayout className="flex-1 bg-white px-6 pt-20">
      <Text className="text-2xl font-bold text-blue-700 mb-4">
        What usually blocks your progress?
      </Text>
        <FlatList
          data={struggles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnimatedButton
              label={item.label}
              selected={selected.includes(item.id)}
              onPress={() => toggleSelect(item.id)}
              type="primary"
            />
          )}
        />

      <AnimatedNavButton onPress={handleNext} label="Next" />
    </ScreenLayout>
  )
}
