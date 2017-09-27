var Appointments = React.createClass({
  getInitialState: function() {
    return {
      appointments: this.props.appointments,
      title: 'Team Standup',
      appt_time: 'Tomorrow at 9am'
    }
  },

  handleUserInput: function(obj) {
    this.setState(obj);
  },

  handleFormSubmit: function() {
    var appointment = {title: this.state.title, appt_time: this.state.appt_time};
    $.post('/appointments', 
            {appointment: appointment})
          .done(function(data){
            this.addNewAppointment(data);
          }.bind(this));
  },

  addNewAppointment: function(appointment) {
    // Push is React's way of mutating a copy of the data without changing the original
    var appointments = React.addons.update(this.state.appointments, { $push: [appointment]});
    this.setState({ 
      appointments: appointments.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  },

  render: function() {
    return (
      <div>
        <AppointmentForm input_title={this.state.title} 
          input_appt_time={this.state.appt_time}
          onUserInput={this.handleUserInput} 
          onFormSubmit={this.handleFormSubmit}/>
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
});