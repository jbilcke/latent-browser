import React, { useEffect, useState, ReactNode } from 'react'
import Icon from 'react-material-symbols/rounded'
import 'regenerator-runtime/runtime' // required by react-speech-recognition it seems
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
  onChange,
  onSubmit,
}: {
  children?: ReactNode
  language?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
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
    onSubmit?.(transcript)
  }

  useEffect(() => {
    console.log('transcript: ', transcript)
    onChange?.(transcript)
  }, [transcript])

  return isReady ? (
    <button
      className="flex items-center justify-center hover:bg-gray-600/20 p-1 rounded-full"
      onTouchStart={handleStart}
      onMouseDown={handleStart}
      onTouchEnd={handleEnd}
      onMouseUp={handleEnd}
      type="button"
    >
      {children ? (
        children
      ) : (
        <>
          <Icon
            icon="mic"
            size={24}
            fill={listening}
            grade={-25}
            weight={200}
            color="#212124"
          />
        </>
      )}
    </button>
  ) : undefined
}
