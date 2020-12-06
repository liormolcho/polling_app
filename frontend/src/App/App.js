import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { history } from '../helpers';
import { HomePage } from '../HomePage';
import { PollPage } from '../PollPage';
import { CreatePollsPage } from '../CreatePollsPage';
import { NotFoundPage } from '../NotFoundPage';
import { SetupPollPage } from '../SetupPollPage';

import {
  Button,
  Container,
  Menu,
  Message,
  Segment,
} from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.state = { activeItem: 'root' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state;
    const { fixed } = false;

    return (
      <Router history={history}>
        <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
          <Menu
            fixed={fixed}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item as={Link} to="/"
                name='root'
                content='Home'
                active={activeItem === 'root'}
                onClick={this.handleItemClick}
              />
              
              <Menu.Item position='right'>
                <Button as={Link} to="/create" color="teal">create</Button>
              </Menu.Item>
            </Container>
          </Menu>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/create/" component={CreatePollsPage} />
            <Route path="/polls/:url" component={PollPage} />
            <Route path="/edit/:url" component={SetupPollPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Segment>
      </Router>
    ) 
  }
}

App.propTypes = {
  children: PropTypes.node,
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };