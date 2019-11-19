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
    open: false,
    open2: false,
  };
  this.handleSubmit= this.handleSubmit.bind(this);
  this.handleUpdate= this.handleUpdate.bind(this);
  this.handleSelect= this.handleSelect.bind(this);
}

toggleView = () => {
  if(this.state.view === "month"){
    this.setState({ view: "agenda" })
  } else {
    this.setState({ view:"month" })
  }
}

handleSelect = ({start,end}) => {
  this.setState({
    open2: true,
    start: start,
    end: end,
  })
}

handleSubmit(event) {
  event.preventDefault();
  this.setState({ 
    title: this.element.value, 
    description: this.element2.value,
    start: this.element3.value, 
    end: this.element4.value, 
    type: event.target[4].value,
    open: false,
    open2: false,
  });
  this.addEvent(event)
}
addEvent = async (event) => {
  await(this.setState({event}))
  this.props.saveNew({
    title:this.state.title, 
    description:this.state.description, 
    start:new Date(this.state.start),
    end:new Date(this.state.end),
    type:this.state.type
  })}


handleUpdate(event) {
  event.preventDefault();
  try{
  this.setState({ 
    title: event.target[0].value, 
    description: event.target[1].value,
    start: event.target[2].value, 
    end: event.target[3].value, 
    type: event.target[4].value, 
    open: false,
    open2: false
  });
  this.updateEvent(event)
} catch(e){
  console.log(e)
}}
updateEvent = async (event) => {
  await(this.setState({event}))
  this.props.update({
    id:this.state.id,
    title:this.state.title, 
    description:this.state.description, 
    start:new Date(this.state.start),
    end:new Date(this.state.end),
    type:this.state.type
  })}

  deleteEvent = () => {
    let id=this.state.id;
    this.props.delete(id)
    this.setState({ 
      open: false,
      open2: false,
    });
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
    this.setState({
      open: true,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      type: event.type,
      id: event.id
    })
  }

  reset = () =>{
    this.setState({
      open: false,
      open2: false
    })
  }

  render() {
    let myEvents = this.props.myEvents
    
    const Modal = () => (
      <Popup
        trigger={<button className="newEvent">New Event</button>}
        modal
        onClose={this.reset}
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
        <label>Event Type
        <select>
            <option value="Appointment">Appointment</option>
            <option value="Reminder">Reminder</option>
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
            <option value="Other">Other</option>
          </select>
          </label>
        <input type="submit" value="Submit" />
      </form>
        </span>
      </Popup>
    );
    const Modal2 = () => (
      <Popup
        open = {this.state.open2}
        modal
        onClose={this.reset}
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
          <input type="text" defaultValue = {this.state.start} ref={el3 => this.element3 = el3} />
        </label>
        <label>End date
          <input type="text" defaultValue = {this.state.end} ref={el4 => this.element4 = el4} />
        </label>
        <label>Event Type
        <select>
            <option value="Appointment">Appointment</option>
            <option value="Reminder">Reminder</option>
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
            <option value="Other">Other</option>
          </select>
          </label>
        <input type="submit" value="Submit" />
      </form>
        </span>
      </Popup>
    );
    const UpdateModal = () => (
    <Popup
        open = {this.state.open}
        modal
        onClose={this.reset}
      >
        <span>
        <form onSubmit={this.handleUpdate}>
        <label>Title
          <input type="text" defaultValue = {this.state.title} ref={el => this.element = el} />
        </label>
        <label>Description
          <input type="text" defaultValue = {this.state.description} ref={el2 => this.element2 = el2} />
        </label>
        <label>Start date
          <input type="text" defaultValue = {this.state.start} ref={el3 => this.element3 = el3} />
        </label>
        <label>End date
          <input type="text" defaultValue = {this.state.end} ref={el4 => this.element4 = el4} />
        </label>
        <label>Event Type
        <select>
            <option value="Appointment">Appointment</option>
            <option value="Reminder">Reminder</option>
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
            <option value="Other">Other</option>
          </select>
          </label>
        <input type="submit" value="Update" />
        <input type="button" value="Delete" onClick={this.deleteEvent}/>
      </form>
        </span>
      </Popup>
    )
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
          onSelectSlot={this.handleSelect}
          selectable
        />
        <UpdateModal />
        <Modal2 />
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
    this.props.onNavigate(action)
  }
}
export default Page;
