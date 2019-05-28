import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import SongList from './SongList'; 
import SongCreate from './SongCreate';
import SongDetail from './SongDetail';

class App extends Component {

	render(){
		
		return(
			<div className='container'>
				<BrowserRouter>
					<Route path='/' component={SongList} exact /> 
					<Route path='/songs/new' component={SongCreate} exact />
					<Route path='/songs/:id' component={SongDetail} exact />
				</BrowserRouter>
			</div>
		)
	}
}

export default App;




