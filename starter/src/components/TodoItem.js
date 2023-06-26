import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplite, deleteTodo, toggleCopmleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleToggleClick = () => {
    // dispatch(toggleComplite({ id, completed: !completed }));
    dispatch(toggleCopmleteAsync({ id: id, completed: !completed }));
  };

	const handleDeleteClick = () => {
		// dispatch(deleteTodo({ id }));
		dispatch(deleteTodoAsync({ id }));
	};

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleToggleClick}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
