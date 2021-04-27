import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Details from './views/Details';
import Edit from './views/Edit';
import Home from './views/Home';
import MakeBlog from './views/MakeBlog';


/* ***Update CLIENT_ROUTES in SERVER when paths are added*** */
const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			< Navbar />
			<main className="container justify-content-center bg-secondary col-sm-11 col-md-11 col-lg-11 shadow rounded my-5 p-2">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/details/:id">
						<Details />
					</Route>
					<Route exact path="/edit/:id">
						<Edit />
					</Route>
					<Route exact path="/add/">
						<MakeBlog />
					</Route>
				
				</Switch>
			</main>
		</BrowserRouter>
	)
};

interface AppProps {}


export default App;
