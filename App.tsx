import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"
import RootNavigator from "./src/navigation/RootNavigator"
import { UserProvider } from "./src/contexts/UserContext"
import Toast from "react-native-toast-message"

export default function App() {
  return (
    <>
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>

      {/* 👇 Must be outside of providers to render above everything */}
      <Toast />
    </>
  )
}
