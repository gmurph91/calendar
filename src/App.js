import React, {Component} from 'react';
import './App.css';
import Page from './pages/page'
import { Route } from 'react-router-dom' 

export default class App extends Component {
  state = {
    events: [],
    fetched: false,
  }

  componentDidMount() {
    this.getEvents()
    this.setState({
      fetched: true,
    })
  }

  getEvents = async () => {
    try {
      const promise = await fetch(`https://gregcalendarapi.herokuapp.com/get`)
      this.setState({
        events: await promise.json()
      })
    } catch (e) {
      console.log(e)
    }}

  saveEvent = async (event) => {
    try {
      const apiCall = await fetch(`https://gregcalendarapi.herokuapp.com/post`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await apiCall
      this.getEvents()
    } catch (e) {
      console.log(e)
    }
  }

  updateEvent = async (event) => {
    try {
      let id = event.id
      const update = await fetch(`https://gregcalendarapi.herokuapp.com/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await update
      this.getEvents()
    } catch (err) {
      console.log(err)
    }
  }

  deleteEvent = async (event) => {
    try {
      let id = event.id
      const update = await fetch(`https://gregcalendarapi.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await update
      this.getEvents()
    } catch (err) {
      console.log(err)
    }
  }

 renderPage =  () => {
    return (
      <Page fetched ={this.state.fetched} events={this.state.events} saveNew={this.saveEvent} update={this.updateEvent} delete={this.deleteEvent} />
    )
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={this.renderPage} />
      </div>
    );
  }
}