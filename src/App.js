import React, {  useState, useEffect } from "react";
import Navbar from './Components/Navbar.js'
import Estudiantes from "./Components/Estudiantes.js";
import Notes from "./Components/Notes.js";
import Form from "./Components/Form.js";
import FormNote from "./Components/FormNote.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
function App() {
  const [student, setStudent] = useState({ 
    id: '',
    name: '',
    email: '',
    year: '',
    age: '',
    gender: ''
  });


  const [note, setNote] = useState({
    id: '',
    student: '',
    name: '',
    value: '',
    fecha: ''
  });

  const [avarange, setAvarange] = useState({
    id: '',
    name: '',
    avarange: '0'
  });

  const [students, setStudents] = useState([]);

  const [notes, setNotes] = useState([]);


  const [maxNote, setMaxNote] = useState({
    name: '',
    value: ''
  });

  const [listUpdated, setListUpdated] = useState(false);

  const [data, setData] = useState({
    name: '',
    value: '0',
    color: "#196f3d",
  });

  
 
  useEffect(() => {
    const getStudents = () => {
      fetch('http://3.92.64.73:5900/api/students/getAll')
        .then(res => res.json())
        .then(res => setStudents(res))

        fetch('http://3.92.64.73:5900/api/notesStudents/getAvaranges')
        .then(res => res.json())
        .then(res => setData(res))

        fetch('http://3.92.64.73:5900/api/notesStudents/getMaxNote')
        .then(res => res.json())
        .then(res => setMaxNote(res[0]))

      fetch('http://3.92.64.73:5900/api/notesStudents/getAvarange/' + note.student)
        .then(res => res.json())
        .then(res => setAvarange(res[0]))

      fetch('http://3.92.64.73:5900/api/notesStudents/get/' + note.student)
        .then(res => res.json())
        .then(res => setNotes(res))
      console.log(note);
    }
    getStudents()
    setListUpdated(false)
    
  }, [listUpdated]);




  return (
    <Router>
      <div className="app">
        <Navbar brand='Estudiantes' buttonLink={Link} />

        <Switch>
          <Route path="/notes">
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <h2 style={{ textAlign: "center" }} className="text-primary">Lista De Notas</h2>
                  <p style={{ textAlign: "center" }} classclass="badge bg-primary text-wrap" ><b className="px-2">Nombre:</b> {avarange.name}<b className="px-2"> Promedio:</b> {(Math.round(avarange.avarange * 100) / 100).toFixed(1) }</p>
                  <Notes note={note} notes={notes} setListUpdated={setListUpdated} setNote={setNote} />
                </div>
                <div className="col-5">
                  <h2 style={{ textAlign: 'center' }}>Crear Nota</h2>
                  <FormNote note={note} setNote={setNote} setListUpdated={setListUpdated}/>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/graphics">
            <div className="app" style={{ width: '100%', height: '500px', alingcenter: "center" }}>
              <h3 style={{ textAlign: "center", color: "rgba(130, 202, 157)" }}>Mejor Estudiantes</h3>
              <p style={{ textAlign: "center" }} classclass="badge bg-primary text-wrap" ><b className="px-2">Nombre:</b> {maxNote.name}<b className="px-2"> Nota:</b> {(Math.round(maxNote.value * 100) / 100).toFixed(1) }</p>
              <ResponsiveContainer width="100%" height="100%">
              <BarChart
          max={5}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis domain={[0, 5]}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="nota" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>

                            </div>
          </Route>
          <Route path="/">
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <h2 style={{ textAlign: "center" }}>Lista Estudiantes</h2>
                  <Estudiantes student={student} students={students} setListUpdated={setListUpdated} setStudent={setStudent} buttonLink={Link} note={note} />
                </div>
                <div className="col-5">
                  <h2 style={{ textAlign: 'center' }}>Crear Estudiante</h2>
                  <Form student={student} setStudent={setStudent} />
                </div>

              </div>

            </div>
          </Route>


        </Switch>

      </div>
    </Router>

  );
}

export default App;
