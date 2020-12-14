
export function getAppointmentsForDay(state, day) {

  
  // let appos = [];
  // const filteredApp = state.days.filter(user => user.name === day);
  // if(filteredApp.length !== 0){
  //   let appID = filteredApp[0].appointments;
 
  //   appID.forEach(element => {
  //     if(state.appointments[element]){
  //     appos.push(state.appointments[element]);
  //     }
  //   });
   //}
  
  //return appos;
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound){
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId=>state.appointments[appointmentId]);
  return appointments;
};

export function getInterview(state,interview){
  //takes in two value
  // check if the interview is not null
  // go
  
  if (interview) {
    for( let val in state.interviewers ){
    if(Number(val) === interview.interviewer){
      interview.interviewer = state.interviewers[val];
      
      return interview;
      
    }
   
   }  
  
  } else {
  return null;
  }
 };

 export function getInterviewersForDay(state,day){
   const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound){
    return [];
  }
  
  const Interviewers = dayFound.interviewers.map(interviewerId=>state.interviewers[interviewerId]);
  console.log(Interviewers);
  return Interviewers;
 }