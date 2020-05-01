import React  from 'react';
import { IPostsProps } from './IPosts';
import Listado from '../Listado/Listado';

const Posts: React.FC<IPostsProps> = ({posts, borrarPost}) => {

    return (
        <div className = "col-12 col-md-8" >
            <h2 className = "text-center"> Posts </h2>
            <Listado posts = {posts} borrarPost = {borrarPost}/>
        </div>
    );
};

export default Posts;

