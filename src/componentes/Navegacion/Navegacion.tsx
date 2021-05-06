import * as React from 'react';
import './Navegacion.css'
import { Link } from 'react-router-dom';



export default class Navegacion extends React.Component{
  public render() {
    return (
      <nav className = "col-12 col-md-8">
           <Link to={`/`}> Todos los Post </Link> 
           <Link to = {`/crear`}> Nuevo Post </Link>
      </nav>
    );
  }
}

/* hola navegacion */