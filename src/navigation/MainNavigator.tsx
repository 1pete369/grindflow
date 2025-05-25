import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import CommunityScreen from '../screens/Main/CommunityScreen'
import GoalsScreen from '../screens/Main/GoalsScreen'
import HabitsScreen from '../screens/Main/HabitsScreen'
import HomeScreen from '../screens/Main/HomeScreen'
import ProfileScreen from '../screens/Main/ProfileScreen'

// Placeholder screen imports — create them as blank for now

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline'
              break
            case 'Habits':
              iconName = 'checkmark-done-outline'
              break
            case 'Goals':
              iconName = 'trophy-outline'
              break
            case 'Community':
              iconName = 'people-outline'
              break
            case 'Account':
              iconName = 'person-circle-outline'
              break
            default:
              iconName = 'ellipse-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 6,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
