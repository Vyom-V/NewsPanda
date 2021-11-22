import './App.css';
import NavBar from './components/NavBar';
import React from 'react';
import Newscomp  from './components/Newscomp';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
// constructor(props) {
//   super(props);

//   state = {
//   };
// }
const [progress, setprogress] = useState(0);

const setProgress = (progressin)=>{
  setprogress(progressin)
}

 const pageSize=5;
 const apiKey=process.env.REACT_APP_APIKEY;

    return <div>
       <Router>
      <NavBar/>
      <LoadingBar
        height={4}
        color='#f11946'
        progress={progress}
      />
      <Switch>  
        {/* only router doesnt re render or mount the same component with differnt prop values so use exact and a differnt key value*/}
          <Route exact path="/"><Newscomp setProgress={setProgress} apiKey={apiKey} key="general" pagesize={pageSize} country={"in"} cata={"general"} /></Route>
          <Route exact path="/science"><Newscomp setProgress={setProgress} apiKey={apiKey} key="science" pagesize={pageSize} country={"in"} cata={"science"} /></Route>
          <Route exact path="/business"><Newscomp setProgress={setProgress} apiKey={apiKey} key="business" pagesize={pageSize} country={"in"} cata={"business"} /></Route>
          <Route exact path="/entertainment"><Newscomp setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize={pageSize} country={"in"} cata={"entertainment"} /></Route>
          <Route exact path="/health"><Newscomp setProgress={setProgress} apiKey={apiKey} key="health" pagesize={pageSize} country={"in"} cata={"health"} /></Route>
          <Route exact path="/sports"><Newscomp setProgress={setProgress} apiKey={apiKey} key="sports" pagesize={pageSize} country={"in"} cata={"sports"} /></Route>
          <Route exact path="/technology"><Newscomp setProgress={setProgress} apiKey={apiKey} key="technology" pagesize={pageSize} country={"in"} cata={"technology"} /></Route>

        </Switch>
      </Router>
    </div>;
  
}

export default App;