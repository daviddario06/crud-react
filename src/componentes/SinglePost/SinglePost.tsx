import React from 'react';
import MyPost from '../Router/MyPost';

export interface ISinglePostProps {
    post:MyPost
}

const SinglePost: React.FC<ISinglePostProps> = ({post}) => {
    return (
        <div className = "col-12 col-md-8">
            {mostrarPost(post)}
        </div>
    );
};

export default SinglePost;

const mostrarPost = (post:MyPost):JSX.Element | null =>{
    
    if(!post) return null;

    const {title, body, userId} = post
    return(
        <React.Fragment> 
            <h1>{title}</h1>
            <p>Autor: {userId}</p>
            {body}
        </React.Fragment>
    );
}