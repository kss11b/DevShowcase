"use client";
import { useState, useEffect, useMemo } from "react";
import SimpleDropdown from "@/components/inputs/dropdown";

type AudioSettings = {
  oscillator: OscillatorNode;
  gain: GainNode;
  wave: OscillatorType;
  // frequency: number;
  octave: number;
  note: string;
};

enum WaveTypes {
  sine = "sine",
  square = "square",
  triangle = "triangle",
  sawtooth = "sawtooth",
  custom = "custom",
}

type Octave = {
  C: number;
  CSharp: number;
  D: number;
  EFlat: number;
  E: number;
  F: number;
  FSharp: number;
  G: number;
  GSharp: number;
  A: number;
  BFlat: number;
  B: number;
};

const notes: Octave[] = [
  {
    C: 261.6,
    CSharp: 277.2,
    D: 293.7,
    EFlat: 311.1,
    E: 329.6,
    F: 349.2,
    FSharp: 370.0,
    G: 392.0,
    GSharp: 415.3,
    A: 440.0,
    BFlat: 466.2,
    B: 493.9,
  },
  {
    C: 523.3,
    CSharp: 554.4,
    D: 587.3,
    EFlat: 622.3,
    E: 659.3,
    F: 698.5,
    FSharp: 740.0,
    G: 784.0,
    GSharp: 830.6,
    A: 880.0,
    BFlat: 932.3,
    B: 987.8,
  },
];

export default function MusicCard({ context }: { context: AudioContext | null }) {
  const [playing, setPlaying] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettings | null>(null);

  const selectedNotes: Octave = typeof audioSettings?.octave === "number" ? notes[audioSettings?.octave] : notes[0];

  // Values for note dropdown
  const noteSelection = useMemo(
    () => Object.keys(selectedNotes).map((note: string) => ({ name: note, value: note })),
    [audioSettings?.octave]
  );

  // On load create an oscillator, gain, and other properties. Then set these values into audioSettings
  useEffect(() => {
    if (!playing) {
      setupAudioContext(context, audioSettings, setAudioSettings);
    }
  }, []);

  // TODO: Determine if we want to store and work with frequency separately
  // const noteSelection = useMemo(() => {
  //   const selectedNotes: Octave = notes[audioSettings?.octave || 0];
  //   return Object.entries(selectedNotes).map(([key, value]) => {
  //     console.log(key, value);
  //     return { name: key, value: value };
  //   });
  // }, [audioSettings?.octave]);

  return (
    <>
      <div className='w-full justify-items-center'>
        <div className='bg-gray-700 rounded px-8 pt-6 pb-6 mb-8'>
          <button
            className='px-4'
            onClick={() => {
              if (playing) {
                reInitializeAudio(playing, context, audioSettings, setAudioSettings);
              }
              setPlaying(flipPlaying(context, audioSettings, playing));
            }}
          >
            {playing ? "Stop" : "Play"}
          </button>

          <SimpleDropdown
            name={audioSettings ? audioSettings?.wave : "Wave"}
            setValue={(value: OscillatorType) => {
              if (audioSettings) {
                reInitializeAudio(playing, context, { ...audioSettings, wave: value }, setAudioSettings);
              }
            }}
            options={[
              { name: "Sine", value: WaveTypes.sine },
              { name: "Square", value: WaveTypes.square },
              { name: "Triangle", value: WaveTypes.triangle },
              { name: "Sawtooth", value: WaveTypes.sawtooth },
            ]}
          />
          <SimpleDropdown
            name={audioSettings?.note ? String(audioSettings?.note) : "Note"}
            setValue={(value: string) => {
              if (audioSettings) {
                reInitializeAudio(playing, context, { ...audioSettings, note: value }, setAudioSettings);
              }
            }}
            options={noteSelection}
          />
          <SimpleDropdown
            name={typeof audioSettings?.octave === "number" ? `Octave ${audioSettings?.octave + 1}` : "Octave"}
            setValue={(value: number) => {
              if (audioSettings) {
                reInitializeAudio(playing, context, { ...audioSettings, octave: value }, setAudioSettings);
              }
            }}
            options={[
              { name: "Octave 1", value: 0 },
              { name: "Octave 2", value: 1 },
            ]}
          />
        </div>
      </div>
    </>
  );
}

const setupAudioContext = (
  context: AudioContext | null,
  audioSettings: AudioSettings | null,
  setAudioSettings: (audioSettings: AudioSettings) => void
) => {
  if (context) {
    const selectedNotes = notes[audioSettings?.octave || 0];
    const o = context?.createOscillator();
    const g = context?.createGain();
    const defaultFrequency = 523.3;
    o.type = audioSettings?.wave || WaveTypes.sine;
    // o.frequency.value = audioSettings?.frequency || 440;
    o.frequency.value = selectedNotes[(audioSettings?.note as keyof Octave) || "C"] || defaultFrequency;
    o.detune.value = Math.random() * 3;
    o.connect(g);
    g.connect(context.destination);
    // FIXME: This is causing a click on stop
    // g.gain.exponentialRampToValueAtTime(0.3, context.currentTime + 0.04);

    setAudioSettings({
      oscillator: o, // Sound object
      gain: g, // Volume
      wave: audioSettings?.wave || WaveTypes.sine, // Wave shape
      // frequency: audioSettings?.frequency || 440, // Hz
      octave: audioSettings?.octave || 0, // index
      note: audioSettings?.note || "C",
    });
  }
};

const flipPlaying = (context: AudioContext | null, audioSettings: AudioSettings | null, playing: boolean) => {
  if (audioSettings) {
    const { oscillator } = audioSettings;
    if (playing) {
      // our reinitialize function already stops the tone
      // softStop(oscillator, gain, context);
    } else {
      oscillator.start();
    }
  }
  return !playing;
};

// TODO: parameters expanding rapidly on these functions, which will require a minor rework (This function may not even be necessary)
const reInitializeAudio = (
  playing: boolean,
  context: AudioContext | null,
  audioSettings: AudioSettings | null,
  setAudioSettings: (audioSettings: AudioSettings) => void
) => {
  if (audioSettings) {
    const { oscillator, gain } = audioSettings;
    setupAudioContext(context, audioSettings, setAudioSettings);
    if (playing) {
      softStop(oscillator, gain, context);
    }
  }
};

// Delayed cleanup to prevent abrupt sound cutoff
const softStop = (oscillator: OscillatorNode, gain: GainNode, context: AudioContext | null) => {
  if (context) {
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
    }, 100);
  }
};
