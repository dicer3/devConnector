import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

export const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2)
      props.makeAlert("Passwords do not match", "danger");
    else props.makeRegister({ name, email, password });
  };

  if (props.isAuth) return <Redirect to='/dashboard' />;
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'> Create your account</i>
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email Address'
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image,use Gravatar
            email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm Password'
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    makeAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
    makeRegister: (formdata) => dispatch(register(formdata)),
  };
};

Register.propTypes = {
  makeAlert: PropTypes.func.isRequired,
  makeRegister: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
