import React, {useContext, useEffect, useLayoutEffect} from 'react';
import background from '../assets/background.jpg'
import {Button, Form, ListGroup, Row} from "react-bootstrap";
import moduleStyle from "../modules/Search.module.css";
import NationalityBar from "./NationalityBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchIngridients} from "../http/dishAPI";
import * as mobx from "mobx";


const Search = observer(() => {
    const {dish} = useContext(Context)


    const array = JSON.parse(JSON.stringify(dish.ingridients))


    return (
        <div className={moduleStyle.cover} style={{
            background: `url(${background})`,
        }}>
            <Form className="d-flex flex-column">
                <Row className={moduleStyle.searchBar}>
                    <select className={moduleStyle.input} value={dish.ingridientSearch} onChange={(e) => dish.setIngridientSearch(e.target.value)} >
                        {        array.map(i =>
                            <option value={i.id} onClick={() => dish.setSelectedIngridient(i.id)}
                                    key={i.id}>{i.title}</option>
                        )}
                    </select>
                    {/*<input className={moduleStyle.input}*/}
                    {/*       value={dish.ingridientSearch}*/}
                    {/*       list="ingredient"*/}
                    {/*       placeholder="Ингредиент"*/}
                    {/*       onChange={(e) => dish.setIngridientSearch(e.target.value)}/>*/}
                    {/*<datalist id="ingredient">*/}
                    {/*    /!*{*!/*/}
                    {/*        array.map(i =>*/}
                    {/*            <option value={i.id} onClick={() => dish.setSelectedIngridient(i.id)}*/}
                    {/*                    key={i.id}>{i.title}</option>*/}
                    {/*        )*/}
                    {/*    /!*}*!/*/}
                    {/*</datalist>*/}
                    {/*<Form.Control value={dish.ingridientSearch}*/}
                    {/*              onChange={(e) => dish.setIngridientSearch(e.target.value)}*/}
                    {/*              className={moduleStyle.input} style={{borderRadius: '25px'}}*/}
                    {/*              placeholder="Поиск по рецептам"/>*/}
                    <Button className={moduleStyle.button} variant="primary"
                            onClick={() => dish.setSelectedIngridientSearch(dish.ingridientSearch)}>Найти</Button>
                </Row>
            </Form>
            <NationalityBar/>
        </div>
    );
});

export default Search;