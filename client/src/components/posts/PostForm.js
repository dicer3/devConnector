import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addUserPost }) => {
  const [text, setText] = useState("");
  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>
      <form
        action=''
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addUserPost({ text });
          setText("");
        }}
      >
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addUserPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserPost: (formData) => dispatch(addPost(formData)),
});

export default connect(null, mapDispatchToProps)(PostForm);
