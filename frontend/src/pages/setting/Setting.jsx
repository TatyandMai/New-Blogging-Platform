import "./Setting.css"
import React, { useState, useRef, useContext } from 'react'
import axios from 'axios';
import Header from "../../components/Header/Header";
import { AuthContext } from '../../state/AuthContext';


export default function Setting() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext); //user is from AuthContext.js, current user's data

    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);

    const desc = useRef()

    //button for setting pictures
    const handleProfile = async (e) => {
        e.preventDefault();
        const newInfo = {
            userId: user._id, //current user
            desc: desc.current.value, //input data of user information
        }
        //set profile picture
        if(profilePic){
            const data = new FormData();
            const fileName = Date.now() + profilePic.name;
            data.append("name", fileName);
            data.append("file", profilePic);
            newInfo.profilePicture = fileName;
            // console.log(newPicture)
            try{
                //to set profile picture
                await axios.put(`/setting/profilePic/${user._id}`, data); //setting.js 1
            }catch(err){
                console.log(err)
            }
        }
            try{
                //to set user information
                await axios.put(`/setting/information/${user._id}`, newInfo); //setting.js 3
                window.location.reload(); //reload automatically after posted
            }catch(err){
                console.log(err)
            }
    }

    console.log(user)


    const handleCover = async (e) => {
        e.preventDefault();
        const newPicture = {
            userId: user._id
        }
        //set profile picture
            const data = new FormData();
            const fileName = Date.now() + coverPic.name;
            data.append("name", fileName);
            data.append("file", coverPic);
            newPicture.coverPicture = fileName;
            // console.log(newPicture)
            try{
                //API for setting profile picture
                await axios.put(`/setting/coverPic/${user._id}`, data); //setting.js 2
            }catch(err){
                console.log(err)
            }
            // navigate(`/profile/${user._id}`);
            window.location.reload(); //reload automatically after posted
    }

  return (
    <>
    <Header />
    <div className="setting">
        <h1>SETTING</h1>
        <div className="setting-top">
            <img
            src={
            user.profilePicture
            ? PUBLIC_FOLDER + user.profilePicture
            : PUBLIC_FOLDER + "person/noAvatar.png"}
            alt=""
            />
            <div className="setting-name">
                <h5>{user.username}</h5>
            </div>
        </div>

        <form className='setting-form' onSubmit={(e) => handleProfile(e)}>
            <h4>Select your profile picture</h4>
            <input
            type="file"
            className="setProfilePic"
            name="picture"
            accept='.png, .jpeg, .jpg'
            onChange={(e) => setProfilePic(e.target.files[0])}
            />
             <h4>Your Information</h4>
            <textarea
            className='post-description'
            rows="5"
            cols="40"
            type='text'
            placeholder="Description"
            ref={desc}
            />

<button className="setting-button" type='submit' >Set your profile picture</button>
        </form>

        <form className='setting-form' onSubmit={(e) => handleCover(e)}>
            <h4>Select your profile cover picture</h4>
            <input
            type="file"
            className="setCoverPic"
            name="picture"
            accept='.png, .jpeg, .jpg'
            onChange={(e) => setCoverPic(e.target.files[0])}
            />
            <button className="setting-button" type='submit' >Set your cover picture</button>
        </form>
    </div>
    </>
  )
}
