import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "reactjs-popup";

const localizer = momentLocalizer(moment)

class Page extends Component {
  state = {
    view: "month",
    date: new Date(),
    events: [],
    title: "",
    description: "",
    eventDate: "",
    type: "",
  };

  addEvent = () => {
    this.props.saveNew({
      title:this.state.title, 
      description:this.state.description, 
      date:new Date(this.state.eventDate),
      type:this.state.type
    })}

toggleView = () => {
  if(this.state.view === "month"){
    this.setState({ view: "agenda" })
  } else {
    this.setState({ view:"month" })
  }
}
  

  render() {
    let myEvents = this.props.myEvents
    const Modal = () => (
      <Popup
        trigger={<button className="newEvent">New Event</button>}
        modal
        closeOnDocumentClick = {false}
        closeOnEscape = {false}
        backdrop="static"
        keyboard={ false }
      >
        <span>
        <form>
            <label htmlFor="title">Title:</label>
            <input id="title" type="text" value={this.state.title} onChange={(event)=>{
              this.setState({
                title: event.target.value
              })
            }}/>
            <label htmlFor="description">Description:</label>
            <input id="description" type="text" value={this.state.description} onChange={(event)=>{
              this.setState({
                description: event.target.value
              })
            }}/>
            <label htmlFor="date">Date:</label>
            <input id="date" type="text" value={this.state.eventDate} onChange={(event)=>{
              this.setState({
                eventDate: event.target.value
              })
            }}/>
            <label htmlFor="type">Type:</label>
            <input id="type" type="text" value={this.state.type} onChange={(event)=>{
              this.setState({
                type: event.target.value
              })
            }}/>
            <input type="button" onClick={this.addEvent} value="Submit"/>
            </form>
        </span>
      </Popup>
    );
    return (
      <div className="main">
          <Modal />
          <button className="listView" onClick={() => { this.toggleView() }}>List View</button>
        <Calendar
          components = {{toolbar : CustomToolbar}}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={myEvents}
          step={60}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          style={{ height: "93.5vh" }}
        />
        <div className="below"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div></div>
      </div>
      
    );
  }
}
class CustomToolbar extends Toolbar {

  render() {
    
    return (
      <div className='calendarHeader'>
          <button type="button" onClick={() => this.navigate('PREV')}>Previous</button>
          <button type="button" onClick={() => this.navigate('NEXT')}>Next</button>
        <h1>{this.props.label}</h1>
      </div>
    );
  }

  navigate = action => {
    console.log(action);
    
    this.props.onNavigate(action)
  }
}
export default Page;