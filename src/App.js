import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import ViewData from "./components/view-data.component";
import IngestData from "./components/ingest-data.component";

class App extends Component {
    render()
    {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">View Ad Data</Link>
                        <Link to="/ingestData" className="navbar-brand">Ingest Ad Data</Link>
                    </nav>

                <Route path="/" exact component={ViewData}/>
                <Route path="/ingestData" component={IngestData}/>

                </div>
            </Router>
        );
    }
}

export default App;
