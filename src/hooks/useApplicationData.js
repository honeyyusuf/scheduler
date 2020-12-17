import { useState, useEffect } from "react";
import { getspots, deletespot } from "helpers/selectors"
import axios from "axios";
export default function useApplicationData(intitial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  }

  const api = {
    GET_DAYS: "/api/days",
    GET_APPOINTMENTS: "/api/appointments",
    GET_INTERVIEWERS: "/api/interviewers"
  }
  useEffect(() => {
    ///////////axiso call/////////////
    Promise.all([
      axios.get(api.GET_DAYS),
      axios.get(api.GET_APPOINTMENTS),
      axios.get(api.GET_INTERVIEWERS),
    ]).then((all) => {

      const [days, appointments, interviewers] = all;
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))



    }).catch((error) => console.log(error));


  }, []);
  ///////// used to book interview/////////
  function bookInterview(id, interview, edit) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //////updating the spot////////
    const newstate = { ...state, appointments }

    const days = state.days.map((day) => {
      if (day.name === state.day && appointment.id === id) {
        return getspots(newstate, state.day, edit)
      } else {
        return day;
      }
    }
    );



    ////////// axios put to add new appointments ///////////
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {

        setState((prev) => ({ ...prev, appointments, days }))


      })


  }

  /////////function that takes in the id to cancle appointment/////////
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newstate = { ...state, appointments }

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return deletespot(newstate, state.day)
      } else {
        return day;
      }
    }
    );

    ///////////// axios delete to update api///////////
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        setState((prev) => ({ ...prev, appointments, days })))


  }
  return { state, setDay, bookInterview, cancelInterview };
}