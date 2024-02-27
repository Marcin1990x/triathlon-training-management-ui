import { useState } from 'react';
import './styles.css'

export default function WeekdayList(trainingPlans, trainingRealizations) {
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

  function handleTrainingPlanField(date){
    
    const found = trainingPlans.find((plan => plan.plannedDate === formatDate(date)))
    if(found) {
      return 'Plan: ' + found.name + ' / ' + found.description
    } return ''
  }

  function handleTrainingRealizationField(date){
    
    const found = trainingRealizations.find((realization => realization.realizationDate === formatDate(date)))
    if(found) {
      return 'Realization: ' + found.name + ' / ' + found.distanceInMeters
    } return ''
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
          <li className = "list-group-item" key={index}>
            <div className = "row">
              <div className = "col">{day.toDateString()}</div>
              <div className = "col">
                <div className="box">{handleTrainingPlanField(day)}</div>
              </div>
              <div className = "col">
                <div className = "box">{handleTrainingRealizationField(day)}</div>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}