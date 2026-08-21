/** Browser text-to-speech helpers for vocabulary pronunciation */

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  console.log(voices)
  if (!voices.length) return null;

  return (
    voices.find((v) => v.lang === "en-US" && /natural|neural|google|premium/i.test(v.name)) ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en-")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

export function speakWord(
  word: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): void {
  if (!canSpeak()) {
    options?.onError?.();
    return;
  }

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  utter.rate = 0.9;
  utter.pitch = 1;

  const voice = pickEnglishVoice();
  if (voice) utter.voice = voice;

  utter.onstart = () => options?.onStart?.();
  utter.onend = () => options?.onEnd?.();
  utter.onerror = () => options?.onError?.();

  // Some browsers load voices async — retry once if empty
  if (!window.speechSynthesis.getVoices().length) {
    window.speechSynthesis.onvoiceschanged = () => {
      const delayed = pickEnglishVoice();
      if (delayed) utter.voice = delayed;
      window.speechSynthesis.speak(utter);
      window.speechSynthesis.onvoiceschanged = null;
    };
    // Fallback if voices never fire
    window.setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        window.speechSynthesis.speak(utter);
      }
    }, 150);
    return;
  }

  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}
