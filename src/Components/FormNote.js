import React from "react";

const FormNote =({note, setNote, setListUpdated}) => {

     const handleChange = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value 
        })
     }

     let {student, value} = note;

     const handleClick = id => {
        note.id = id

        // Validacion 
        if( value === '') {
         alert('Faltan campos por llenar')
         return
     }   else {
 
             const requesInit = {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(note)
             }
             fetch('http://3.92.64.73:5900/api/notesStudents/create', requesInit)
                 .then(res => res.text)
                 .then(res => console.log(res))
             alert("Nota actualizado correctamente...")
             setListUpdated(true)
         }

        
     }
    return (
        
        <form >
            <div className="mb-3">
                <label htmlFor="value" className="form-label">Nota:</label>
                <input value={value} onChange={handleChange} className="form-control" id="value" name="value" type="number" />
            </div>
            <button type="button" onClick={() => handleClick(note.id)}  className="btn btn-primary">Guardar</button>
        </form>
    )
}

export default FormNote;