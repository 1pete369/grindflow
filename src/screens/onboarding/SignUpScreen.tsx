import { Image, Pressable, Text, View } from "react-native"
import ScreenLayout from "../../components/layouts/ScreenLayout"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SignUpScreen({ navigation }: any) {
const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;

    // ✅ Send to your Express backend
    const res = await axios.post('http://YOUR_SERVER_URL/api/auth/google', {
      token: idToken,
    });

    // Save JWT from your server
    await AsyncStorage.setItem('token', res.data.token);
    await AsyncStorage.setItem('onboardingDone', 'true');
    navigation.replace('Main');
  } catch (error) {
    console.log('Google login error:', error);
  }
};

  return (
    <ScreenLayout className="flex justify-between bg-white px-6 pt-10 items-center">
      <Text className="text-2xl font-bold text-blue-700 mb-2">
        Welcome to GrindFlow
      </Text>

      <View className="flex flex-col gap-2">
        <Text className="text-base text-gray-600 text-center mb-8">
          Sign in to start your focus journey
        </Text>
        <Pressable
          onPress={handleGoogleLogin}
          className="flex flex-row justify-center py-3 px-4 rounded-lg w-full items-center bg-white border border-gray-300"
        >
          <Image
            source={require("./../../../assets/google.png")}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text className="text-base font-medium text-gray-800">
            Continue with Google
          </Text>
        </Pressable>
      </View>

      {/* Optional Email Signup (Future Use) */}
      {/* 
      <TextInput ... placeholder="Email" />
      <TextInput ... placeholder="Password" />
      */}

      <Text className="text-xs text-gray-400 mt-6 text-center mb-8">
        By continuing, you agree to our Terms & Privacy.
      </Text>
    </ScreenLayout>
  )
}
