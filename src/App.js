import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Link
} from "react-router-dom";
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from './components/Login';
import HashLoader  from "react-spinners/HashLoader";
import Messages from './components/Messages';

function App() {

  const [user, loading] = useAuthState(auth);

  if( loading ){
    return (
      <AppLoading>
        <AppLoadingContent>
          <HashLoader color="#3f0f40" size={50} />
        </AppLoadingContent>
      </AppLoading>
    );
  }

  return (
    <div className="App">
        <Router>
          {!user ? (
            <Login />
          ): (
            <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
                <Route path="/messages" exact>
                    <Messages />
                </Route>
              </Switch>
            </AppBody>
          </>
          )}
        </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > svg {
    padding: 20px;
    margin-bottom: 40px;
  }
`;