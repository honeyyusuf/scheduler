import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error"
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode"

export default function Appointment (props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const ERROR = "ERROR";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  //const HEADER = "HEADER";
  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

    
  );
  
  


 const save =(name,interviewer) =>{
  if(name && interviewer){
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  (props.bookInterview(props.id,interview))
  .then(()=> transition(SHOW))
  .catch(()=> transition(ERROR))

  } 
}
const deleteInterview = () => {
  console.log("confirme clicked")
  transition(DELETING);
   props.cancelInterview(props.id).then(()=> transition(EMPTY)).catch(()=> transition(ERROR))

}

const confirm = () => transition(CONFIRM);
const edit = () => transition(EDIT);

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
      onDelete = {confirm}
      onEdit = {edit}
      />) 
      
  }
  {
   mode === CREATE && 
   (<Form
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
  {
    mode === DELETING  && (<Status 
      message = "Deleting Appointment" />)
  }
  {
    mode === CONFIRM && (<Confirm
    message = "Are sure you would like to cancel the appointment?"
    onConfrim = {deleteInterview}
    onCancel={back}/>)
  }
  {
    mode === EDIT && (<Form
    
      student={props.interview.student}
      interviewers = {props.interviewers}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={back}

    />)
  }
  </article>
)
 



  





}
