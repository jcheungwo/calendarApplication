import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeEvent, addEvent, updateEvent} from '../store'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

const numberEnding = {
  '1': 'st',
  '2': 'nd',
  '3': 'rd'
}

class Details extends Component {
  constructor() {
    super()
    this.state = {
      type: null,
      event: {}
    }
    this.newEvent = this.newEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.day !== nextProps.day) {
      this.setState({type: null})
    }
  }

  removeEvent(id) {
    this.props.deleteEvent(id)
    .catch(err => console.log(err))
  }

  addForm() {
    this.setState({type: 'add'});
  }

  newEvent(event) {
    this.props.addEvent(event)
    .then(() => this.setState({type: null}))
    .catch(err => console.log(err))
  }

  updateForm(event) {
    this.setState({
      type: 'update',
      event: event
    });
  }

  updateEvent(event) {
    this.props.updateEvent(event)
    .then(() => this.setState({type: null, event: {}}))
    .catch(err => console.log(err))
  }

  render() {
    if (this.props.day === 0) {
      return (
        <div>

        </div>
      )
    } else {
      let form;
      if (this.state.type === 'add') {
        form = <AddForm type={this.state.type} year={this.props.year} month={this.props.month} day={this.props.day} newEvent={this.newEvent} currentDay={this.props.currentDay}/>
      } else if (this.state.type === 'update') {
        form = <UpdateForm type={this.state.type} year={this.props.year} month={this.props.month} day={this.props.day} updateEvent={this.updateEvent} updateForm={this.updateForm} event={this.state.event}/>
      } else {
        form = <div></div>
      }
      let events = [];
      this.props.currentDay.map((event) => {
        events.push(
          <div key={event.id} className='event'>
            <div className='delete'>
              <button type='button' className='event-buttons' onClick={() => this.removeEvent(event.id)}>remove</button>
              <button type='button' className='event-buttons' onClick={() => this.updateForm(event)}>update</button>
            </div>
              <span>Name: {event.title}</span>
            <span>Time: {event.startTime} - {event.endTime}</span>
            <span>Location: {event.location}</span>
            <span>Description: {event.description}</span>
          </div>
        )
      })
      return(
        <div className='left-side'>
          {form}
          <div className='details'>
            <div className='events-header'>
              <h3 className='events'>Events for the {this.props.day}{numberEnding[this.props.day % 10] ? numberEnding[this.props.day % 10] : 'th'}</h3>
              <button className='add' type='button' onClick={() => this.addForm()}>Add</button>
            </div>
            {
              events.map((event) => {
                return event
              })
            }
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentDay: state.events.currentDay
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: function(id) {
      return dispatch(removeEvent(id));
    },
    addEvent: function(event) {
      return dispatch(addEvent(event))
    },
    updateEvent: function(event) {
      return dispatch(updateEvent(event))
    }
  }
}

const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(Details)
export default DetailsContainer;