import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';

class Home extends Component {
  state ={
    profile: {},
    fieldsArr:[
      {
        id:1,
        name:'Select Mapping',
      },{
        id:2,
        name:'name__c',
      },
      {
        id:3,
        name:'age__c'
      },
      {
        id:4,
        name:'phone__c'
      },
      {
        id:5,
        name:'address__c'
      }
    ],
    objectArray:[
      {
        index:'1',
        mappingField:'',
        field:'Name'
      },
      {
        index:'2',
        mappingField:'',
        field:'Age'
      },
      {
        index:'3',
        mappingField:'',
        field:'Phone'
      }

    ]
  };

  componentWillMount() {
    this.setState({});
    const {userProfile, getProfile, isAuthenticated} = this.props.auth;
    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({profile});
        });
      } else {
        this.setState({profile: userProfile});
      }
    }
  }

  login() {
    this.props.auth.login();
  };

  /**
   * Method call when option change from drop-down
   * In this selected value save in json
   **/
  onDropDownChange =(selectedIndex, selectedValue) =>{
    var objectArray = this.state.objectArray;
    var foundIndex = objectArray.findIndex(x => x.index === selectedIndex);
    if (foundIndex >= 0) {
      if(selectedValue  === 'Select Mapping')
        selectedValue = '';
      objectArray[foundIndex].mappingField = selectedValue;
    }


    this.setState({objectArray});
  };

  /**
   * Method call when user press submit button.
   **/
  onSubmitBtnClick =()=>{
    console.log(this.state.objectArray)
  }

  /**
   * Method use for render the row for data.
   **/
  renderRow = (rowData, index) => {
    return <tr key={index}>
      <td>{rowData.index}</td>
      <td>{rowData.field}</td>
      <td>
        <select className="selectpicker" onChange={event =>this.onDropDownChange(rowData.index, event.target.value)}>
          { this.state.fieldsArr.map((item, index) => {
            return this.renderDropDownOption(item, index);
          })
          }
        </select>

      </td>
    </tr>
  };

  renderDropDownOption = (item, index) => {
    return <option key={index} >{item.name}</option>
  };

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              {/*<h4>
                Welcome: {this.state.profile.name}
                /!*<pre>{JSON.stringify(this.state.profile, null, 2)}</pre>*!/
              </h4>*/}

              <Table responsive>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Field</th>
                  <th>Mapping</th>
                </tr>
                </thead>
                <tbody>
                { this.state.objectArray.map((item, index) => {
                  return this.renderRow(item, index);
                })
                }
                </tbody>
              </Table>

              <Button type="submit" onClick={this.onSubmitBtnClick}>
                Submit
              </Button>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{cursor: 'pointer'}}
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
