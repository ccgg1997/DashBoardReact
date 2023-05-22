import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar'
import {Login} from './components/Login/Login'
import { useSelector } from 'react-redux';


function App() {
  
  const { isAuthenticated } = useSelector(state => state.auth);

  const isAuthorized = isAuthenticated;
  return (
    <div className="App">
      {!isAuthorized && <Login />}
      {isAuthorized && (
        <div className="AppGlass">
          <Sidebar />
          <MainDash />
          <RightSide />
          <div></div>
        </div>
      )}
    </div>
  );
}

export default App;
