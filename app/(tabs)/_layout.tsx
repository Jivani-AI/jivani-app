import { HapticTab } from "../components/HapticTab";
import TabBar from "../components/TabBar";
import { useThemeColors } from "@/app/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import Mic from "../assets/icons/mic.svg";
import { useVoiceToText } from "@/app/hooks/useVoiceToText";
import VoiceWaveform from "../components/WaveForm";
import { CustomText, TextVariants } from "../components/ui/CustomText";
import { sendCommand } from "@/app/services/apiService";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const { primary, secondary, background } = useThemeColors();
  const { startListening, isListening, transcript, stopListening } =
    useVoiceToText();
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const handleMicPress = () => {
    // sendCommand("Add todo for today as Buy Onions")
    //   .then((response) => {
    //     console.log("Command sent successfully:", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending command:", error);
    //   });
    setModalVisible(true);
    startListening();
  };
  useEffect(() => {
    if (!isListening && transcript) {
      stopListening();
      setModalVisible(true);
      sendCommand(transcript)
        .then((response) => {
          console.log("Command sent successfully:", response);
          router.push("/todos")
        })
        .catch((error) => {
          console.error("Error sending command:", error);
        });
    }
  }, [isListening, transcript]);
  return (
    <>
      <Tabs
        tabBar={(props) => (
          <View style={styles.bottomContainer}>
            <View style={styles.tabContainer}>
              <TabBar {...props} />
              <View style={styles.w12} />
              <HapticTab onPress={handleMicPress}>
                <LinearGradient
                  colors={["#5E4B36", "#C3A77D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.micIcon}
                >
                  <Mic width={25} height={25} stroke="#F1EFE7" />
                </LinearGradient>
              </HapticTab>
            </View>
          </View>
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="todos"
          options={{
            title: "Todos",
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: "Goals",
          }}
        />
        <Tabs.Screen
          name="finance"
          options={{
            title: "Finance",
          }}
        />
        {/* <Tabs.Screen
        name="more"
        options={{
          title: "More",
        }}
      /> */}
      </Tabs>
      {/* Modal for voice transcription */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Title */}
            <CustomText
              style={styles.modalTitle}
              color={"#342B20"}
              fontSize={24}
              variant={TextVariants.GROTESK_BOLD}
            >
              Jivi AI 🧬
            </CustomText>

            {/* Waveform */}
            <View style={styles.m14}>
              <VoiceWaveform isListening={isListening} />
            </View>
            {/* Transcript */}
            <View style={styles.transcriptWrapper}>
              <CustomText
                style={styles.transcriptText}
                color={"#7A6B47"}
                fontSize={18}
                variant={TextVariants.GROTESK_REGULAR}
              >
                Say the word, I'll make it happen!
              </CustomText>
            </View>

            {/* Stop Button */}
            <Pressable
              onPress={() => {
                stopListening();
                setModalVisible(false);
              }}
              style={styles.stopButton}
            >
              <Text style={styles.stopButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    bottom: 0,
    paddingHorizontal: 16,
    backgroundColor: "#E6E1D1",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  w12: { width: 12 },
  micIcon: {
    height: 72,
    width: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3A3228",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#F1EFE7",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#F1EFE7",
    padding: 16,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCD3BD",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    color: "#999",
  },
  modalTitle: {
    marginBottom: 16,
  },

  listeningText: {
    fontSize: 14,
    color: "red",
    marginBottom: 16,
  },
  transcriptWrapper: {
    padding: 12,
    borderRadius: 14,
    shadowColor: "#3A3228",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    width: "100%",
    minHeight: 30,
    justifyContent: "center",
  },
  transcriptText: {
    fontSize: 16,
    color: "#7A6B47",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "500",
  },
  stopButton: {
    backgroundColor: "#342B20",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  stopButtonText: {
    color: "#F1EFE7",
    fontWeight: "bold",
  },
  m14: {
    marginVertical: 24,
  },
});
