import React from 'react'
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";

function Article({ post }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({}); //投稿したユーザーのデータ
  // const [ like, setLike ] = useState(post.likes.length);
  // const [ isLiked, setIsLiked ] = useState(false);



//postを表示するため 投稿した人のuserデータをとる
// post.userIdが変わるたびに以下が呼び出される
useEffect(() => {
  const fetchUser = async() => {
  const response = await axios.get(`/users?userId=${post.userId}`); //users.jsの４
  //user.jsのget. postはtimeline.jsxで受け取ったprops userIdはmodels/User.jsのuserId. post.userIdは投稿したユーザーのuserId
      console.log(response);
      setUser(response.data);
  };
  fetchUser();
}, [post.userId]);



//いいねの
// post.userIdが変わるたびに以下が呼び出される
// useEffect(() => {
//   const fetchUser = async() => {
//   const response = await axios.get(`/users?userId=${post.userId}`); //user情報をgetする
//   //user.jsのget. postはtimeline.jsxで受け取ったprops userIdはmodels/User.jsのuserId. post.userIdは投稿したユーザーのuserId
//       // console.log(response);
//       setUser(response.data);
//   };
//   fetchUser();
// }, [post.userId]);


//like button
// const handleLike = () => {
//   setLike(isLiked ? like -1 : like +1);
//   setIsLiked(!isLiked);
// };


  return (
    <>
      <Col>
        <Card className='card'>
          <div className='postUser'>
              <Link to={`/profile/${user.username}`} >
                <img
                src={ user.profilePicture || PUBLIC_FOLDER + "/assets/person/noAvatar.png"}
                alt=''
                className='postProfileImg'
                />
              </Link>
                <span className='postUsername'>{ user.username }</span>
                {/* <span className="postData">{format(post.createdAt)}</span> */}
          </div>
          <Card.Img
          variant="top"
          src={post.img || PUBLIC_FOLDER + "/assets/person/noAvatar.png"}
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.description}
            </Card.Text>
          </Card.Body>

          <div className="postBottomLeft">
            <img
            className="likeIcon"
            src={PUBLIC_FOLDER + "/assets/heart.png"}
            alt=""
            // onClick={() => handleLike()}
            />
            <span className="postLikeCounter">4 people like it</span>
          </div>
        </Card>
      </Col>
    </>
  )
}

export default Article