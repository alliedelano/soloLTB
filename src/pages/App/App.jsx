import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import Feed from '../Feed/Feed';
import AdminPage from '../AdminPage/AdminPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import MenuPage from '../MenuPage/MenuPage'
import AddJumpPage from '../AddJumpPage/AddJumpPage'
import WeatherPage from '../WeatherPage/WeatherPage'
import MyJumpsPage from '../MyJumpsPage/MyJumpsPage'
import SingleJumpPage from '../SingleJumpPage/SingleJumpPage'



function App() {

  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null})
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          {userService.getUser() ? 
            <> 
             <Switch>
                <Route exact path="/">
                  <MenuPage user={user} handleLogout={handleLogout} />
                </Route>
                <Route exact path="/DZfeed">
                  <Feed user={user} handleLogout={handleLogout}/>
                </Route>
                <Route exact path="/newjump">
                  <AddJumpPage user={user}/>
                </Route>
                <Route exact path="/weather">
                  <WeatherPage user={user} handleLogout={handleLogout}/>
                </Route>
                <Route exact path="/myjumps">
                  <MyJumpsPage user={user} handleLogout={handleLogout} />
                </Route>
                <Route exact path="/admin">
                  <AdminPage user={user}/>
                </Route>
                <Route exact path="/jumps/:jumpId">
                  <SingleJumpPage user={user} handleLogout={handleLogout}/>
                </Route>
                <Route exact path="/:username">
                  <ProfilePage user={user} handleLogout={handleLogout} />
                </Route>
                
            </Switch>
            </>
            :
            <Redirect to='/login'/>
          }
      </Switch>
    </div>
  );
}

export default App;
