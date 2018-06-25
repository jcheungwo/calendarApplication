import React, { Component } from 'react'
import { connect } from 'react-redux'

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title,
      startTime: props.event.startTime,
      endTime: props.event.endTime,
      location: props.event.location,
      description: props.event.description
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.event.title,
      startTime: nextProps.event.startTime,
      endTime: nextProps.event.endTime,
      location: nextProps.event.location,
      description: nextProps.event.description
    })
  }

  combineInfo() {
    let day = this.props.day;
    let month = this.props.month;
    let year = this.props.year;
    let updatedEvent = {
      ...this.state,
      startYear: year,
      endYear: year,
      startMonth: month,
      endMonth: month,
      startDay: day,
      endDay: day,
      id: this.props.event.id
    }
    this.props.updateEvent(updatedEvent);
  }

  nameChange(event) {
    event.preventDefault();
    this.setState({title: event.target.value});
  }

  startChange(event) {
    event.preventDefault();
    this.setState({startTime: event.target.value});
  }

  endChange(event) {
    event.preventDefault()
    this.setState({endTime: event.target.value});
  }

  locationChange(event) {
    event.preventDefault()
    this.setState({location: event.target.value});
  }

  descriptionChange(event) {
    event.preventDefault()
    this.setState({description: event.target.value});
  }

  render() {
    return (
      <div>
        <form id='add'>
          <div className='add-form'>
            <div className='add-form-header'>
              <h3 className='add-event'>Update Event</h3>
              <button type="button" className="add" onClick={(event) => this.combineInfo(event)}>Submit</button>
            </div>
          </div>
          <label>
            Name: <input type="text" value={this.state.title} name="name" onChange={(event) => this.nameChange(event)}/>
          </label>
          <label>
            Start: <input type="text" value={this.state.startTime} name="startTime" onChange={(event) => this.startChange(event)}/>
          </label>
          <label>
            End: <input type="text" value={this.state.endTime} name="endTime" onChange={(event) => this.endChange(event)}/>
          </label>
          <label>
            Location: <input type="text" value={this.state.location} name="location" onChange={(event) => this.locationChange(event)}/>
          </label>
          <span>Description:</span>
        </form>
        <textarea
          rows="6"
          cols="40"
          name="description"
          form="add"
          value={this.state.description}
          onChange={(event) => this.descriptionChange(event)}
        >
        </textarea>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const UpdateFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateForm)
export default UpdateFormContainer;
