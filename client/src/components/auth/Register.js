import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import validate from '../../utils/validations/userRegistration';
import {registerUser} from '../../actions/authAction';
import TextInput from '@crave/farmblocks-input-text';
import Card from '@crave/farmblocks-card';
import EmptyState from '@crave/farmblocks-empty-state';
import Button from '@crave/farmblocks-button';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    // this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { error, isDisabled } = validate(this.state);
    console.log(error, 'inside render');
    return (
      <div>
        <Card
          width="80%"
          overflow="visible"
          style={{ margin: '0 auto' }}>
          <EmptyState
            title="Sign Up"
            description="Create your devconnector account"
          />
          <hr/>
          <TextInput
            label="User Name"
            name="userName"
            type="text"
            validationMessages={error.userName}
            placeholder="User Name"
            onChange={this.onChange}
          />
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First Name"
            validationMessages={error.firstName}
            onChange={this.onChange}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last Name"
            validationMessages={error.lastName}
            onChange={this.onChange}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            validationMessages={error.email}
            onChange={this.onChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            validationMessages={error.password}
            onChange={this.onChange}
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            validationMessages={error.confirmPassword}
            onChange={this.onChange}
          />
          <Button
            disabled={isDisabled}
            tooltipText="Enter details above"
            type="SECONDARY"
            onClick={this.onSubmit}
            text="Register"/>
        </Card>
      </div>
    );
  };
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
