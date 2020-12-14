import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment (props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const ERROR = "ERROR";
  //const HEADER = "HEADER";
  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

    
  );
  
  


 const save =(name,  interviewer) =>{
  if(name && interviewer){
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  Promise.resolve(props.bookInterview(props.id,interview))
  .then(()=> transition(SHOW)).catch(error=> console.log(error))

  } 
}

return (
  <article className="appointment">
  <Header time={props.time}/>
  
  {mode === EMPTY &&
  (<Empty 
    onAdd={() => transition(CREATE)} 
  />)
  }
  {
    mode === SHOW && (
      
     <Show
     
      student={props.interview.student}
      interviewer={props.interview.interviewer}

      />)
  }
  {
   mode === CREATE && 
   (<Form
      
      //onSave= {props.onSave}
      interviewers = {props.interviewers}
      onCancel={back}
      onSave={save}
      />)
  }
  {
    mode === SAVING && (<Status message="Saving Appointment"
    onCancel={back}/>)
  }
  {
    mode === ERROR &&
    (<Error
      message="Error Appointment"
      onCancel={back}/>)
  }
  </article>
)
 



  





}
