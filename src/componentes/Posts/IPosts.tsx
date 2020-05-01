import MyPost from "../Router/MyPost";

export interface IPostsProps{
    posts: MyPost[],
    borrarPost: (id:number)=>void
}