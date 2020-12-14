import React, { useState,useEffect } from "react";

const axios = require('axios');
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
  //console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
return axios
    .put(`/api/appointments/${id}`, appointment)
  .then((res) => {
  console.log(state,appointments);
  setState((prev) => ({ ...prev, appointments }))
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
  console.log(appointments);
  return axios
    .delete(`/api/appointments/${id}`)
    .then(() => 
     setState((prev) => ({ ...prev, appointments})))
     .catch((error)=>console.log(error));

}
return {state,setDay,bookInterview,cancelInterview};
}