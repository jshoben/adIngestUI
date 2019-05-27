import React, {Component} from 'react';
import axios from 'axios';

export default class ViewData extends Component {

    constructor(props) {
        super(props);

        this.onChangeSourceSelection = this.onChangeSourceSelection.bind(this);
        this.onChangeProductSelection = this.onChangeProductSelection.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sourceSelection: '',
            productSelection: '',
            resultData: ''
        }
    }

    onChangeSourceSelection(e) {
        this.setState({
            sourceSelection: e.target.value
        });
    }

    onChangeProductSelection(e) {
        this.setState({
            productSelection: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`view form submitted`);

        axios.get('http://localhost:4000/clicksums/' + this.state.sourceSelection + '/' + this.state.productSelection)
            .then(response => {
                this.setState({resultData : response.data});
            })
            .catch(function (err) {
                console.log(err);
            })

        this.setState({
            sourceSelection: '',
            productSelection: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Source: </label>
                        <br/>
                        <input type="text"
                               value={this.state.sourceSelection}
                               onChange={this.onChangeSourceSelection}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product: </label>
                        <br/>
                        <input type="text"
                               value={this.state.productSelection}
                               onChange={this.onChangeProductSelection}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="View Data" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    Total Clicks:  { this.state.resultData.totalClicks }
                </div>
            </div>
        )
    }
}