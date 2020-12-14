import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [hist , sethist] = useState([]);
  
   const transition = (val, replace = false) => {
     //const newaction = [...mode,val];
     setMode(val);
     if(!replace){
     sethist([mode,...hist,val]);
     
     } else {
      sethist([mode,...hist.slice(0,hist.length-1),val])
     }

  }

  const back = () => {
   
    //sethist()
    sethist(hist => {
      let newhist = [...hist]
      if(newhist.length !== 0){
      newhist = newhist.slice(0,newhist.length-1);
      //newhist.pop();
      setMode(newhist[newhist.length-1])
      return newhist;
      }
    });
    
    
  }
  return {mode,transition,back};
}