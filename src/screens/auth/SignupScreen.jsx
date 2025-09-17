import { useState, useEffect } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useSignupMutation } from "../../services/authApi"
import { useDispatch } from "react-redux"
import { setUserEmail, setLocalId } from "../../store/slices/userSlice"
import { saveSession } from "../../db"

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
      // Guardar sesión en SQLite
      saveSession(data.localId, data.email, data.idToken)

      // Guardar en Redux
      dispatch(setUserEmail(data.email))
      dispatch(setLocalId(data.localId))
    }
  }, [isSuccess, data])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isError && signupError ? (
        <Text style={styles.error}>
          {signupError?.data?.error?.message || "Error al crear cuenta"}
        </Text>
      ) : null}

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#4a90e2",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
})

export default SignupScreen