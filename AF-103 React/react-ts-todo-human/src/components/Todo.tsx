import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}



const Todo: React.FC = () => {
    const [todo, setTodo] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo: Todo = {
                id: todo.length + 1,
                text: inputValue,
                completed: false,
            };
            setTodo([...todo, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id: number) => {
        const updatedTodo = todo.filter(todo => todo.id !== id);
        setTodo(updatedTodo);
    };

    const toggleTodo = (id: number) => {
        const updatedTodo = todo.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodo(updatedTodo);
    };

    const handleEdit = (todo: Todo) => {
        setEditTodo(todo);
        setIsEdit(true);
        setInputValue(todo.text);
    };

    const updateTodo = () => {
        if (editTodo && inputValue.trim() !== '') {
            const updatedTodo = todo.map(todo =>
                todo.id === editTodo.id ? { ...todo, text: inputValue } : todo
            );
            setTodo(updatedTodo);
            setIsEdit(false);
            setEditTodo(null);
            setInputValue('');
        }
    };

    return (
        <div>
            <h1>To Do</h1>
            <div style={{ display: 'flex' }}>
                <Input
                    placeholder="add new todo"
                    value={inputValue}
                    onChange={handleChange}
                    style={{ marginBottom: '10px' }}
                />
                {isEdit ? (
                    <Button type="primary" onClick={updateTodo}>
                        Update Todo
                    </Button>
                ) : (
                    <Button type="primary" onClick={addTodo}>
                        Add Todo
                    </Button>
                )}
            </div>
            <List
                dataSource={todo}
                renderItem={todo => (
                    <List.Item
                        actions={[
                            <Checkbox
                                key="complete"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />,
                            <EditOutlined key="edit" onClick={() => handleEdit(todo)} />,
                            <DeleteOutlined key="delete" onClick={() => deleteTodo(todo.id)} />,
                        ]}
                    >
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Todo