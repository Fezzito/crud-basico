import {React, useState } from 'react';
import uniqid from "uniqid";


function Listadonombres(props) {
    const [nombre, setNombre] = useState("")
    const [listadoNombres, setListadoNombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault()
        if(!nombre.trim()){
            setError("El campo nombre está vacío")
            return
        }
        const nuevoNombre={
            id: uniqid(),
            tituloNombre: nombre
        }
        setListadoNombres([...listadoNombres,nuevoNombre])
        setNombre("")
        setError(null)
    }

    const deleteNombre = (id) =>{
        const nuevaArray = listadoNombres.filter(item => item.id!== id)
        setListadoNombres(nuevaArray)
    }

    const editar = (item) => {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) =>{
        e.preventDefault()
        const nuevoArray = listadoNombres.map(
        item => item.id === id ? {id:id, tituloNombre:nombre}:item)
        setListadoNombres(nuevoArray)
        setModoEdicion(false)
        setNombre("")
    }

    return (
        <div>
            <h1 class="fst-italic font-Roboto">Anotador de nombres para tu evento</h1>
            <div className="row">
                <div className="col mt-3">
                    <h2>Listado de asistentes</h2>
                    <ul className="list-group">
                        {
                        listadoNombres.map (item =>
                            <li key={item.id} className="list-group-item"> {item.tituloNombre}
                                <button className="btn btn-info float-end"
                                onClick={()=> {editar(item)}}
                                >
                                    EDITAR
                                </button>
                                <button className="btn btn-danger float-end"
                                onClick={()=> {deleteNombre(item.id)}}
                                >
                                    BORRAR
                                </button>
                            </li>
                            )
                        }
                </ul>
                </div>
                <div className="col mt-3">
                <h2>Añadir participante</h2>
                <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                    <input onChange={(e) => {setNombre (e.target.value)}} 
                    className="form-control mb-3" 
                    type="text" 
                    placeholder="Introduzca el nombre"
                    value={nombre}
                    />
                    <input 
                    className="btn btn-info btn-block" 
                    type="submit" 
                    value={modoEdicion ? "Editar nombre" : "Añadir nombre"} 
                    />
                </form>
                {
                    error != null ? (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    ):
                    (
                        <div></div>
                    )
                }
                </div>
            </div>
        </div>
    );
}

export default Listadonombres;