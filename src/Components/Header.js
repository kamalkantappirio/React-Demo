/**
 * Created by kamalkant on 12/07/17.
 */
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Breadcrumb} from 'react-bootstrap';

class Header extends Component {

  state={
    profile: {},
    routeHistory:[]
  }

  goTo(route) {
    this.props.props.history.push(`/${route}`)
  }

  login() {
    this.props.props.auth.login();
  }

  logout() {
    this.props.props.auth.logout();
  }

  componentWillMount() {
    this.setState({profile: {}});
    const {userProfile, getProfile, isAuthenticated} = this.props.props.auth;
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

  componentWillReceiveProps(nextProps) {
    this.setState({routeHistory:nextProps.routeHistory});
  }


  renderBreadcrumbItem = (item, index) => {
    if(index === this.state.routeHistory.length-1){
      return  <Breadcrumb.Item key={index} onClick={this.goTo.bind(this, item.name)} active>
        {item.name}
      </Breadcrumb.Item>;
    }else{
      return  <Breadcrumb.Item key={index} onClick={this.goTo.bind(this, item.name)}>
        {item.name}
      </Breadcrumb.Item>;
    }
  };


  render() {
    const {isAuthenticated } = this.props.props.auth;

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={this.goTo.bind(this, 'home')}> React App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={this.goTo.bind(this, 'home')}>Home</NavItem>
              <NavItem eventKey={2} onClick={this.goTo.bind(this, 'about')}>About Us</NavItem>
              <NavItem eventKey={3} onClick={this.goTo.bind(this, 'faq')}>Faq</NavItem>
              <NavItem eventKey={4} onClick={this.goTo.bind(this, 'home')}>{this.state.profile.name}</NavItem>
            </Nav>


            <Nav pullRight>
              {!isAuthenticated() && (
                <NavItem eventKey={2}  onClick={this.login.bind(this)}>Log In</NavItem>
              )}
              {isAuthenticated() && (
                <NavItem eventKey={2}  onClick={this.logout.bind(this)}>Log Out</NavItem>
              )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Breadcrumb >
          { this.state.routeHistory !== null && this.state.routeHistory.map((item, index) => {
            return this.renderBreadcrumbItem(item, index);
          })
          }
        </Breadcrumb>
      </div>

    );
  }
}

export default Header;