import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, makeLogout }) => {
  const authLinks = (
    <ul>
      <li>
        <a href='#!' onClick={makeLogout}>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestlinks = (
    <ul>
      <li>
        <Link to='#!'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevConnector{" "}
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  makeLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => ({
  makeLogout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
