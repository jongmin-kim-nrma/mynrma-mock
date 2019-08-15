import React, {Component} from 'react';
import axios from 'axios';

class MemberDetailsRow extends Component {
    render() {
      const memberDetail = this.props.memberDetail;
      const name = memberDetail.rego;
  
      return (
        <tr>
          <td>{name}</td>
          <td>{memberDetail.memberNumber}</td>
        </tr>
      );
    }
  }

class MemberDetailsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.memberDetail
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

    render() {
       const rows = [];
       console.log(this.props.memberDetail);

        return (<table>
            <thead>
              <tr>
                <th>Rego</th>
                <th>Member Number</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
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
    })
    .catch((error) => {
        this.setState({
            isLoaded: true,
            error
        });
    });
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
                <MemberDetailsTable memberDetail={this.state.details}/>
              </div>
            );
        }
}