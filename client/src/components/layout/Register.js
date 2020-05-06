import React, { Fragment, useState } from 'react'
import axios from 'axios';

export const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            console.log(formData);
            const newUser = {
                name,
                email,
                password,
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config)
                console.log(res.data)

            } catch (error) {
                console.log(error.response.data)
            }
        }
    }
    return <Fragment>
        <h1 className="large text-primary">
            Sign Up
      </h1>
        <p className="lead">
            <i className="fas fa-user"> Create your account</i>
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="text" placeholder="Name"
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required />
            </div>
            <div className="form-group">
                <input type="email"
                    name='email'
                    value={email}
                    placeholder="Email Address"
                    onChange={e => onChange(e)}
                    required />
                <small className="form-text">
                    This site uses Gravatar, so if you want a profile image,use Gravatar
                    email
          </small>
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
            <div className="form-group">
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="Confirm Password"
                    onChange={e => onChange(e)}
                    minLength="6" />
            </div>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
        <p className="my-1">
            Already have an account? <a href="login.html">Sign in</a>
        </p>
    </Fragment>
}

export default Register;