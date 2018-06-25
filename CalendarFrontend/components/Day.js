import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeEvent, setCurrentDay } from '../store'
import { sortByTime } from '../../utils/functions'

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      thisDate: new Date(),
      currentDay: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let day = this.state.thisDate.getDate();
    let month = this.state.thisDate.getMonth() + 1;
    let year = this.state.thisDate.getFullYear();
    let events = nextProps.allEvents.filter((event) => {
      if (event.startYear !== nextProps.year || event.startMonth !== nextProps.month || event.startDay !== nextProps.day) {
        return false;
      }
      return true;
    })
    events = sortByTime(events);
    let currentDay = nextProps.day === day && nextProps.month === month && nextProps.year === year;
    this.setState({
      events,
      currentDay
    });
  }

  showDay() {
    this.props.setCurrent(this.props.day)
    this.props.showDay(this.props.day)
  }

  render() {
    let {key, day, detailDay} = this.props;
    let info = day === detailDay ? this.props.currentDay : this.state.events;
    let className = this.state.currentDay ? 'highlight' : null;
    return (
        <th key={key} className={className}>
          <button className='days' type='button' onClick={() => this.showDay()}>
            <span className='day-number'>
              {day}
            </span>
            {
              info.map((event) => {
                return (
                  <span key={event.id}>
                    {event.title} ({event.startTime} - {event.endTime})
                  </span>
                )
              })
            }
          </button>
        </th>
    )
  }
}

function mapStateToProps(state) {
  return {
    allEvents: state.events.allEvents,
    currentDay: state.events.currentDay
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: function(id) {
      return dispatch(removeEvent(id));
    },
    setCurrent: function(day) {
      return dispatch(setCurrentDay(day));
    }
  }
}

const DayContainer = connect(mapStateToProps, mapDispatchToProps)(Day)
export default DayContainer;