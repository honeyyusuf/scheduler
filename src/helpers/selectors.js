
export function getAppointmentsForDay(state, day) {

  ///////// get the appointments for day /////////
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound){
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId=>state.appointments[appointmentId]);
  console.log(appointments)
  return appointments;
  
};
////////////// get the interview info using the interview id ////////
export function getInterview(state,interview){
  
  let interInfo = {};
  if (interview) {
  for( let val in state.interviewers ){
   
    if(Number(val) === interview.interviewer){
  
      interInfo.student = interview.student
      interInfo.interviewer = state.interviewers[interview.interviewer]
    
      
    }
   
   }  
  
  } else {
    interInfo = null;
    
  }
  return interInfo;
 };
///////////// get the interview for a day ///////////
 export function getInterviewersForDay(state,day){
   const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound){
    return [];
  }
  
  const Interviewers = dayFound.interviewers.map(interviewerId=>state.interviewers[interviewerId]);
  
  return Interviewers;
 }