import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <div className='dash-buttons'>
        <Link to='/edit-profile' className='btn'>
          <i className='fas fa-user-circle text-primary'> Edit Profile</i>
        </Link>
        <Link to='/add-experience' className='btn'>
          <i className='fab fa-black-tie text-primary'> Add Experience</i>
        </Link>
        <Link to='/add-education' className='btn'>
          <i className='fas fa-graduation-cap text-primary'> Add Education</i>
        </Link>
      </div>
    </div>
  );
};
