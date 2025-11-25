import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import ComponentItem from './ComponentItem/ComponentItem'
import Tasks from '../../../tasks.json'
import './ComponentList.css'

const ComponentList = () => {

  const [items, setItems] = useState([]); // Array de Tareas

  // Estado inicial del formulario
  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) =>  {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([values, ...items]);

    setValues({
    title: "",
    description: ""
    });
  }

  const paintTask = () => items.map((item, index) => <ComponentItem 
  data={item} 
  remove = {() => removeTask(index)} 
  edit={(updatedTask) => editTask(index, updatedTask)} 
  key={uuidv4()}/>);
  // Mostrar las tareas
  const resetTasks = () => setItems(Tasks)
  // Eliminar Tareas
  const deleteTasks = () => setItems([]);

  const editTask = (i, updatedTask) => {
    let data = [...items];
    data[i] = updatedTask;
    setItems(data);
  }

  // Borrar tarea específica
  const removeTask = (i) => {
    const filteredTasks = items.filter((item, index) => index !== i);
    setItems(filteredTasks);
  }

  return <section className="section-list">
    <form onSubmit={handleSubmit}>
      <h2>Crea tu tarea:</h2>
      <label htmlFor="title">Título</label>
      <input type="text" name="title" id="title" value={values.title} onChange={handleChange}/>

      <label htmlFor="description">Descripción</label>
      <textarea name="description" id="description" value={values.description} onChange={handleChange}></textarea>
      {
        values.title && values.description ? (
          <button type="submit">ADD</button> ) : (
            <button id="validation-btn" disabled>Completa todos los campos</button>
          )
        }
    </form>

    {/* <p>¿Quiere eliminar todas las tareas?</p> */}
    <button onClick={deleteTasks}>Eliminar Tareas</button>

    {/* <p>Resetea las tareas</p> */}
    <button onClick={resetTasks}>Mostrar Tareas</button>

        <h2>Todas las Tareas</h2>
    { paintTask() }
  </section>;
};

export default ComponentList;
