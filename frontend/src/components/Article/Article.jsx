import React from 'react'
import "./Article.css"
import { useState, useEffect, useContext, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";
// import TimeAgo from 'timeago-react';
import { format } from 'timeago.js';
import { AuthContext } from "../../state/AuthContext"


function Article({ post }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext); //current user

  const [ user, setUser ] = useState({}); //the data of user who posted the article
  const [ like, setLike ] = useState(post.likes.length);
  const [ isLiked, setIsLiked ] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedFile, setEditedFile] = useState(null);

  const editedTitle = useRef()
  const editedDesc = useRef()


  // Function to toggle editing mode
  const toggleEdit = () => {
    setEditing(!editing);
  };

  // Function to delete a publication
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
      //You may want to remove the deleted post from the 'posts' status here
      window.location.reload(); //reload automatically after posted
    } catch (err) {
      console.log(err);
    }
  };

  //to edit post
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Data to be sent to the server
    const updatedData = {
        userId: currentUser._id,
        id: post._id,
        title: editedTitle.current.value,
        description: editedDesc.current.value
    };
    console.log(updatedData)
      // If a new image was selected
    if (editedFile) {
        const formData = new FormData();
        const fileName = Date.now() + editedFile.name;
        formData.append("name", fileName);
        formData.append("file", editedFile);
        updatedData.img = fileName;
        console.log(fileName)
        console.log(post)
        try{
            //to set the picture of the post
            await axios.put(`/posts/postPic/${post._id}`, formData);// posts.js 2
        }catch(err){
            console.log(err)
        }
    }
    try{
        //to set the title and description of the post
        await axios.put(`/posts/${post._id}`, updatedData); //posts.js 2
        window.location.reload(); //reload automatically after posted
    }catch(err){
        console.log(err)
    }
}


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
        <Card className='card' style={{height: '30rem', marginBottom:'20rem'}}>
          <div className='postUser'>
              <Link to={`/friends/${user.username}`} state={{post: "post"}} >  {/* state = to pass the data of post to Edit page */}
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
            <Card.Text>{post.description}</Card.Text>
            <div className="postBottomLeft">
              <img
              className="likeIcon"
              src={PUBLIC_FOLDER + "heart.png"}
              alt=""
              onClick={() => handleLike()}
              />
              <span className="postLikeCounter"> {like} people like it</span>
            </div>

            {/* Edit and Delete buttons */}
            {currentUser._id === post.userId && (
              <div>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          {/* Renderizar el formulario de edición si está en modo de edición */}
          {editing && (
            <div className="editForm">
              <form className='editPost-form'onSubmit={(e) => handleUpdate(e)} >
              <h3>Edit</h3>
                <input
                className='editPost-title'
                type='text'
                placeholder="Title"
                ref={editedTitle}
                />
                <textarea
                className='editPost-description'
                rows="5"
                cols="40"
                type='text'
                placeholder="Description"
                ref={editedDesc}
                />
                <input
                type="file"
                className="editPost-file"
                name="picture"
                accept='.png, .jpeg, .jpg'
                onChange={(e) => setEditedFile(e.target.files[0])}
                />
              <button className="editPost-button" type='submit' >Edit</button>
              </form>
            </div>
          )}








          </Card.Body>

        </Card>
      </Col>
    </>
  )
}

export default Article