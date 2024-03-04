import { useState } from 'react';
import './styles.css'

const  WeekdayList = (props) =>  {
  const [currentDate, setCurrentDate] = useState(new Date());

  function getWeekdays(date) {
    const weekdays = [];
    date = new Date(date);
    date.setDate(date.getDate() - date.getDay())
    for (let i = 0; i < 7; i++) {
      weekdays.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return weekdays;
  }

  function handlePrevWeek(){
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  }

  function handleNextWeek(){

    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  }
  const TrainingButton = (properties) => {
    return (
      <button className = "btn btn-outline-dark m-1" onClick = {() => props.onDayFieldClick(properties.training)}>
        {properties.textField(properties.training)}
      </button>
    )
  }

  function handleTrainingPlanField(date){ // todo: view all
    const filtered = props.plans.filter((plan => plan.plannedDate === formatDate(date)))
    if(filtered.length > 0) {
      return (
        filtered.map((plan) => (<div><TrainingButton training = {plan} textField = {planTextField}/></div>))
      )
    } return 'Rest day'
  }
  function planTextField(plan) {
    return 'Plan: ' + plan.trainingType + ' / ' + plan.name
  }

  function handleTrainingRealizationField(date){
    const filtered = props.realizations.filter((realization => realization.realizationDate === formatDate(date)))
    if(filtered.length > 0) {
        return(
          filtered.map((realization) => ( <div><TrainingButton training = {realization} textField = {realizationTextField}/></div> ))
        )
    } return 'No realization'
  }
  function realizationTextField(realization) {
    return 'Realization: ' + realization.type + ' / ' + realization.name + ' / ' + realization.distanceInMeters
  }

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  return (
    <div>
      <button className = "btn btn-outline-success m-2" onClick={() => handlePrevWeek()}>Previous Week</button>
      <button className = "btn btn-outline-success m-2" onClick={() => handleNextWeek()}>Next Week</button>
      <ul className = "list-group">
        {getWeekdays(currentDate).map((day, index) => (
          <li className = "weekdays-list" key={index}>
            <div className = "row">
              <div className = "col">{day.toDateString()}</div>
              <div className = "col">
                {handleTrainingPlanField(day)}
              </div>
              <div className = "col">
                {handleTrainingRealizationField(day)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeekdayList