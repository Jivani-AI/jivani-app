import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { HelloWave } from "../components/HelloWave";
import Toast from "react-native-toast-message";

const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();

  const handleAuth = () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields ‼️",
        text2: "Email and Password are required.",
        position: "bottom",
      });
      return;
    }

    if (isSignup) {
      Toast.show({
        type: "success",
        text1: "Welcome to the Jivi Club !! ✅",
        text2: "Please go ahead and Login 🚀🚀🚀",
        position: "bottom",
      });
      setIsSignup(false);
      setEmail("");
      setPassword("");

      //   signup(email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      {/* Soft layered background */}
      <View style={styles.bgCircleTopRight} />
      <View style={styles.bgCircleBottomLeft} />

      {/* Avatar + Greeting */}
      <View style={styles.avatarBlock}>
        <HelloWave size={40} />
        <Text style={styles.avatarGreeting}>
          {isSignup ? "Hey there, new friend!" : "Welcome back, legend!"}
        </Text>
        <View style={styles.moodBar}>
          <View style={styles.moodFill} />
          <View style={styles.moodFill2} />
          <View style={styles.moodFill3} />
          <View style={styles.moodFill4} />
        </View>
        <Text style={styles.tagline}>Jivani: Your Life, Organized.</Text>
      </View>

      <View style={styles.authBox}>
        <Text style={styles.title}>
          {isSignup ? "Create Account 🚀" : "Log In 🔐"}
        </Text>
        <Text style={styles.subtitle}>
          {isSignup
            ? "Let’s start something beautiful today."
            : "Time to continue your journey."}
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isSignup ? "Sign Up" : "Log In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.switchText}>
            {isSignup
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerQuote}>
        “The best way to get things done is to begin.” 🌱
      </Text>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFE7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  bgCircleTopRight: {
    position: "absolute",
    top: -90,
    right: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#FFD6C0",
    zIndex: 0,
    opacity: 0.35,
  },
  bgCircleBottomLeft: {
    position: "absolute",
    bottom: -90,
    left: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#FFD6C0",
    zIndex: 0,
    opacity: 0.35,
  },

  avatarBlock: {
    alignItems: "center",
    marginBottom: 16,
    zIndex: 2,
  },
  avatarEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  avatarGreeting: {
    fontFamily: "CabinetGroteskBold",
    fontSize: 18,
    color: "#342B20",
    marginBottom: 6,
  },
  tagline: {
    fontSize: 20,
    fontFamily: "CabinetGroteskBold",
    color: "#5E4B36",
    marginVertical: 8,
  },
  moodBar: {
    width: 120,
    height: 4,
    backgroundColor: "#342B20",
    borderRadius: 10,
    overflow: "hidden",
    margin: 8,
  },
  moodFill: {
    width: "20%",
    height: "100%",
    backgroundColor: "#342B20",
  },
  moodFill2: {
    width: "20%",
    height: "100%",
    backgroundColor: "#FFF3D9",
    position: "absolute",
    left: "20%",
    top: 0,
  },
  moodFill3: {
    width: "20%",
    height: "100%",
    backgroundColor: "#342B20",
    position: "absolute",
    left: "40%",
    top: 0,
  },
  moodFill4: {
    width: "20%",
    height: "100%",
    backgroundColor: "#FFF3D9",
    position: "absolute",
    left: "60%",
    top: 0,
  },

  authBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 24,
    elevation: 5,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontFamily: "CabinetGroteskExtraBold",
    color: "#342B20",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "InterLight",
    color: "#555",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: "CabinetGroteskMedium",
    color: "#342B20",
    marginBottom: 16,
    backgroundColor: "#FAF9F5",
  },
  button: {
    backgroundColor: "#342B20",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  switchText: {
    fontSize: 14,
    fontFamily: "InterLight",
    color: "#555",
    textAlign: "center",
    marginTop: 4,
  },

  footerQuote: {
    marginTop: 30,
    fontSize: 12,
    fontFamily: "InterLight",
    color: "#998F82",
    textAlign: "center",
    maxWidth: 280,
    zIndex: 2,
  },
});
