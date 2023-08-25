import "./Post.css"
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from "../../state/AuthContext"
import axios from 'axios';
import Header from "../../components/Header/Header";

export default function Post() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);
    const desc = useRef()
    const title = useRef()

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id, //who post the article（current user）
          title: title.current.value, //current.value = input words in title
          description: desc.current.value
        }
        //upload file
        if(file){
          const data = new FormData(); //make new data
          const fileName = Date.now() + file.name;
          data.append("name", fileName); // "name" = key
          data.append("file", file); //"file" = key
          newPost.img = fileName;
          try{
            //API for upload file
            await axios.post("/upload", data); //upload.js
          }catch(err){
            console.log(err)
          }
        }
        //API for post
        try {
          await axios.post("/posts", newPost); //post.js 1
          window.location.reload(); //reload automatically after posted
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <>
    <Header />
    <div className="post">
      <div className="post-container">
        <div className="user-profile">
          <div className="post-top">
            <img
            src={
              user.profilePicture
              ? user.profilePicture
              : PUBLIC_FOLDER + "noAvatar.png"}
              alt=""
            />
            <div className="profileName">
              <h5>{user.username}</h5>
            </div>
          </div>
        </div>

          <form className='post-form' onSubmit={(e) => handleSubmit(e)} >
            <h3>Post</h3>
              <input
                  className='post-title'
                  type='text'
                  placeholder="Title"
                  ref={title}
              />
              <textarea
                  className='post-description'
                  rows="5"
                  cols="40"
                  type='text'
                  placeholder="Description"
                  ref={desc}
              />
              <input
              type="file"
              className="post-file"
              name="picture"
              accept='.png, .jpeg, .jpg'
              onChange={(e) => setFile(e.target.files[0])}
              />
            <button className="post-button" type='submit' >POST</button>
          </form>
      </div>
    </div>
    </>
  )
}
