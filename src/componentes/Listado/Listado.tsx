import React from 'react';
import MyPost from '../Router/MyPost';
import Post from '../Post/Post';

export interface IListadoProps {
    posts: MyPost[],
    borrarPost: BorrarPost
}

export type BorrarPost = (id:number) =>void

const Listado: React.FC<IListadoProps> = ({posts, borrarPost}) => {
    return (
        <table className = "table">
            <thead>
                <tr>
                    <th scope = "col">ID</th>
                    <th scope = "col">Titulo</th>
                    <th scope = "col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {mostrarPosts(posts,borrarPost)}
            </tbody>
        </table>
    );
};

export default Listado;

const mostrarPosts = (posts:MyPost[] , borrarPost:BorrarPost) =>{

    if(!posts) return null;

    return (
        <React.Fragment>
            {posts.map(post => (
                <Post key = {post.id} info = {post} borrarPost = {borrarPost}/>
            ))}
        </React.Fragment>

    );
}

/* holal mundito */