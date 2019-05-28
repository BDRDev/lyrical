import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricList extends Component {

	handleLike = (id, likes) => {

		//optimistic response - graphql updates the correct data with the optimistic response
		//this is to prevent the little 'lag' from when we issue te request and we get the request back
		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		});

	}

	renderLyrics = () => {
		return this.props.lyrics.map(({ id, content, likes }) => {
			return (
				<li key={id} className="collection-item" style={{display: 'flex', justifyContent: 'space-between'}}>
					{content}

					<span style={{display: 'flex', alignItems: 'center'}}>
						<i 
							style={{cursor: 'pointer', marginRight: 9}} 
							className="material-icons"
							onClick={() => this.handleLike(id, likes)}
						>
							thumb_up
						</i>

						
						Likes: {likes}
					</span>
					
				</li>
			)
		})
	}

	render(){

		return(
			<ul className="collection">
				{this.renderLyrics()}
			</ul>
		)
	}
}

const mutation = gql`
	mutation likeLyric($id:ID){
	  likeLyric(id:$id){
	    id,
	    likes,
	    content
	  }
	}
`

export default graphql(mutation)(LyricList);