import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Suspense, lazy, useState} from 'react';
import ProtectedRoute from './protectedRoutes';
import store from './store';
import { Provider } from 'react-redux';

const SignIn = lazy (() => import ('./components/signin'))
const SignUp = lazy (() => import ('./components/signup'))
const Forgot = lazy (() => import ('./components/forgot'))
const Home = lazy  (() => import("./components/home"));

function App() {
  const [uname,setUname] = useState()
  const [user,setLoginUser] = useState()

  // componentDidMount(){
  //   store.dispatch(loadUser());
  // }

  return (
    <div>
      <Provider store = {store}>
        <BrowserRouter>
          <Suspense fallback = {
            <div><center><h1>Loading...</h1></center></div>
            } >
              <Routes>
                <Route path="/" element ={
                  <div>
                    <SignIn setUname={setUname} setLoginUser={setLoginUser} />
                  </div>
                } />
                <Route path="/signup" element ={
                  <div>
                    <SignUp />
                  </div>
                } />
                <Route path="/forgot" element ={
                  <div>
                    <Forgot />
                  </div>
                } />

                <Route element = {<ProtectedRoute auth = {user}/>}>
                  <Route path="/home" element={ 
                          <div>
                            <Home name = {uname} />
                          </div>
                        } 
                      />
                </Route> 
              </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;