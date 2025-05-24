import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function ScreenLayout({
  children,
  center = false,
  className = "",
}: {
  children: React.ReactNode
  center?: boolean
  className?: string
}) {
  const insets = useSafeAreaInsets()

  return (
    <View
      className={`flex-1 bg-white px-6 ${className}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {children}
    </View>
  )
}
