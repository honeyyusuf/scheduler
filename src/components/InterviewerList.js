import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList (props){
//const interviewers = Array.from();
const interViewer = props.interviewers && props.interviewers.map(inter=> {return(<InterviewerListItem 
key={inter.id} 
name={inter.name} 
avatar={inter.avatar} 
selected = {inter.id === props.value} 
setInterviewer={event => props.onChange(inter.id)} />)});
return (<section className="interviewers">
<h4 className="interviewers__header text--light">Interviewer</h4>
<ul className="interviewers__list">{interViewer}</ul>
</section>)
}