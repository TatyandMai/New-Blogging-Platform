import React, { useState, useEffect } from 'react'
import './AllPosts.css';
import Header from "../../components/Header/Header";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Article from '../../components/Article/Article';


export default function AllPosts() {

    const [ allPosts, setAllPosts ] = useState([]);

    // console.log(allPosts)

    //to show all posts
    useEffect(() => {
        const fetchAllPosts = async() => {
        const response = await axios.get(`/posts/all`) //post.js 5.
        setAllPosts(response.data)
        // console.log(response)
        setAllPosts(response.data.sort((post1,post2) => { //sort post
            return new Date(post2.createdAt) - new Date(post1.createdAt);
        }));
        };
        fetchAllPosts();
    }, []);

  return (
    <>
    <Header />
        <div className="allArticlesContainer">
        <h1>ARTICLES</h1>
        <div className="allArticles">
            <Row xs={2} md={4} className="g-6">
                {allPosts.map((allPost) => (
                    <Article  post={allPost} key={allPost.userId} />
                ))}
            </Row>
        </div>
        </div>
    </>
  )
}
