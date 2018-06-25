import axios from 'axios'
import { sortByTime } from '../../utils/functions'

const ADD_EVENT = 'ADD_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';
const SET_CURRENT_DAY = 'SET_CURRENT_DAY';

const initialState = {
  allEvents: [],
  currentDay: []
};

const add = event => ({type: ADD_EVENT, event});
const remove = id => ({type: REMOVE_EVENT, id});
const update = event => ({type: UPDATE_EVENT, event});
const get = events => ({type: GET_EVENTS, events});
export const setCurrentDay = day => ({type: SET_CURRENT_DAY, day});


export const addEvent = (event) =>
  dispatch =>
    axios.post('/api/events', event)
    .then((res) => res.data)
    .then((newEvent) => {
      console.log(newEvent)
      return dispatch(add(newEvent))
    })
    .catch(err => console.log(err))

export const removeEvent = (id) =>
  dispatch =>
    axios.delete(`/api/events/${id}`)
    .then(() => {
      return dispatch(remove(id))
    })
    .catch(err => console.log(err))

export const updateEvent = (event) => 
  dispatch =>
    axios.put(`/api/events/${event.id}`, event) 
    .then((res) => res.data)
      .then((updatedEvent) => {
        return dispatch(update(event))
      })
      .catch(err => console.log(err))

export const fetchEvents = () =>
  dispatch =>
    axios.get('/api/events')
    .then(res => res.data)
    .then(events => {
      return dispatch(get(events))
    })
    .catch(err => console.log(err))

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case ADD_EVENT:
      return {currentDay: [...state.currentDay, action.event], allEvents: [...state.allEvents, action.event]};
    case REMOVE_EVENT:
      return {currentDay: state.currentDay.filter(event => event.id !== action.id), allEvents: state.allEvents.filter(event => event.id !== action.id)};
    case UPDATE_EVENT:
      let newState = {...state};
      return {
        currentDay: sortByTime(newState.currentDay.filter((event) => event.id !== action.event.id).concat([action.event])),
        allEvents: newState.allEvents.filter((event) => event.id !== action.event.id).concat([action.event])
      }
    case GET_EVENTS:
      return {...state, allEvents: action.events};
    case SET_CURRENT_DAY:
      return {...state, currentDay: sortByTime(state.allEvents.filter((event) => event.startDay === action.day))}
  }
}