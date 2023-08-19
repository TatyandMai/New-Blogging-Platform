import "./Edit.css"
import React, { useContext } from 'react'
import { AuthContext } from "../../state/AuthContext"
import Header from "../../components/Header/Header";



export default function Edit() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);

  return (
    <>
    <Header />
    <div className="editPost">
        <div className="editPost-container">
            <div className="user-profile">
            <div className="editPost-top">
            <img
            src={
            user.profilePicture
            ? user.profilePicture
            : PUBLIC_FOLDER + "person/noAvatar.png"}
            alt=""
            />
            <div className="profileName">
                <h5>{user.username}</h5>
            </div>
            </div>
        </div>

        <form className='editPost-form'>
            <h3>Edit</h3>
                <input
                className='editPost-title'
                type='text'
                placeholder="Title"
                />
                <textarea
                className='editPost-description'
                rows="5"
                cols="40"
                type='text'
                placeholder="Description"
                />
                <input
                type="file"
                className="editPost-file"
                name="picture"
                accept='.png, .jpeg, .jpg'
                />
            <button className="editPost-button" type='submit' >Edit</button>
        </form>
        </div>
    </div>
    </>
  )
}
