import { useEffect, useState } from "react"
import { View, Text, Pressable } from "react-native"
import { useUserContext } from "../../contexts/UserContext"
import { jwtDecode } from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"

type JWTPayload = {
  iat: number
  exp: number
}

export default function ProfileScreen({ navigation }: any) {
  const { logout, user } = useUserContext()
  const [expiryCountdown, setExpiryCountdown] = useState("")
  const [loginTime, setLoginTime] = useState("")

  useEffect(() => {
    const loadTokenDetails = async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        const decoded = jwtDecode<JWTPayload>(token)
        const issuedAt = new Date(decoded.iat * 1000)
        const expiresAt = new Date(decoded.exp * 1000)
        setLoginTime(issuedAt.toLocaleString())

        const updateCountdown = () => {
          const now = new Date()
          const diff = expiresAt.getTime() - now.getTime()

          if (diff <= 0) {
            setExpiryCountdown("Expired")
          } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setExpiryCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
          }
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
      }
    }

    loadTokenDetails()
  }, [])

  if (!user) return null

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <Text className="text-3xl font-bold text-center text-blue-700 mb-8">
        Your Profile
      </Text>

      <View className="bg-gray-100 p-6 rounded-xl shadow-md space-y-3">
        <ProfileItem label="Full Name" value={user.fullName} />
        <ProfileItem label="Username" value={user.username} />
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="User ID" value={user._id} />
        <ProfileItem label="Last Login" value={loginTime} />
        <ProfileItem label="Token Expires In" value={expiryCountdown} />
      </View>

      <Pressable
        className="bg-red-600 mt-10 py-3 rounded-xl items-center"
        onPress={() =>
          logout().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          })
        }
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </Pressable>
    </View>
  )
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <Text className="text-gray-800 text-base">
      <Text className="font-semibold">{label}: </Text>
      {value}
    </Text>
  )
}
