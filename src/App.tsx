import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/Home';
import NewVehicle from './views/NewVehicle';
import Vehicles from './views/Vehicles';
import Details from './views/Details';

const clerkPubKey = 'pk_test_c3VtbWFyeS1kYW5lLTUwLmNsZXJrLmFjY291bnRzLmRldiQ';

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/sign-in/*'
					element={<SignIn routing='path' path='/sign-in' />}
				/>
				<Route
					path='/sign-up/*'
					element={<SignUp routing='path' path='/sign-up' />}
				/>
				<Route path='/new' element={<NewVehicle />} />
				<Route path='/vehicles' element={<Vehicles />} />
				<Route path='/details/:id' element={<Details />} />
			</Routes>
			<ToastContainer />
		</ClerkProvider>
	);
}

function App() {
	return (
		<BrowserRouter>
			<ClerkProviderWithRoutes />
		</BrowserRouter>
	);
}

export default App;
