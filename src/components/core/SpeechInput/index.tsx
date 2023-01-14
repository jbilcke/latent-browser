import React, { useEffect, useState, ReactNode } from 'react'

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

/*
We don't care about polyfills.. yet

import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
const appId = '<INSERT_SPEECHLY_APP_ID_HERE>'
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition)
*/

// https://webspeechrecognition.com/react-speech-recognition

export const SpeechInput = ({
  children,
  language,
}: {
  children?: ReactNode
  language?: string
}): JSX.Element => {
  const [isReady, setReady] = useState<boolean>(false)
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition()

  const handleStart = () => {
    resetTranscript()
    SpeechRecognition.startListening({
      continuous: true,
      language,
    })
  }
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Browser doesn't support speech recognition.")
      return
    }
    setReady(true)
  }, [])

  const handleEnd = () => {
    SpeechRecognition.stopListening()
  }

  useEffect(() => {
    console.log('transcript: ', transcript)
  }, [transcript])

  return isReady ? (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={handleStart}
        onMouseDown={handleStart}
        onTouchEnd={handleEnd}
        onMouseUp={handleEnd}
      >
        {children}
      </button>
    </div>
  ) : undefined
}
