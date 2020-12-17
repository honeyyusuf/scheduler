import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (val, replace = false) => {

    setMode(val);
    if (!replace) {
      setHistory(prev => ([...prev, val]));

    } else {

      setHistory(prev => ([...prev.slice(0, history.length - 1), val]))
    }

  }

  const back = () => {


    if (history.length > 1) {
      setHistory(prev => [...prev].slice(0, -1));
      setMode(history[history.length - 2])
    } else {
      setMode(initial);
      setHistory(initial);
    }


  }
  return { mode, transition, back };
}