import './App.css';
import { useState } from 'react';
import AddTeacher from './AddTeacher';
import Dashboard from './Dashboard';
import { useEffect } from 'react';
import { searchBySkills } from './Lib';

const App = () => {
  const [teachers, setTeachers] = useState([])
  const [result,setResult] = useState([])
  const skills = [
        "HTML","CSS","JS","REACT","ANGULAR","NODE",
        "C#","OOP","WPF","SQL","ALGORITHS","JAVA",
        "ANDROID","KOTLIN","IOS"
  ]
  const add = T => setTeachers([...teachers,T])

  const updateList = list => {
    list = list.filter(a => a.active).map(a => a.title)
    let data = searchBySkills(teachers, list)
    setResult(data)
  }
  useEffect(()=>{
    fetch("teacher.json")
    .then(r => r.json())
    .then(r => {
              setTeachers(r.data)
              setResult(r.data)
            })
  },[])
  return <div>
        <h1 className='heading'>Teaching App! {teachers.length} teachers are here</h1>
        <div id='main'>
          <AddTeacher data={skills} addTeacherMethod={add}/>
          <Dashboard fn={updateList} skills={skills} teachers={result}/>
        </div>
  </div>
}
export default App;
