// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrescriptionRequest from './components/PrescriptionRequest';
import MedicalRecords from './components/MedicalRecords';

function App() {
  return (
    <Router>
      <div>
        <h1>Healthcare Records</h1>
        <nav>
          <a href="/">Login</a> | 
          <a href="/register">Register</a> | 
          <a href="/dashboard">Dashboard</a> | 
          <a href="/prescription-request">Prescription Request</a> | 
          <a href="/medical-records">Medical Records</a>
        </nav>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/prescription-request" component={PrescriptionRequest} />
          <Route path="/medical-records" component={MedicalRecords} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
