import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        console.log("Success");
    }
    return <Fragment>
        <h1 className="large text-primary">
            Sign Up
      </h1>
        <p className="lead">
            <i className="fas fa-user"> Sign Into Your Account</i>
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="email"
                    name='email'
                    value={email}
                    placeholder="Email Address"
                    onChange={e => onChange(e)}
                    required />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => onChange(e)}
                    minLength="6" />
            </div>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
    </Fragment>
}

export default Login;