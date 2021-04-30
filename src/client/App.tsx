import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/Navbar';
import Details from './views/Details';
import Edit from './views/Edit';
import Home from './views/Home';
import MakeBlog from './views/MakeBlog';
import Donate from './views/Donate';
import About from './views/About';

const stripe = loadStripe('pk_test_51IlEIPKUQjcfOGB9gbIe2Jz4U9alt6JgOPXG1GTFBUlKTYn5CICB1WOUQ8H2uqQKgfjFlp7UlHhNWT0dBX78ZJ1o00ed6JdgZw');

/* ***Update CLIENT_ROUTES in SERVER when paths are added*** */
const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			< Navbar />
			<main className="container justify-content-center align-items-center bg-secondary col-sm-11 col-md-11 col-lg-11 shadow-lg rounded my-5 p-2">
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
					<Route exact path="/about/">
						<About />
					</Route>
					<Route exact path="/donate/">
						<Elements stripe={stripe}>
							<Donate />
						</Elements>
					</Route>

				</Switch>
			</main>
		</BrowserRouter>
	)
};

interface AppProps { }


export default App;
