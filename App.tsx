import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "./src/navigation/RootNavigator"
import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { configureGoogle } from "./src/lib/google"

export default function App() {
  configureGoogle()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
