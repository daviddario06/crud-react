import React,{Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import Header from '../Header/Header';
import Navegacion from '../Navegacion/Navegacion';
import MyPost from './MyPost'
import Posts from '../Posts/Posts';
import SinglePost from '../SinglePost/SinglePost';
import Formulario from '../Formulario/Formulario';
import Swal from 'sweetalert2'


interface IRouteProps {
   
}

interface State{
    posts: MyPost[]
}

export default class Router extends Component<IRouteProps,State> {

    state:State = {
        posts:[]
    }

    componentDidMount(){
        this.obtenerPost();
    }

    obtenerPost = async () =>{
       await axios.get('https://jsonplaceholder.typicode.com/posts')
             .then( res => this.setState({ posts: res.data}))
    }

    obtenerSinglePost = ({match}:any)=>{
        let {idPost} = match.params
        let post = this.state.posts.filter(elem => elem.id === Number(idPost))
        return(<SinglePost post={post[0]}/>)
    }

    editarPost = ({match}:any) =>{

        let {idPost} = match.params
        let post = this.state.posts.filter(elem => elem.id === Number(idPost))
        return (<Formulario post = {post[0]} isNew = {false} editar = {this.editar}/>);
    }

    borrarPost = async (id:number) =>{
        
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(resp =>{
                let posts = [...this.state.posts]
                posts = posts.filter(post => post.id!==id)
                this.setState({posts})
            })
    }

    crearPost = async (post:any) : Promise<void> =>{
        
        await axios.post(`https://jsonplaceholder.typicode.com/posts`,{post})
                    .then( res =>{
                        if(res.status === 201){
                            Swal.fire(
                                'Good job!',
                                'You clicked the button!',
                                'success'
                              )
                            let {id} = res.data
                            let newPost :MyPost= {...res.data.post,id}
                            
                           this.setState({
                               posts: [...this.state.posts,newPost]
                           })
                           console.log(this.state.posts)
                        }

                    })
    }

   editar = async (post:MyPost):Promise<void> =>{
        let {id} = post
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,post)
                    .then(resp =>{ 
                        if(resp.status === 200){
                            Swal.fire(
                                'Good job!',
                                'You clicked the button!',
                                'success'
                              )
                              const {id} = resp.data
                              let posts =[...this.state.posts] 
                              const indexPost = posts.findIndex( elem => elem.id ===id)
                              posts[indexPost] = resp.data
                              this.setState({posts})
                        }
                    })
   }

  public render() {
    return (
        <BrowserRouter>
            <div className = "container">
                <div className = "row justify-content-center" >
                    <Header/>
                    <Navegacion/>
                    <Switch>
                        <Route exact path = "/" render = { () =>{ return( <Posts borrarPost ={this.borrarPost} posts = {this.state.posts}/> )} } />
                        <Route exact path = "/post/:idPost" render = { props =>this.obtenerSinglePost(props)}/>
                        <Route exact path ="/crear" render = { () => <Formulario crearPost = {this.crearPost} isNew = {true}/>}/>
                        <Route exact path = "/editar/:idPost" render = { props =>this.editarPost(props)}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}
