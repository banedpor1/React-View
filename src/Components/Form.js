import React from "react";

const Form =({student, setStudent}) => {

     const handleChange = e => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value 
        })
     }

     let {name, email, year, age, gender} = student;
     const handleSubmit = () => {
        // Validacion 
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
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(student)
            }
            fetch('http://3.92.64.73:5900/api/students/create', requesInit)
            .then(res => res.text)
            .then(res => console.log(res))
            alert("Estudiante creado correctamente...")

            setStudent({
                name: '',
                email: '',
                year: '',
                age: '',
                gender: ''
            })
        }
     }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre:</label>
                <input value={name} onChange={handleChange} className="form-control" id="name" name="name" type="text" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input value={email} onChange={handleChange}  className="form-control" id="email" name="email" type="text" />
            </div>
            <div className="mb-3">
                <label htmlFor="year" className="form-label">Grado:</label>
                <input value={year} onChange={handleChange}  className="form-control" id="year" name="year" type="number" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Edad:</label>
                <input  value={age}  onChange={handleChange}  className="form-control" id="age" name="age" type="number" />
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Genero:</label><br />
                &nbsp;
                <input onChange={handleChange}  type="radio" id="M" name="gender" value="M" className="custom-control-input px-2 "  />
                <label for="M" className="custom-control-label">Masculino</label>
                &nbsp;&nbsp;
                <input onChange={handleChange} type="radio" id="F" name="gender" value="F" className="custom-control-input px-2 " />
                <label for="F" className="custom-control-label">Femenino</label>
       
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    )
}

export default Form;