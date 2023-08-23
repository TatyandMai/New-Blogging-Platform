import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";
// import TimeAgo from 'timeago-react';
import { format } from 'timeago.js';
import { AuthContext } from "../../state/AuthContext"

function Article({ post, setPosts, posts }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext); //current user

  const [ user, setUser ] = useState({}); //the data of user who posted the article
  const [ like, setLike ] = useState(post.likes.length);
  const [ isLiked, setIsLiked ] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedFile, setEditedFile] = useState(null);

  // Function to toggle editing mode
  const toggleEdit = () => {
    setEditing(!editing);
  };

  // Function to delete a publication
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
      // Update the posts state after successful deletion
      const updatedPosts = posts.filter((p) => p._id !== post._id);
      setPosts(updatedPosts);
    } catch (err) {
      console.log(err);
    }
  };

// Function to update a publication
const handleUpdate = async () => {
  try {
    console.log("Updating post with ID:", post._id);
    const updatedData = {
      title: editedTitle,
      description: editedDescription,
    };

    if (editedFile) {
      const formData = new FormData();
      formData.append("file", editedFile);
      const response = await axios.post("/upload", formData);
      updatedData.img = response.data.fileName;
    }

    const response = await axios.put(`/posts/${post._id}`, updatedData);

    // Update the posts state after successful update
    const updatedPost = response.data;
    const updatedPosts = posts.map((p) => (p._id === updatedPost._id ? updatedPost : p));
    setPosts(updatedPosts);

    setEditing(false);
  } catch (err) {
    console.log(err);
  }
};
  

//get a user data to show the post (user who posted the article)
useEffect(() => {
  const fetchUser = async() => {
  const response = await axios.get(`/users?userId=${post.userId}`); //users.js 4
  //post is props from timeline.jsx / userId is coming from models/User.js / post.userId = userId(user who posted the article)
    setUser(response.data);
  };
  fetchUser();
}, [post.userId]);



//like function
const handleLike = async () => {
  try{
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id }); //posts.js 4
  } catch(err){
      console.log(err);
  }
  setLike(isLiked ? like -1 : like +1);
  setIsLiked(!isLiked);
};


  return (
    <>
      <Col>
        <Card className='card' style={{height: '30rem', marginBottom:'3rem'}}>
          <div className='postUser'>
              <Link to={`/profile/${user.username}`} >
                <img
                src={
                  user.profilePicture
                  ? user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png"}
                alt=''
                className='postProfileImg'
                />
              </Link>
                <span className='postUsername'>{ user.username }</span>
                <br />
                  <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <Card.Img
          variant="top"
          style={{ height: '15rem' }}
          src={PUBLIC_FOLDER + post.img || PUBLIC_FOLDER + "person/noAvatar.png"}
          />
          <Card.Body style={{ height: '10rem' }}>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.description}
            </Card.Text>
            <div className="postBottomLeft">
            <img
            className="likeIcon"
            src={PUBLIC_FOLDER + "heart.png"}
            alt=""
            onClick={() => handleLike()}
            />
            <span className="postLikeCounter"> {like} people like it</span>
            {/* Edit and Delete buttons */}
            {currentUser._id === post.userId && (
              <>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>


          {/* Render the edit form if in edit mode */}
          {editing && (
            <div className="editForm">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditedFile(e.target.files[0])}
              />
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                rows="5"
                cols="40"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={handleUpdate}>Save changes</button>
              <button onClick={toggleEdit}>Cancel</button> {/* Add a cancel button*/}
            </div>
          )}

          </Card.Body>

        </Card>
      </Col>
    </>
  )
}

export default Article