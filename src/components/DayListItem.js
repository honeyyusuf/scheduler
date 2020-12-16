import React from "react";
import "components/DayListItem.scss"
const classNames = require('classnames');
export default function DayListItem(props){
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (<li className={dayClass}onClick={()=>props.setDay(props.name)} data-testid="day">
    <h2>{props.name}</h2>
  <h3>{formatSpots(props.spots)}</h3>
  </li>);
}

const formatSpots = function(val){
  if(val === 0){
    return 'no spots remaining';
  }else if(val === 1){
    return "1 spot remaining";
  } else {
   return `${val} spots remaining`;
  }
}