import { useEffect, useRef, useState } from "react";
import Voice from "@react-native-voice/voice";

/**
 * Custom hook for handling voice-to-text functionality using the `@react-native-voice/voice` library.
 *
 * This hook manages the state of voice recognition, including starting and stopping
 * the listening process, capturing partial and final speech results, and handling errors.
 *
 * It also includes a mechanism to stop listening automatically after a period of silence.
 *
 * @returns {Object} - An object containing:
 *   - `transcript`: The current recognized speech as a string.
 *   - `isListening`: A boolean indicating if voice recognition is active.
 *   - `startListening`: A function to start the voice recognition process.
 *   - `stopListening`: A function to stop the voice recognition process.
 */

export const useVoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const lastSpokenAt = useRef(Date.now());
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
    };

    Voice.onSpeechPartialResults = (e) => {
      const partial = e.value?.[0];
      if (partial) {
        setTranscript(partial);
        lastSpokenAt.current = Date.now();

        // Reset the timer whenever speech is detected
        if (silenceTimer.current) clearTimeout(silenceTimer.current);

        silenceTimer.current = setTimeout(() => {
          const timeSinceLastSpeech = Date.now() - lastSpokenAt.current;
          if (timeSinceLastSpeech >= 2000) {
            stopListening(); // 🔥 Stop if silence for 1.5s
          }
        }, 2000);
      }
    };

    Voice.onSpeechResults = (e) => {
      console.log("Final Results:", e.value);
      const result = e.value?.[0];
      if (result) setTranscript(result);
    };

    Voice.onSpeechError = (e) => {
      // console.error("Voice Error:", e);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
    };
  }, []);

  const startListening = async () => {
    try {
      setTranscript("");
      setIsListening(true);
      lastSpokenAt.current = Date.now();
      await Voice.start("en-US");
    } catch (e) {
      console.error("Start error:", e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error("Stop error:", e);
    }
    setIsListening(false);
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
  };

  return { transcript, isListening, startListening, stopListening };
};
