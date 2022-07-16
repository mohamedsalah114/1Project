import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../index";
import moduleStyle from "../modules/Admin.module.css"
import {
    createDish,
    fetchCategory,
    fetchIngridients,
    fetchMeaSure,
    fetchNationality,
    fetchSpecialGroup
} from "../http/dishAPI";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import {forEach} from "react-bootstrap/ElementChildren";


const Admin = observer(() => {
    const {dish} = useContext(Context)
    const [title, setTitle] = useState('')
    const [cookingTime, setCookingTime] = useState(0)
    const [description, setDescription] = useState('')
    const [info, setInfo] = useState([])
    const [file, setFile] = useState(null)

    let token = localStorage.getItem(localStorage.key(0))
    let userId = token

    useEffect(() => {
        fetchCategory().then(data => dish.setCategories(data))
        fetchNationality().then(data => dish.setNationalities(data))
        fetchSpecialGroup().then(data => dish.setSpecialGroup(data))
        fetchMeaSure().then(data => dish.setMeaSure(data))
        fetchIngridients().then(data => dish.setIngridient(data))
    }, [])

    console.log(dish.ingridients)

    const addInfo = () => {
        setInfo([...info, {ingridient_id: 0, amount: 0, measure_id: 0, additionally: " ", number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDish = () => {

        let composition = []
        info.forEach(i =>
            composition.push({
                ingridient_id: i.ingridient_id,
                amount: i.amount,
                measure_id: i.measure_id,
                additionally: i.additionally
                }
            )
        )
        console.log(composition)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('cooking_time', `${cookingTime}`)
        formData.append('img', file)
        formData.append('category_id', dish.selectedCategory.id)
        formData.append('nationality_id', dish.selectedNationality.id)
        formData.append('special_group_id', dish.selectedSpecialGroup.id)
        formData.append('info', JSON.stringify(composition))
        formData.append('user_id', userId)
        createDish(formData).then(data => console.log(data[0]))
    }


    return (
        <div className={moduleStyle.form}>
            <Form>
                <h1>Добавление рецепта</h1>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{dish.selectedCategory.title || "Выберите категорию"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dish.categories.map(category =>
                            <Dropdown.Item
                                onClick={() => dish.setSelectedCategory(category)}
                                key={category.id}
                            >
                                {category.title}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{dish.selectedNationality.name || "Выберите кухню"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dish.nationalities.map(nationality =>
                            <Dropdown.Item
                                onClick={() => dish.setSelectedNationality(nationality)}
                                key={nationality.id}
                            >
                                {nationality.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{dish.selectedSpecialGroup.name || "Выберите назначение"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dish.specialGroup.map(specialGroup =>
                            <Dropdown.Item
                                onClick={() => dish.setSelectedSpecialGroup(specialGroup)}
                                key={specialGroup.id}
                            >
                                {specialGroup.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4>Название</h4>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название блюда"/>
                <h4>Инструкция приготовления</h4>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                              placeholder="Инструкция приготовления"/>
                <h4>Время приготовления (мин)</h4>
                <Form.Control value={cookingTime} onChange={(e) => setCookingTime(Number(e.target.value))}
                              placeholder="Примерное время (мин)"/>
                <hr/>
                <h4>Фотография</h4>
                <Form.Control onChange={selectFile} type="file"/>
                <hr/>
                {info.map(i =>
                    <Row className="mt-4" key={i.number}>
                        <Col md={3}>
                            <input value={i.ingridient_id} list="ingridients" placeholder="Ингредиент"
                                   onChange={(e) => changeInfo('ingridient_id', e.target.value, i.number)}/>
                                <datalist id="ingridients">
                                    {dish.ingridients.map(ingridient_id =>
                                        <option value={ingridient_id.id} onClick={() => dish.setSelectedIngridient(ingridient_id)}
                                                key={ingridient_id.id}>{ingridient_id.title}</option>)}
                                </datalist>
                        </Col>
                        <Col md={1}>
                            <Form.Control
                                value={i.amount}
                                onChange={(e) => changeInfo('amount', e.target.value, i.number)}
                                placeholder="Кол-во"
                            />
                        </Col>
                        <Col md={2}>
                            <select value={i.measure_id} onChange={(e) => changeInfo('measure_id', e.target.value, i.number)}>
                                {dish.measure_id.map(measure_id =>
                                    <option value={measure_id.id} onClick={() => dish.setSelectedMeaSure(measure_id)}
                                            key={measure_id.id}>{measure_id.title}</option>)}
                            </select>
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                value={i.additionally}
                                onChange={(e) => changeInfo('additionally', e.target.value, i.number)}
                                placeholder="Примечание"
                            />
                        </Col>
                        <Col md={1}>
                            <Button
                                onClick={() => removeInfo(i.number)}
                                variant={"outline-danger"}
                            >
                                ❌
                            </Button>
                        </Col>
                    </Row>
                )}
                <Button className="mt-3" variant={"outline-dark"} onClick={addInfo}>Добавить
                    ингридиент</Button>
            </Form>
            <Button className="mt-4" variant="outline-success" onClick={addDish}>Добавить</Button>
        </div>
    );
});

export default Admin;