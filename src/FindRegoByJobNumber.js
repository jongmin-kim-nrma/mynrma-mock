import React, {Component} from 'react';
import axios from 'axios';

// class LocationResultID extends Component {
//   render() {
//     const location = this.props.LocationResult;

//     return (
//       <tr>

//       </tr>
//     )
//   }
// }

// class LocationResult extends Component {
//   render() {
//     const locations = [
//           { 
//             "id": "1",
//             "totaltime" : "20 Mins",
//             "totalkm" : "4 Km",
//             "vehicle":
//               {
//               "SP_ID": "1234",
//               "ADDRESS": "2 GEORGE ST, PARRAMATTA, 2150",
//               "TIME": "20 Mins",
//               "DISTANCE": "4 Km"
//               },
//             "hub":
//               {
//               "SP_ID": "",
//               "ADDRESS": "",
//               "TIME": "",
//               "DISTANCE": ""
//               },
//             "customer":
//               {
//               "ADDRESS": "1 HAPPY STREET, SYDNEY, 2000",
//               }   
//             },
//             {
//               "id": "2",
//               "totaltime" : "54 Mins",
//               "totalkm" : "11 Km",
//               "vehicle":
//                 {
//                 "SP_ID": "1235",
//                 "ADDRESS": "21 GEORGE ST, AUBURN, 2170",
//                 "TIME": "20 Mins",
//                 "DISTANCE": "4 Km"
//                 },
//               "hub":
//                 {
//                 "SP_ID": "1234",
//                 "ADDRESS": "3 GOOD ST, REDFERN, 2150",
//                 "TIME": "34 Mins",
//                 "DISTANCE": "7 Km"
//                 },
//               "customer":
//                 {
//                 "ADDRESS": "1 HAPPY STREET, SYDNEY, 2000",
//                 } 
//               },
//           ];
//     let locResultIDs = [];

//     locations.forEach((item)=>{
//       <LocationResultID LocationResult={item} />
//     });

//     return (
//       <table className={this.props.LocationShow}>
//       </table>
//     )
//   }
// }

class BatteryResultItemRow extends Component {
  render() {
    const item = this.props.Item;
    const resultrows = [];
    for(let value in item) {
      resultrows.push(<ResultListItem Value={item[value].toString()} />)
    }

    return (
      <tr>
        {resultrows}
      </tr>
    )
  }
}
class BatteryResultItem extends Component {
  render() {
    const items = this.props.Item;
   
    let rows = [];
    for (let item in items) {
      rows.push(<ResultListItemTitle PropertyName={item} key={item} />);
    }

    return(
      <tr>
        {rows}
      </tr>
    );
  }
}
class BatteryResult extends Component {
  render() {
    const items = this.props.BatteryResult;

    let rows = [];
    let resultrows = [];

    items.forEach((item)=>{
      rows.push(<BatteryResultItem Item={item} key={item} />);
      resultrows.push(<BatteryResultItemRow Item={item} key={item} />);
    });

    items.forEach((item)=> {
      window.batteries = {
        items: [item]  
      }
    });

    return(
      <table>
        {rows}
        {resultrows}
      </table>
    );
  }
}
class ResultListItem extends Component {
  render() {
    return (
      <td>{this.props.Value} </td>
    );
  }
}
class ResultListItemTitle extends Component {
  render() {
    return (
      <th>{this.props.PropertyName}</th>
    );
  }
}
class MemberDetailResult extends Component {
  render() {
    const items = this.props.MemberDetails;

    let titleRow = [];
    for (let item in items) {
      titleRow.push(<ResultListItemTitle PropertyName={item} key={item} />);
    }
    let rows = [];
    for (let item in items) {
      rows.push(<ResultListItem PropertyName={item} Value={items[item]} key={item} />);
    }
    return(
      <table>
        <tr>
          {titleRow}
        </tr>
        <tr>
          {rows}
        </tr>
      </table>
    );
  }
}
class OnJobNumberSubmit extends Component {
      constructor(props) {
        super(props);
        this.state = {
          value: ''
      };
    }

    render() {
      return (
        <form onSubmit={this.props.handleSubmit}>
            <div className="form-group">
                <div className="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Job number</span>
                    </div>
                    <input type="text" value={this.props.value} onChange={this.props.handleChange} />
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
        compatibleBatteries: [],
        locationShow: false
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
              compatibleBatteries: result.data.GetBatteriesResult.Battery,
              locationShow: true
            });
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
            <div>
              <OnJobNumberSubmit 
              handleSubmit={this.handleSubmit} 
              handleChange={this.handleChange} />
              <MemberDetailResult MemberDetails={this.state.details} />
              <BatteryResult BatteryResult={this.state.compatibleBatteries} />
              {/* <LocationResult LocationShow={this.state.locationShow} /> */}
            </div>
          );
    }
}