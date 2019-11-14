import React, {Component} from 'react';
import Calendar from 'react-calendar'
export default class Page extends Component {
    
        state = {
            date: new Date(),
            months: [],
            days: [],
        }

      onChange = value => this.setState({ value })

      mapEvents = (date) => {
        let events = this.props.events
        events.map((eventy, i) => {
        let event = this.props.events[i].date
        let eventMonth = new Date(event).getMonth()
        let eventDay = new Date(event).getDate()
        let month = new Date(date.date).getMonth()
        let day = new Date(date.date).getDate()
        console.log(events)
        if(month === eventMonth && day === eventDay) {console.log("It's a match!")}
        return eventy
      }
      
      )
    
  }

      mapEvents2 = (date) => {
          try{
        
        // const tileContent = ({ date, view }) => view === 'month' && date.getDate() === 13 ? <p>Event : Work is so fun</p> : null;
          } catch(e){
              console.log(e)
          }
    }

      render (){
        
        return (
            <div>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
              tileContent={this.mapEvents}
            />
            <div><button onClick={this.mapEvents}>Update</button></div>    
            </div>
              )}
    }