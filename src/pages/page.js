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
  constructor(props) {
    super(props);
  this.state = {
    view: "month",
    date: new Date(),
    events: [],
    title: "",
    description: "",
    start: "",
    end: "",
    type: "",
  };
  this.handleSubmit= this.handleSubmit.bind(this);
}

  addEvent = async (event) => {
    await(this.setState({event}))
    console.log(this.state)
    this.props.saveNew({
      title:this.state.title, 
      description:this.state.description, 
      start:new Date(this.state.start),
      end:new Date(this.state.end),
      type:this.state.type
    })}

toggleView = () => {
  if(this.state.view === "month"){
    this.setState({ view: "agenda" })
  } else {
    this.setState({ view:"month" })
  }
}
handleSubmit(event) {
  event.preventDefault();
  this.setState({ 
    title: this.element.value, 
    description: this.element2.value,
    start: this.element3.value, 
    end: this.element4.value, 
    type: this.element5.value,  
  });
  this.addEvent(event)
}

eventStyleGetter = (event) => {
  if (event.type === "Appointment"){
  var style = {
      backgroundColor: '#CC3546'
  };
  return {
      style: style
  };
} if (event.type === "Meeting"){
  var style2 = {
      backgroundColor: '#00A9A5'
  };
  return {
      style: style2
  };
} if (event.type === "Reminder"){
  var style3 = {
      backgroundColor: '#FFBA49'
  };
  return {
      style: style3
  };
} if (event.type === "Task"){
  var style4 = {
      backgroundColor: '#7FB069'
  };
  return {
      style: style4
  };
}
}

eventSelected = (event) => {
  try{
  if(event.id === "5dd2e29828b9a80017fe4701"){
    console.log(event.id)
  return(
  <Popup
        open
        modal
      >
        <span>
        <form onSubmit={this.handleSubmit}>
        <label>Title
          <input type="text" ref={el => this.element = el} />
        </label>
        <label>Description
          <input type="text" ref={el2 => this.element2 = el2} />
        </label>
        <label>Start date
          <input type="text" ref={el3 => this.element3 = el3} />
        </label>
        <label>End date
          <input type="text" ref={el4 => this.element4 = el4} />
        </label>
        <label>Event type
          <input type="text" ref={el5 => this.element5 = el5} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </span>
      </Popup>
  )}} catch(e){ console.log(e)}}

  render() {
    let myEvents = this.props.myEvents
    
    const Modal = () => (
      <div>
      <Popup
        trigger={<button className="newEvent">New Event</button>}
        modal
      >
        <span>
        <form onSubmit={this.handleSubmit}>
        <label>Title
          <input type="text" ref={el => this.element = el} />
        </label>
        <label>Description
          <input type="text" ref={el2 => this.element2 = el2} />
        </label>
        <label>Start date
          <input type="text" ref={el3 => this.element3 = el3} />
        </label>
        <label>End date
          <input type="text" ref={el4 => this.element4 = el4} />
        </label>
        <label>Event type
          <input type="text" ref={el5 => this.element5 = el5} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </span>
      </Popup>
      </div>
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
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={(this.eventStyleGetter)}
          tooltipAccessor={"tooltip"}
        />
        {this.eventSelected()}
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
