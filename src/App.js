import React from 'react';
import logo from './logo.svg';
import './App.css';
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
       <link
        rel="stylesheet"
        href="https://services.mynrma.com.au/mynrma/styles/nrma-sc.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />  
       <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={logo} className="App-logo" alt="logo" width={30} height={30} class="d-inline-block align-top" alt="NRMA Logo"/>
          Search Service Provider
      </a>
    </nav>   
    <FindRegoByJobNumber />
    </div>
  );
}

export default App;
