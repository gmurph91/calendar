import React, {Component} from 'react';
import './App.css';
import Page from './pages/page'
import { Route } from 'react-router-dom' 
export default class App extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    this.getEvents()
  }

  getEvents = async () => {
    try {
      const promise = await fetch(`https://gregcalendarapi.herokuapp.com/get`)
      this.setState({
        promise: await promise.json()
      })
    } catch (e) {
      console.log(e)
    }
    this.getEvents2()
  }

  getEvents2 = () => {
    this.setState({
      events: [],
    })
      if (this.state.promise.length !== 0){
      var promise = this.state.promise;
      promise.map((event, i) => {
      const title = promise[i].title;
      const description = promise[i].description;
      const start = promise[i].start;
      const end = promise[i].end;
      const type = promise[i].type;
      const id = promise[i]._id;
      var Array = [{ start : start , end : end , title : title , description : description, type : type, id : id }]
      this.setState(prevState => ({
          events: [ ...this.state.events, ...Array ]
        })
          )
          return(event)
        })
    } else { setTimeout(this.componentDidMount, 2000);}}

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

  deleteEvent = async (id) => {
    try {
      const update = await fetch(`https://gregcalendarapi.herokuapp.com/delete/${id}`, {
        method: 'DELETE'
      })
      await update
      this.getEvents()
    } catch (err) {
      console.log(err)
    }
  }

 renderPage =  () => {
    return (
      <Page myEvents={this.state.events} saveNew={this.saveEvent} update={this.updateEvent} delete={this.deleteEvent} />
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