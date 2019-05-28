//React
import React from 'react';
import ReactDOM from 'react-dom';


//my Components
import App from './components/App';

//for apollo

//making requests for data - storing locally when the request comes back
import { ApolloClient } from 'apollo-client';
//glue layer between ApolloClient and the React App.
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql'
})

//dataIdFromObject -> takes every piece of data that is fetched from the Apollo Client backend and
//runs is through this function - what is returned is used to identify that data inside the Apollo Client

//every query must return an id

//makes it so we do not have to make another request to get the new data -> we only need to make the one mutation request

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	dataIdFromObject: o => o.id
})

//sets App as a child of the Provider Component. This is what allows all components to access the store
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.querySelector('#root')
);

