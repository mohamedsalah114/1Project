import React, {useContext, useEffect, useLayoutEffect} from 'react';
import background from '../assets/background.jpg'
import {Button, Form, ListGroup, Row} from "react-bootstrap";
import moduleStyle from "../modules/Search.module.css";
import NationalityBar from "./NationalityBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Search = observer(() => {
    const {dish} = useContext(Context)


    const array = JSON.parse(JSON.stringify(dish.ingridients))


    return (
        <div className={moduleStyle.cover} style={{
            background: `url(${background})`,
        }}>
            <Form className="d-flex flex-column">
                <Row className={moduleStyle.searchBar}>
                    <input className={moduleStyle.input} list="ingredients-choice" id="ingredients"
                           onChange={(e) => dish.setIngridientSearch(e.target.value)}
                    />
                    <datalist id="ingredients-choice">
                        {
                            array.map(i =>
                            <option value={i.id} onClick={() => dish.setSelectedIngridient(i.id)}
                                    key={i.id}>{i.title}</option>)
                        }
                    </datalist>
                    <Button className={moduleStyle.button} variant="primary"
                            onClick={() => dish.setSelectedIngridientSearch(dish.ingridientSearch)}>Найти</Button>
                </Row>
            </Form>
            <NationalityBar/>
        </div>
    );
});

export default Search;