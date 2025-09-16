import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import {Feather} from '@expo/vector-icons'
import { clearSession } from '../db'

const Header = ({ title, subtitle }) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

   const handleClearSession = async () => {
    try {
      dispatch(clearUser())
      await clearSession()
      
    } catch {

      console.log("Hubo un error al limpiar la sesión")
    }

  }

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.left}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* TÍTULO + SUBTÍTULO */}
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* FLECHA DE VOLVER */}
      <View style={styles.right}>
        {canGoBack && (
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={32} color={colors.white} />
          </Pressable>
        )}
        <Pressable style={styles.logout} onPress={handleClearSession}><Icon name="log-out" size={32} color={colors.white} /></Pressable>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  left: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.neonGreen
  },
  center: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: colors.purple,
    fontFamily: 'Karla-Bold'
  },
  subtitle: {
    fontSize: 20,
    marginTop: 5,
    color: colors.purple,
    fontFamily: 'Karla-Bold'
  },
  right: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
