import React, {Component} from 'react';
import axios from 'axios';

export default class IngestData extends Component {

    constructor(props) {
        super(props);

        this.onChangeCsvToIngest = this.onChangeCsvToIngest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            csvToIngest: ''
        }
    }

    onChangeCsvToIngest(e) {
        this.setState({
            csvToIngest: e.target.value
        });
    }

    csvJSON(csv){

        var lines=csv.split("\n");

        var result = [];

        var headers=lines[0].split(",");

        for(var i=1;i<lines.length;i++){

            var obj = {};
            var currentline=lines[i].split(",");

            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        return JSON.stringify(result);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`ingest form submitted`);

        for (let clickSum in this.csvJSON(this.state.csvToIngest)) {
            const clickSumToIngest = {
                sourceName: clickSum.get("sourceName"),
                productName: clickSum.get("productName"),
                dateIngested: new Date()
            }

            axios.post('http://localhost:4000/clicksums/ingest', clickSumToIngest)
                .then(res => console.log(res.data));
        }

        this.setState({
            csvToIngest: ''
        })
    }

    render() {
        return (
            <div>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="file"
                           value={this.state.csvToIngest}
                           onChange={this.onChangeCsvToIngest}
                           />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Ingest CSV" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}