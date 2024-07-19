import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../index";
import moduleStyle from "../modules/Admin.module.css"
import {
    createCourse,
    fetchCategories,
    fetchLanguages,
    fetchTeachers
} from "../http/courseAPI";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "../utils/const";
import { observer } from "mobx-react-lite";
import { jwtDecode as jwt_decode } from 'jwt-decode';

const Admin = observer(() => {
    const { course } = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [info, setInfo] = useState([]);
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState(0);

    let token = localStorage.getItem('token');
    let userId = jwt_decode(token).id;

    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories().then(data => course.setCategories(data));
        fetchLanguages().then(data => course.setLanguages(data));
        fetchTeachers().then(data => course.setTeachers(data));
    }, [course]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addCourse = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('img', file);
        formData.append('price', price);
        formData.append('category_id', course.selectedCategory.id);
        formData.append('language_id', course.selectedLanguage.id);
        formData.append('teacher_id', userId);
        createCourse(formData).then(data => console.log(data[0]));
        navigate(CATALOG_ROUTE)
    };

    return (
        <div className={moduleStyle.form}>
            <Form>
                <h1>Add Course</h1>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{course.selectedCategory.title || "Select Category"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {course.categories.map(category =>
                            <Dropdown.Item
                                onClick={() => course.setSelectedCategory(category)}
                                key={category.id}
                            >
                                {category.title}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{course.selectedLanguage.title || "Select Language"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {course.languages.map(language =>
                            <Dropdown.Item
                                onClick={() => course.setSelectedLanguage(language)}
                                key={language.id}
                            >
                                {language.title}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4>Title</h4>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" />
                <h4>Description</h4>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course Description" />
                <h4>Price</h4>
                <Form.Control value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
                <hr />
                <h4>Image</h4>
                <Form.Control onChange={selectFile} type="file" />
                <hr />
            </Form>
            <Button className="mt-4" variant="outline-success" onClick={addCourse}>Add Course</Button>
        </div>
    );
});

export default Admin;
