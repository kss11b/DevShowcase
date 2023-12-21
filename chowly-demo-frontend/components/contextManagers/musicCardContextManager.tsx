"use client";
import { useState, useEffect } from "react";
import classNames from "classnames";

import MusicCard from "../cards/musicCard";

// const context = new AudioContext();
// let context: AudioContext | null = null;
// if (typeof window !== "undefined") {
//   context = new AudioContext();
// }

// const context = new AudioContext

const MusicCardContextManager = () => {
  const [context, setContext] = useState(new AudioContext());
  return (
    context && (
      <>
        <MusicCard context={context} key={generateGUID()} />
        <MusicCard context={context} key={generateGUID()} />
        <MusicCard context={context} key={generateGUID()} />
      </>
    )
  );
};

// Need a more constant value for the key on each MusicCard
const generateGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default MusicCardContextManager;
