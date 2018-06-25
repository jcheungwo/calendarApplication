import React, { Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'

const monthDays = {
  '1': 31,
  '2': 28,
  '3': 31,
  '4': 30,
  '5': 31,
  '6': 30,
  '7': 31,
  '8': 31,
  '9': 30,
  '10': 31,
  '11': 30,
  '12': 31
}

class Week extends Component {
  constructor(props) {
    super();
    this.state = {
      start: Number(props.start),
      dayOfTheWeek: props.day,
      month: props.month,
      length: props.length,
      showDay: props.showDay,
      detailDay: props.detailDay
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      start: Number(nextProps.start),
      dayOfTheWeek: nextProps.day,
      month: nextProps.month,
      length: nextProps.length,
      showDay: nextProps.showDay,
      detailDay: nextProps.detailDay
    })
  }

  render() {
    let {start, dayOfTheWeek, month, length, showDay, detailDay} = this.state
    let days = [];
    for (let i = 0; i < dayOfTheWeek; i++) {
      days.push(' ')
    }
    for (let i = start; days.length < 7 && i <= monthDays[month]; i++) {
      days.push(i);
    }
    if (days.length % 7 !== 0 && start !== 1) {
      let remaining = 7 - days.length % 7 
      for (let i = 0; i < remaining; i++) {
        days.push(' ')
      }
    }
    let key = 0;
    let className = 'data' + length;
    return(
      <tr className={className}>
        {
          days.map((day) => {
          return (  
            <Day key={key++} day={day} month={month} year={this.props.year} showDay={showDay} detailDay={detailDay}/>
          )
        })}
      </tr>
    )
  }
}

export default Week;