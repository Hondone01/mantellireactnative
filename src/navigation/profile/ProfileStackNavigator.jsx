import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../../screens";
import Header from "../../components/Header";

const Stack = createNativeStackNavigator()

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Perfil"
            screenOptions={{
                header: ({route})=>(<Header title="C-Monster" subtitle="Perfil"/>)
            }}
        >
            <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator