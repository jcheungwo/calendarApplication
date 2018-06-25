import React, { Component } from 'react'
import { connect } from 'react-redux'
import Week from './Week'
import {fetchEvents, removeEvent, setCurrentDay} from '../store'
import Details from './Details'

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

const monthNames = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

class Month extends Component {
  constructor() {
    let date = new Date()
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayOfWeek = date.getDay();
    let day = date.getDate();
    super();
    this.state = {
      date: day,
      month,
      year,
      dayOfWeek,
      day: 0,
    }
    this.showDay = this.showDay.bind(this);
  }

  componentDidMount() {
    this.props.getEvents()
    .catch(err => console.log(err))
  }

  showDay(day) {
    this.setState({day})
  }

  setNextMonth() {
    let nextMonth = this.state.month + 1;
    if (nextMonth !== 13) {
      this.setState({
        month: nextMonth,
        date: 1,
        dayOfWeek: new Date(this.state.year + '-' + nextMonth + '-1').getDay()
      })
    } else {
      this.setState({
        month: 1,
        year: this.state.year + 1,
        date: 1,
        dayOfWeek: new Date(`${this.state.year + 1}-1-1`).getDay()
      })
    }
  }

  setPreviousMonth() {
    let prevMonth = this.state.month - 1;
    if (prevMonth !== 0) {
      this.setState({
        month: prevMonth,
        date: 1,
        dayOfWeek: new Date(this.state.year + '-' + prevMonth + '-1').getDay()
      })
    } else {
      this.setState({
        month: 12,
        year: this.state.year - 1,
        date: 1,
        dayOfWeek: new Date(`${this.state.year - 1}-12-1`).getDay()
      })
    }
  }

  render() {
    let {date, month, year, dayOfWeek} = this.state
    let length = 6;
    dayOfWeek -= date - Math.floor(date / 7) * 7 - 1;
    dayOfWeek = (dayOfWeek + 7) % 7;
    if (36 - dayOfWeek > monthDays[month]) {
      length--
    }
    if (29 - dayOfWeek > monthDays[month]) {
      length--;
    }
    let week = [
      <Week key={1} start='1' day={dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>,
      <Week key={2} start={8 - dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>,
      <Week key={3} start={15 - dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>,
      <Week key={4} start={22 - dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>,
      <Week key={5} start={29 - dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>,
      <Week key={6} start={36 - dayOfWeek} year={year} month={month} length={length} detailDay={this.state.day} showDay={this.showDay}/>
    ]
    week.length = length;
    return (
      <div className='calendar'>
        <Details className='details' day={this.state.day} year={this.state.year} month={this.state.month}/>
        <div className='right-side'>
          <div className='calendar-header'>
            <button className='month-buttons' type='button' onClick={() => this.setPreviousMonth()}>Previous</button>
            <h2 className='calendar-month-year'>{monthNames[month]} / {year}</h2>
            <button className='month-buttons' type='button' onClick={() => this.setNextMonth()}>Next</button>
          </div>
          <table>
            <tbody>
              <tr className='days'>
                <th>sunday</th>
                <th>monday</th>
                <th>tuesday</th>
                <th>wednesday</th>
                <th>thursday</th>
                <th>friday</th>
                <th>saturday</th>
              </tr>
              {
                week.map((row) => {
                  return row;
                })
              }
            </tbody>
          </table>
          </div>
      </div>
  )}
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getEvents: function() {
      return dispatch(fetchEvents())
    }
  }
}

const MonthContainer = connect(mapStateToProps, mapDispatchToProps)(Month)
export default MonthContainer;
