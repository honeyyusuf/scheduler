import React, { useState,useEffect } from "react";


import "components/Application.scss";
import DayList from "components/DayList";

import Appointment from "components/Appointment";

import {getAppointmentsForDay , getInterview,getInterviewersForDay} from "helpers/selectors"
const axios = require('axios');


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const dailyInterviewer = getInterviewersForDay(state,state.day);
  //console.log(dailyInterviewer);
  // const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
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
      .then((res) => setState((prev) => ({ ...prev, appointments })));
    //console.log(appointments);
  }
const setDay = (day) => {
  setState(prev => ({ ...prev, day }));
}
const api = {GET_DAYS:" http://localhost:8001/api/days",
GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
GET_INTERVIEWERS: "http://localhost:8001/api/interviewers"}

  useEffect(() => {
    
    
      //console.log(response.data);
      //setDays(response.data);
      Promise.all([
        axios.get(api.GET_DAYS),
        axios.get(api.GET_APPOINTMENTS),
        axios.get(api.GET_INTERVIEWERS),
      ]).then((all) => {
        state.days=all[0].data;
        state.appointments = all[1].data;
        state.interviewers=all[2].data;
       
        setState(prev => ({...prev, first: all[0].data, second: all[1].data,third: all[2].data}));
        
        //  setState(prev => ({...prev, setDays: all[0].data}));
         //console.log(val);
          
        // const set second: all[1].data,  }));
        // const [first, second, third] = all;
      
        // console.log(first.data, second.data, third);

      });
      
    
  },[state.day]);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
      className="sidebar--centered"
      src="images/logo.png"
    alt="Interview Scheduler"
      />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
    <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
    appointments={state.appointments}
    /> </nav>
    <img
     className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
      </section>
      <section className="schedule">
      
       {dailyAppointments.map((appointment) => {
         const interview =   getInterview(state, appointment.interview);
         
        
        return (<Appointment
            key={appointment.id} id={appointment.id} time={appointment.time} interview={interview}
            interviewers = {dailyInterviewer}
            bookInterview = {bookInterview}
            />)
       })}
      </section>
    </main>
  );
}
