import React from "react";
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

const Estudiantes = ({student, students, setListUpdated, listStudents, setStudent, buttonLink, note}) => {

    
    const handleClick = id => {
        note.student = id
        setListUpdated(true)
    }
  
    const handleDelete = id => {
        const requesInit = {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({ id: id })
        }
        fetch('http://3.92.64.73:5900/api/students/delete', requesInit)
        .then(res => res.text)
        .then(res => console.log(res))
        alert("Estudiante eliminado correctamente...")

        setListUpdated(true)

    }
    let {name, email, year, age, gender} = student;

    const handleUpdate = id => {
        student.id = id
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(name === '' || email === '' || year === '') {
            alert('Faltan campos por llenar')
            return
        } else if (regex.test(email) === false) {
            alert('Ingrese un correo electronico valido')
        }  else if (parseInt(year)<0) {
            alert('grado incorrecta')
        } else if (parseInt(age)<0 || parseInt(age)>100) {
            alert('Edad incorrecta')
        }
       else {
        
        const requesInit = {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify( student)
        }
        fetch('http://3.92.64.73:5900/api/students/update', requesInit)
        .then(res => res.text)
        .then(res => console.log(res))
        alert("Estudiante actualizado correctamente...")

        setStudent({
            name: '',
            email: '',
            year: '',
            age: '',
            gender: ''
        })


        setListUpdated(true)
    }

    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Año</th>
                    <th>Edad</th>
                    <th>Genero</th>
                </tr>
            </thead>
            <tbody>
                {students.map(rs => (
                    <tr key={rs.id}>
                        <td>{rs.id}</td>
                        <td>{rs.name}</td>
                        <td>{rs.email}</td>
                        <td>{rs.year}</td>
                        <td>{rs.age}</td>
                        <td>{rs.gender}</td>
                        <td>
                            <div className="mb-1">
                                <button onClick={() => handleDelete(rs.id)} className="btn btn-danger">Eliminar</button>
                            </div>
                            <div className="mb-1">
                                <button onClick={() => handleUpdate(rs.id)} className="btn btn-dark">Actualizar</button>
                            </div>
                            <div className="mb-1">
                                <Link   onFocus={() => handleClick(rs.id)} to='/notes' className="btn btn-success">Notas</Link>
                            </div>
                        </td>
                    </tr>
                )        
                )}
            </tbody>
        </table>
    );
}

export default Estudiantes;