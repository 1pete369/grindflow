import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import ScreenLayout from "../../components/layouts/ScreenLayout"
import { axiosInstance } from "../../lib/axiosInstance"
import { useUserContext } from "../../contexts/UserContext"

export default function SignUpScreen({ navigation }: any) {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [fullNameError, setFullNameError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [mainError, setMainError] = useState("")
  const [canSignup, setCanSignup] = useState(false)

  const { signup, isSigningUp } = useUserContext()

  const handleName = (text: string) => {
    if (text.trim().length < 3) {
      setFullNameError("Full name must be at least 3 characters.")
    } else {
      setFullNameError("")
    }
  }

  const handleUsername = (text: string) => {
    const regex = /^[a-z0-9_]+$/
    if (text.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters.")
    } else if (!regex.test(text)) {
      setUsernameError(
        "Only lowercase letters, numbers, and underscores allowed."
      )
    } else {
      setUsernameError("")
    }
  }

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

  const handleSignup = async () => {
    if (fullName === "" || username === "" || email === "" || password === "") {
      setMainError("Fill all the fields!")
    }
    if (!canSignup) return

    try {
      const data = { fullName, username, email, password }
      const success = await signup(data)
      if (success) {
        navigation.replace("Main")
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Signup failed.")
    }
  }

  useEffect(() => {
    if (
      username !== "" &&
      usernameError === "" &&
      email !== "" &&
      emailError === "" &&
      password !== "" &&
      passwordError === ""
    ) {
      setCanSignup(true)
    } else {
      setCanSignup(false)
    }
  }, [
    username,
    fullName,
    email,
    password,
    usernameError,
    fullNameError,
    emailError,
    passwordError,
  ])

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null)
  const [checkingUsername, setCheckingUsername] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const validFormat = /^[a-z0-9_]+$/.test(username)

      if (username.trim().length >= 3 && validFormat) {
        setCheckingUsername(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        try {
          const res = await axiosInstance.get(
            `/auth/check-username?username=${username}`
          )
          setIsUsernameAvailable(res.data.available)

          if (!res.data.available) {
            setUsernameError("Username is already taken.")
          } else {
            setUsernameError("")
          }
        } catch {
          setUsernameError("Couldn't check username.")
        } finally {
          setCheckingUsername(false)
        }
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [username])

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
                Create Account
              </Text>
              {mainError ? (
                <Text className="text-red-600 mb-4 text-center">
                  {mainError}
                </Text>
              ) : null}

              {/* Full Name */}
              <TextInput
                className={`border rounded-lg placeholder:text-gray-600 px-4 py-3 mb-4 ${
                  fullNameError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Full Name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text)
                  handleName(text)
                }}
              />
              {fullNameError ? (
                <Text className="text-red-600 mb-4">{fullNameError}</Text>
              ) : null}

              {/* Username */}
              <TextInput
                className={`border rounded-lg placeholder:text-gray-600 px-4 py-3 mb-2 ${
                  usernameError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Username"
                autoCapitalize="none"
                value={username}
                onChangeText={(text) => {
                  const formatted = text.toLowerCase()
                  setUsername(formatted)
                  handleUsername(formatted)
                }}
              />

              {/* Spinner + Username Check */}
              <View className=" mb-2">
                {checkingUsername ? (
                  <View className="flex flex-row text-sm items-center gap-2">
        
                    <Text>checking availability</Text>
                    <ActivityIndicator size="small" color="#4B5563" />
                  </View>
                ) : usernameError ? (
                  <Text className="text-red-600">{usernameError}</Text>
                ) : isUsernameAvailable && username.length >= 3 ? (
                  <Text className="text-green-600 text-sm">
                    Username is available ✅
                  </Text>
                ) : null}
              </View>

              {/* Email */}
              <TextInput
                className={`border rounded-lg placeholder:text-gray-600 px-4 py-3 mb-4 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  handleEmail(text)
                }}
              />
              {emailError ? (
                <Text className="text-red-600 mb-4">{emailError}</Text>
              ) : null}

              {/* Password */}
              <TextInput
                className={`border rounded-lg text-black px-4 py-3 mb-4 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
                placeholderTextColor={"#4b5563"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  handlePassword(text)
                }}
              />
              {passwordError ? (
                <Text className="text-red-600 mb-4">{passwordError}</Text>
              ) : null}

              {/* Sign Up Button */}
              <Pressable
                className="bg-blue-600 py-3 rounded-xl items-center"
                onPress={handleSignup}
                disabled={!canSignup || isSigningUp}
              >
                <Text className="text-white font-semibold text-lg">
                  {isSigningUp ? "Signing up..." : "Sign up"}
                </Text>
              </Pressable>

              <Text className="mt-6 text-center text-gray-500">
                Already have an account?{" "}
                <Text
                  className="text-blue-600 font-semibold"
                  onPress={() => navigation.replace("Login")}
                >
                  Log in
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}
