const validate = userObject => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = userObject;

  let error = {
    userName: [],
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    confirmPassword: [],
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (userName.length <= 2 || userName.length >= 60) {
    error.userName.push('User Name should be more than 2 characters')
  }
  if (firstName.length <= 2 || firstName.length >= 60) {
    error.firstName.push('First Name should be more than 2 characters')
  }
  if (lastName.length <= 2 || lastName.length >= 60) {
    error.lastName.push('Last Name should be more than 2 characters')
  }
  if (password.length <= 10 || password.length >= 60) {
    error.password.push('Password  should be minimum 10 characters')
  }
  if (password !== confirmPassword) {
    error.confirmPassword.push('Password and confirm password dont match');
  }
  if( !emailRegex.test(email)) {
    error.email.push('Invalid email');
  }

  const isDisabled = Object.keys(error).some(key => error[key].length !== 0);

  return {
    error,
    isDisabled,
  };
};

export default validate;
