import { useState, useEffect } from "react"
import {View,Text,TextInput,Pressable,StyleSheet,Dimensions,ImageBackground} from "react-native"
import { useSignupMutation } from "../../services/authApi"
import { useDispatch } from "react-redux"
import { setUserEmail, setLocalId } from "../../store/slices/userSlice"
import { saveSession } from "../../db"
import { colors } from "../../global/colors"

// Imagen de fondo
import bgImage from "../../../assets/duende_cannabis_monstruoso.png"

const textInputWidth = Dimensions.get("window").width * 0.7

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const [triggerSignup, { data, isSuccess, isError, error: signupError }] =
    useSignupMutation()

  const onSubmit = () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
    setError("")
    triggerSignup({ email, password, returnSecureToken: true })
  }

  useEffect(() => {
    if (isSuccess && data) {
      saveSession(data.localId, data.email, data.idToken)
      dispatch(setUserEmail(data.email))
      dispatch(setLocalId(data.localId))
    }
  }, [isSuccess, data])

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>C-Monster</Text>
        <Text style={styles.subTitle}>Crear cuenta</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.white}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor={colors.white}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.textInput}
            placeholder="Repetir contraseña"
            placeholderTextColor={colors.white}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {isError && signupError ? (
          <Text style={styles.error}>
            {signupError?.data?.error?.message || "Error al crear cuenta"}
          </Text>
        ) : null}

        <Pressable style={styles.btn} onPress={onSubmit}>
          <Text style={styles.btnText}>Registrarse</Text>
        </Pressable>

        <View style={styles.footTextContainer}>
          <Text style={styles.whiteText}>¿Ya tienes cuenta?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.whiteText, styles.underLineText]}>
              Inicia sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: colors.neonGreen,
    fontFamily: "PressStart2P",
    fontSize: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: colors.neonGreen,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    gap: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    width: textInputWidth,
    color: colors.white,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.black,
    borderRadius: 16,
    marginTop: 32,
    opacity: 0.9,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
  },
  whiteText: {
    color: colors.white,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 8,
  },
})