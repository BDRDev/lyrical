import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Link } from 'react-router-dom';

import query from '../queries/fetchSongs';

class SongList extends Component {

	handleSongDelete = id => {

		console.log('props', this.props)

		this.props.mutate({
			variables: {
				id
			}
		}).then(() => 
			//automatically execute any queries associated with the component
			//runs fetchSongs query

			//use this approach vs the refetchQueries when the actual query is associated with the component
			//since the query is associated with the SongList component we can use this approach

			//we cannot in the song create because the query is not associated with that component, thus why we need to
			//use the refetchQueries in the mutate function
			this.props.data.refetch()
		)
	}	

	renderSongs = () => {
		if(this.props.data.songs)
			return this.props.data.songs.map(({ id, title }) => {
				return(
					
					<li className='collection-item' key={id}>
						<Link to={`/songs/${id}`} >
							{title}
						</Link>

						<i style={{cursor: 'pointer'}} className="material-icons right" onClick={() => this.handleSongDelete(id)} >
							delete
						</i>
					</li>
					
				)
			})
		else 
				return 'Loading...';
	}

	render(){
		console.log(this.props);
		return(
			<div>
				<ul className='collection'>{this.renderSongs()}</ul>
				<Link to='/songs/new' className='btn-floating btn-large red right'>
					<i className='material-icons'>add</i>
				</Link>
			</div>
		)
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID){
	  deleteSong(id:$id){
	    id
	  }
	}
`;

//this is how we "associate" a mutation/query with a component
export default graphql(mutation)(
	graphql(query)(SongList)
);