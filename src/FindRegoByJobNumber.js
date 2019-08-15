import React, {Component} from 'react';
import axios from 'axios';

const batteryLocation = [
  { 
    "id": "1",
    "totaltime" : "20 Mins",
    "totalkm" : "4 Km",
    "vehicle":
      {
      "SP_ID": "1234",
      "ADDRESS": "2 GEORGE ST, PARRAMATTA, 2150",
      "TIME": "20 Mins",
      "DISTANCE": "4 Km"
      },
    "hub":
      {
      "SP_ID": "",
      "ADDRESS": "",
      "TIME": "",
      "DISTANCE": ""
      },
    "customer":
      {
      "ADDRESS": "1 HAPPY STREET, SYDNEY, 2000",
      }   
    },
    {
      "id": "2",
      "totaltime" : "54 Mins",
      "totalkm" : "11 Km",
      "vehicle":
        {
        "SP_ID": "1235",
        "ADDRESS": "21 GEORGE ST, AUBURN, 2170",
        "TIME": "20 Mins",
        "DISTANCE": "4 Km"
        },
      "hub":
        {
        "SP_ID": "1234",
        "ADDRESS": "3 GOOD ST, REDFERN, 2150",
        "TIME": "34 Mins",
        "DISTANCE": "7 Km"
        },
      "customer":
        {
        "ADDRESS": "1 HAPPY STREET, SYDNEY, 2000",
        } 
      },
  ];

class OnJobNumberSubmit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {      
      event.preventDefault();   

      const header = {          
        'x-api-key': "ZT7muC1s485C5DtrgEloN8F0DVTm1M7JiRQQYUph",
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json'
        };

        const data = {
            "jobNumber": this.state.value            
        }

      axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/job', data, header)
      .then((result) => {
          this.setState({
              isLoaded: true,
              details: result.data
          });
          console.log(this.state.details);
          this.handleSuccess(result);
      })
      .catch((error) => {
          this.setState({
              isLoaded: true,
              error
          });
      });
    }

    handleSuccess(result) {
      if(result.data != null) {
        const header = {          
          'x-api-key': "ZT7muC1s485C5DtrgEloN8F0DVTm1M7JiRQQYUph",
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/json'
          };

        const data = {
          "rego": this.state.value            
        }

        axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/rego', data, header)
        .then((result) => {
            this.setState({
              compatibleBatteries: result.data.GetBatteriesResult,
            });
            console.log(this.state.compatibleBatteries);
        })
        .catch((error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
      }
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <div className="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Job number</span>
                    </div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <div className="input-group-append">
                        <input type="submit" value="Find" />
                    </div>
                </div>
            </div>
        </form>
      );
    }
  }

export default class FindRegoByJobNumber extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        value: null,
        details: {},
        compatibleBatteries: []
      };
    }

    render() {        
        return (
            <div>
              <OnJobNumberSubmit />
            </div>
          );
    }
}