import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrProfile,
  deleteUserAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrProfile();
  }, [getCurrProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.experience.length > 0 && (
            <Experience experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <Education education={profile.education} />
          )}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={deleteUserAccount}>
              <i className='fas fa-user-minus'></i> Delete my Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile,please add some info </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile Link
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrProfile: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrProfile: () => dispatch(getCurrentProfile()),
  deleteUserAccount: () => dispatch(deleteAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
