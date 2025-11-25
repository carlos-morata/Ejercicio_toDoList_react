import React, { useState } from "react";
import './ComponentItem.css'

const ComponentItem = ({ data, remove, edit }) => {
  
  // Muestra o esconde el formulario para editar tarea
  const [isEditing, setIsEditing] = useState(false);
  // Carga datos para editarlos
  const [editValues, setEditValues] = useState({ ...data });

  const handleEditChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Edita el elemento y lo actualiza en el array
    edit(editValues);
    // Oculta el formulario
    setEditValues(false);
  }

  const {title, description} = data;

  return <article className="container-task">
      <h3>{title || "--"}</h3>
      <p>{description || "--"}</p>
      <label htmlFor="task">Tarea Completada</label>
      <input type="checkbox" name="task" id="task" />
      <button onClick={remove}>Borrar</button>
      <button onClick={() => setIsEditing(true)}>Editar</button>
      { isEditing ? 
      <form onSubmit={handleEditSubmit}>
        <input 
        type="text"
        name="title"
        value={editValues.title}
        className="edit"
        onChange={handleEditChange} />
        <textarea 
        name="description"
        value={editValues.description}
        className="edit-input"
        onChange={handleEditChange} />
        <button type="submit" id="save-btn">Guardar Cambios</button>
      </form>: ""

      }
  </article>;
};

export default ComponentItem;
