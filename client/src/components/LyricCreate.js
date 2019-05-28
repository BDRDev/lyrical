import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {

	state = { content: '' }

	handleChange = e => {
		this.setState({
			content: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault();

		

		this.props.mutate({
			variables: {
				content: this.state.content,
				songId: this.props.songId
			}
		}).then(() => {

			
		});

		this.setState({
			content: ''
		});
		
	}

	render(){

		return(
			<form onSubmit={this.handleSubmit} >
				<label>Add a lyric</label>
				<input value={this.state.content} onChange={this.handleChange} />
			</form>
		)
	}
}

const mutation =  gql`
	mutation addLyriToSong($content:String, $songId:ID){
	  addLyricToSong(content:$content, songId:$songId){
		id, 
	    title, 
	    lyrics {
	    	id
	      	content,
	      	likes
	    }
	  }
	}
`

export default graphql(mutation)(LyricCreate);