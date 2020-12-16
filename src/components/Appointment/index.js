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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE ="ERROR_DELETE";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  //const HEADER = "HEADER";
  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

    
  );
  
  


  function save(name, interviewer) {
    if(name&&interviewer){
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  
    }
  }
function destroy(event) {
  transition(DELETING, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }

const confirm = () => transition(CONFIRM);
const edit = () => transition(EDIT);

return (
  <article className="appointment" data-testid="appointment" >
    
  <Header time={props.time}/>
  
  {mode === EMPTY &&
  (<Empty 
    onAdd={() => transition(CREATE)} 
  />)
  }
  {
      
    mode === SHOW && (
      
     <Show
      //interview={props.interview}
      student = {props.interview.student}
      interviewer = {props.interview.interviewer}
      // interviewers = {props.interviewers}
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
    mode === SAVING && (<Status message="Saving"
    onCancel={back}/>)
  }
  {
    mode === ERROR_DELETE &&
    (<Error
      message="Appointment can not be deleted."
      onCancel={back}/>)
  }
  {
    mode === DELETING  && (<Status 
      message = "Deleting" />)
  }
  {
    mode === CONFIRM && (<Confirm
    message = "Are you sure you would like to delete?"
    onConfirm = {destroy}
    onCancel={back}/>)
  }
  {
    mode === EDIT && (<Form
      name = {props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers = {props.interviewers}
      
      onSave={save}
      onCancel={back}

    />)
  }
  {
    mode === ERROR_SAVE && (<Error
    message="Appoimemt can not be saved."/>)
  }
  
  </article>
)
 



  





}
