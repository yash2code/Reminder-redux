import React from 'react';
import {connect} from 'react-redux'
//import {bindActionCreators} from 'redux'
import moment from 'moment'
import {addReminder, deleteReminder} from '../actions'


class App extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	text:'',
	  	dueDate:''
	  };
	}

addReminder(){

		console.log('dueDate',this.refs.date.value);

		this.props.addReminder(this.refs.text.value,this.refs.date.value);

		this.refs.text.value='';

		this.refs.date.value='';
		

	}

	deleteReminder(id){

		this.props.deleteReminder(id);
			}

	renderReminders()

	{

		const {reminders} = this.props;

		

		return (
					<ul className="list-group">
					{

						reminders.map(reminder => 
						{

						   return (

										<li key={reminder.id} className="list-group-item list-group-item-action flex-column align-items-start">
										<h4 className="mb-1">{reminder.text} <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
										<button 
										type="button" 
										className="close" 
										aria-label="Close"
										onClick={()=>this.deleteReminder(reminder.id)} >
  											<span aria-hidden="true">&times;</span>
										</button>
										</h4>
										</li>
								   )
						}             )
					}
					</ul>

			)
	}

	

	render(){

					

		return(
				<div>
				<div className="row justify-content-center">
				<h1 className="display-3">
				Reminders
				</h1>
				</div><br/>
				<div className="row justify-content-center">
				<div className="form-inline">
				<div className="input-group input-group-lg">
				<input
				name="text"
				className="form-control" 
				placeholder="I need to do this...." 
				onChange={(event)=> this.setState({text:event.target.value})}
				ref="text"/>
				</div>
				<div className="input-group date input-group-lg">
  				<input type="text" 
  				className="form-control"
  				onChange={(event)=> this.setState({dueDate:event.target.value})}
  				ref="date"/>
  					<span className="input-group-addon"><i className="glyphicon glyphicon-th"></i></span>
				</div>
				</div>
				</div><br/>
				<div className="row justify-content-center">
				<div className="col-md-2">
				<button
				className="btn btn-primary btn-block"
				 onClick={()=>this.addReminder()}>
				Add this
				</button>
				</div>
				</div><br/>
				<div className="row justify-content-center">
								{this.renderReminders()}
				</div>

				</div>

			)
	}

	
}



	function mapStateToProps(state){

		console.log('state',state);

		return{

			reminders:state
		}
	}



export default connect(mapStateToProps,{addReminder,deleteReminder})(App);