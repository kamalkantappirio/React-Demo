import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header';
class App extends Component {
  state={
    routeHistory:[]
  }

  componentDidMount() {
    const {isAuthenticated} = this.props.auth;
    if (!isAuthenticated()) {
      window.location.href = `http://localhost:8081/login`;
    }else{
      var routeHistory = this.state.routeHistory;
      if (routeHistory.length === 0) {
        let item = {
          pathname: '/home',
          name: 'home'
        };
        routeHistory.push(item);
      }
      this.setState({routeHistory});
    }
  }

  componentWillReceiveProps(nextProps) {
    var routeHistory = this.state.routeHistory;
    var foundIndex = routeHistory.findIndex(x => x.pathname === nextProps.location.pathname);
    let pathName = nextProps.location.pathname;
    while(pathName.charAt(0) === '/'){
      pathName = pathName.substr(1);
    }
    if (foundIndex < 0) {
      let item = {
        pathname: nextProps.location.pathname,
        name: pathName,
      };
      routeHistory.push(item);
    } else {
      routeHistory[foundIndex].pathname = nextProps.location.pathname;
      routeHistory[foundIndex].name = pathName;

      //Remove uper index after this element
      for (var index = foundIndex+1; index < routeHistory.length; index++) {
        routeHistory.splice(index);
      }
    }
    this.setState({routeHistory});
  }

  render() {
    return (
      <div>
        <Header props={this.props} routeHistory={this.state.routeHistory}/>
      </div>

    );
  }
}

export default App;
