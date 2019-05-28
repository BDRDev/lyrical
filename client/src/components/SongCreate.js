import React, { Component } from 'react';

//how we write queries and mutations 
import gql from 'graphql-tag';
//integrates GraphQL with our React App 
import { graphql } from 'react-apollo';

import { Link } from 'react-router-dom';

import query from '../queries/fetchSongs';


class SongCreate extends Component {
	state={ title: '' };

	handleChange = e => {
		

		this.setState({
			title: e.target.value
		})
	}

	// https://codesandbox.io/s/5v4kyx4m5p

	// https://codesandbox.io/s/5xvkk4ok3x

	handleSubmit = e => {
		e.preventDefault();

		this.props.mutate({
			//variable to inject into the mutation
			variables: {
				title: this.state.title
			},
			//reruns queries when the mutation is successful
			refetchQueries: [{ query }]
		}).then(() => {
			//runs when the mutation was successfull

			this.props.history.push('/')

		}).catch(() => {
			//when the mutation fails
			//handles errors from the backend
		})

		this.setState({
			title : ''
		})
	}

	render(){
		return(
			<div>
			<Link to='/'>Back</Link>
				<h3>Create a New SONG</h3>
				<form onSubmit={this.handleSubmit}>
					<label>Enter a Song Title</label>
					<input value={this.state.title} onChange={this.handleChange}/>
					<button>Submit</button>
				</form>
			</div>
		)
	}
}

const mutation = gql`

	mutation AddSong($title: String){
		addSong(title: $title){
			id,
			title
		}
	}

`;

//this is how we "associate" a mutation/query with a component
export default graphql(mutation)(SongCreate);