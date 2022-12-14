import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { alertAdded } from '../../reducers/alert';
//import { connect } from 'react-redux';
import { useRegisterUserMutation } from '../../services/registerApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  //const { alert } = useSelector((state) => state.alertAdded);
  const dispatch = useDispatch();
  //const getRegistry = useRegisterQuery();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(alertAdded({ msg: 'Passwords do not match', type: 'danger' }));
    } else {
      console.log(name, email, password);
      const data = { name, email, password };
      await registerUser(data);
    }
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      ;
    </section>
  );
};

export default Register;
