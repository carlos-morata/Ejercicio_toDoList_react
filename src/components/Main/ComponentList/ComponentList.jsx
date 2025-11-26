import React, { useState, useEffect } from "react";
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

  // Mensaje tarea añadida
  const [taskAdd, setTaskAdd] = useState(false);

  // Validación -> 6 caracteres
  const [error, setError] = useState("");

  const handleChange = (e) =>  {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (values.title.trim().length < 6) {
    setError("El título debe tener al menos 6 caracteres.");
    return; // Evita la creación de la tarea
  }

  setError("");

    setItems([values, ...items]);

    setValues({
    title: "",
    description: ""
    });

  setTaskAdd(true);
  setTimeout(() => setTaskAdd(false), 5000);
  }

  useEffect(() => {
    // Si no hay nada escrito, no hace nada
    if (!values.title && !values.description) return;
    // el timeout
    const timer = setTimeout(() => {
      setValues({ title: "", description: "" }); // vaciar formulario
    }, 5000);
    // Limpiar el timeout si el usuario escribe algo o envía
    return () => clearTimeout(timer);
  }, [values]);

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
      {error && <p className="msg-error">{error}</p>}

      <label htmlFor="description">Descripción</label>
      <textarea name="description" id="description" value={values.description} onChange={handleChange}></textarea>
      {
        values.title && values.description ? (
          <button type="submit">ADD</button> ) : (
            <button id="validation-btn" disabled>Completa todos los campos</button>
          )
        }
        
    </form>

     {taskAdd && <p className="msg-add">Tarea añadida</p>}

    {/* <p>¿Quiere eliminar todas las tareas?</p> */}
    <button onClick={deleteTasks}>Eliminar Tareas</button>

    {/* <p>Resetea las tareas</p> */}
    <button onClick={resetTasks}>Mostrar Tareas</button>

        <h2>Todas las Tareas</h2>
    { paintTask() }
  </section>;
};

export default ComponentList;
