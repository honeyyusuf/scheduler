import { useState,useEffect } from "react";
import {getspots,deletespot} from "helpers/selectors"
import axios from "axios";
export default function useApplicationData(intitial){
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
const setDay = (day) => {
  setState(prev => ({ ...prev, day }));
}

const api = {GET_DAYS:" http://localhost:8001/api/days",
GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
GET_INTERVIEWERS: "http://localhost:8001/api/interviewers"}
useEffect(() => {
    
  Promise.all([
    axios.get(api.GET_DAYS),
    axios.get(api.GET_APPOINTMENTS),
    axios.get(api.GET_INTERVIEWERS),
  ]).then((all) => {
    const [days, appointments, interviewers] = all;
    setState(prev => ({...prev, days: days.data, appointments:appointments.data,interviewers: interviewers.data}))
    
    

  }).catch((error)=>console.log(error));
  

},[]);

function bookInterview(id, interview) {
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const newstate = {...state,appointments}
    
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return getspots(newstate,state.day)
      }else{
        return day;
      }
    }
    );
   

  
  
return axios
    .put(`/api/appointments/${id}`, appointment)
  .then((res) => {
 
  setState((prev) => ({ ...prev, appointments,days}))

  //setState(prev => ({ ...prev, day }));

})
  .catch((error)=>console.log(error));
  //console.log(appointments);
}
const cancelInterview = (id)=>{
  const appointment = {...state.appointments[id],
    interview:null};
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const newstate = {...state,appointments}
    
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return deletespot(newstate,state.day)
      }else{
        return day;
      }
    }
    );
   
  console.log(appointments);
  return axios
    .delete(`/api/appointments/${id}`)
    .then(() => 
     setState((prev) => ({ ...prev, appointments,days})))
     .catch((error)=>console.log(error));

}
return {state,setDay,bookInterview,cancelInterview};
}