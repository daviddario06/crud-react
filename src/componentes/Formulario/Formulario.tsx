import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Swal from 'sweetalert2'
import MyPost from '../Router/MyPost';

export interface IFormularioProps {
    crearPost?:(tempPost:any) =>Promise<void>,
    isNew: boolean,
    post?:MyPost,
    editar?: (post:MyPost)=>Promise<void>
}

const Formulario: React.FC<IFormularioProps> = ({crearPost, isNew, post,editar}) => {

    const[titulo,setTitulo] = useState<string>('');
    const[contenido,setContenido] = useState<string>('');

    const handleClick = (e:FormEvent<HTMLButtonElement>) =>{
        e.preventDefault();

        if( isNew && crearPost){
            const tempPost = {
                body: contenido,
                title: titulo,
                userId: 1
            }
    
            Swal.fire('Please wait')
            Swal.showLoading()
    
            crearPost(tempPost)
    
            resetForm()
        }
        else if (!isNew && post && editar){
            post.title = titulo
            post.body = contenido
            Swal.fire('Please wait')
            Swal.showLoading()
            editar(post)
        }
       
    }

    const handleChanceTitulo = ({target: {value}}:ChangeEvent<HTMLInputElement>) =>{
        setTitulo(value)
    }

    const handleChangeContenido = ({target: {value}}:ChangeEvent<HTMLInputElement>) =>{
        setContenido(value)
    }

    const resetForm = (): void=>{
        setContenido('');
        setTitulo('');
    }

    useEffect( () => {
        if (!isNew && post){
            setTitulo(post.title)
            setContenido(post.body)
        }
    },[isNew,post])
  

    return (
        <React.Fragment>

            <form className = "col-8">
                <legend className ="text-center">{isNew ? "Crear Nuevo Post": "Editar Post"}</legend>
                <div className = "form-group">
                    <label>Titulo Post:</label>
                    <input onChange = {handleChanceTitulo} type="text" className ="form-control" placeholder="Titulo Del Post" defaultValue ={titulo}/>
                </div>
                <div className = "form-group">
                    <label>Contenido: </label>
                    <input onChange = {handleChangeContenido} type="text" className ="form-control" placeholder="Contenido..." defaultValue ={contenido}/>
                </div>
             <button  onClick = {handleClick} className ="btn btn-primary" type = "submit">{isNew ? "Crear": "Editar"}</button>
            </form>
        </React.Fragment>
    );
};

export default Formulario;