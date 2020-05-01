import React from 'react';
import MyPost from '../Router/MyPost';
import { Link } from 'react-router-dom';
import { BorrarPost } from '../Listado/Listado';
import Swal from 'sweetalert2'

export interface IelemntProps {
    info: MyPost,
    borrarPost: BorrarPost
}

const elemnt: React.FC<IelemntProps> = ({info,borrarPost}) => {
    const {id, title} = info

    const confirmarEliminacion = () =>{

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {

              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              deletePost(id, borrarPost)
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })

        
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })


    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>
                <Link to = {`/post/${id}`} className = "btn btn-primary"> Ver</Link>
                <Link to = {`/editar/${id}`} className = "btn btn-warning"> Editar</Link>
                <button onClick = {confirmarEliminacion} type = "button" className = "btn btn-danger" >Borrar</button>
                
            </td>
        </tr>
    );
};

export default elemnt;

const deletePost = (id:number, borrarPost:BorrarPost) =>{
    
    borrarPost(id);
}