import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addUserComment }) => {
  const [text, setText] = useState("");
  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        action=''
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addUserComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a Comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addUserComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserComment: (postId, FormData) => dispatch(addComment(postId, FormData)),
});
export default connect(null, mapDispatchToProps)(CommentForm);
