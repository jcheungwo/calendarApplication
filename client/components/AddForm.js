import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      startTime: '',
      endTime: '',
      location: '',
      description: ''
    }
  }
  
  combineInfo() {
    let day = this.props.day;
    let month = this.props.month;
    let year = this.props.year;
    let newEvent = {
      ...this.state,
      startYear: year,
      endYear: year,
      startMonth: month,
      endMonth: month,
      startDay: day,
      endDay: day,
    }
    this.props.newEvent(newEvent);
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
              <h3 className='add-event'>Add Event</h3>
              <button type="button" className="add" onClick={(event) => this.combineInfo(event)}>Submit</button>
            </div>
          </div>
          <label>
            Name: <input type="text" name="name" placeholder="required" onChange={(event) => this.nameChange(event)} required/>
          </label>
          <label>
            Start: <input type="text" name="startTime" placeholder="hh:mm required" onChange={(event) => this.startChange(event)} required/>
          </label>
          <label>
            End: <input type="text" name="endTime" placeholder="hh:mm required" onChange={(event) => this.endChange(event)} required/>
          </label>
          <label>
            Location: <input type="text" name="location" placeholder="optional" onChange={(event) => this.locationChange(event)}/>
          </label>
          <span>Description:</span>
        </form>
        <textarea
          rows="6"
          cols="40"
          name="description"
          form="add"
          placeholder="add a description"
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

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(AddForm)
export default AddFormContainer;
