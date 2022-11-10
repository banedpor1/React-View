import React from "react";

const Notes = ({ note, notes, setListUpdated, listNotes, setNote }) => {


    const handleDelete = id => {
        const requesInit = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }
        fetch('http://3.92.64.73:5900/api/notesStudents/delete', requesInit)
            .then(res => res.text)
            .then(res => console.log(res))
        alert("Nota eliminada correctamente...")

        setListUpdated(true)

    }

    let {student, value} = note;

    const handleUpdate = id => {
        note.id = id

       // Validacion 
       if( value === '') {
        alert('Faltan campos por llenar')
        return
    }   else {

            const requesInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            }
            fetch('http://3.92.64.73:5900/api/notesStudents/update', requesInit)
                .then(res => res.text)
                .then(res => console.log(res))
            alert("Nota actualizado correctamente...")
            setListUpdated(true)
        }
    }

    return (

        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {notes.map(rs => (
                    <tr key={rs.id}>
                        <td>{rs.id}</td>
                        <td>{rs.value}</td>
                        <td>{rs.fecha.toString()}</td>
                        <td>
                            <div className="mb-1">
                                <button onClick={() => handleDelete(rs.id)} className="btn btn-danger">Eliminar</button>
                            </div>
                            <div className="mb-1">
                                <button  onClick={() => handleUpdate(rs.id)}  className="btn btn-dark">Actualizar</button>
                            </div>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>


    );
}

export default Notes;