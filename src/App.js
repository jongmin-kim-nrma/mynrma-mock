import React from 'react';
import logo from './logo.svg';
import './App.css';
import FindBatteryByRego from './FindBatteryByRego';
import FindRegoByJobNumber from './FindRegoByJobNumber';

function App() {
  return (
    <div className="App container-fluid">
       <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />  
       <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={logo} className="App-logo" alt="logo" width={30} height={30} class="d-inline-block align-top" alt="NRMA Logo"/>
        Battery
      </a>
      <FindBatteryByRego />
      <FindRegoByJobNumber />
    </nav>
    <form>
        <div className="form-group">
          <div className="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Job number</span>
            </div>
            <input type="text" className="form-control" placeholder="Job number" aria-label="Job number" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2">Find</button>
            </div>
          </div>          
        </div>
      </form>
    </div>
  );
}

export default App;
