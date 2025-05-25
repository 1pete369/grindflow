import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
} from "react-native"
import ScreenLayout from "../../components/layouts/ScreenLayout"
import { useUserContext } from "../../contexts/UserContext"

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [canLogin, setCanLogin] = useState(false)

  const { login, isLoggingIn } = useUserContext()

  const handleEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email.")
    } else {
      setEmailError("")
    }
  }

  const handlePassword = (text: string) => {
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters.")
    } else {
      setPasswordError("")
    }
  }

  const handleLogin = async () => {
    if (email === "" || password === "") {
      if (email === "") setEmailError("Email is required.")
      if (password === "") setPasswordError("Password is required.")
      return
    }

    if (!canLogin) return

    const success = await login({ email, password })
    if (success) {
      navigation.replace("Main")
    }
  }

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      emailError === "" &&
      passwordError === ""
    ) {
      setCanLogin(true)
    } else {
      setCanLogin(false)
    }
  }, [email, password, emailError, passwordError])

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: "space-around", padding: 10 }}
          >
            <View>
              <Text className="text-3xl font-bold text-blue-700 mb-4 text-center">
                Welcome Back
              </Text>

              <TextInput
                className={`border rounded-lg placeholder:text-gray-600 px-4 py-3 mb-2 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  handleEmail(text)
                }}
              />
              {emailError ? (
                <Text className="text-red-600 mb-2">{emailError}</Text>
              ) : null}

              <TextInput
                className={`border rounded-lg text-black px-4 py-3 mb-2 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                placeholderTextColor="#4b5563"
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  handlePassword(text)
                }}
              />
              {passwordError ? (
                <Text className="text-red-600 mb-4">{passwordError}</Text>
              ) : null}

              <Pressable
                className="bg-blue-600 py-3 rounded-xl items-center"
                onPress={handleLogin}
              >
                <Text className="text-white font-semibold text-lg">
                  {isLoggingIn ? "Logging in..." : "Log In"}
                </Text>
              </Pressable>

              <Text className="mt-6 text-center text-gray-500">
                Don't have an account?{" "}
                <Text
                  className="text-blue-600 font-semibold"
                  onPress={() => navigation.replace("SignUp")}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}
