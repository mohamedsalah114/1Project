import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneDish, fetchOneDishCompound} from "../http/dishAPI";
import WebSock from "../components/WebSock";


const DishPage = () => {
    const [dish, setDish] = useState({})
    const [info, setInfo] = useState([])
    const {id} = useParams()

    useLayoutEffect(() => {
        fetchOneDish(id).then(data => setDish(data[0]))
        fetchOneDishCompound(id).then(data => setInfo(data))
    }, [])

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={6}>
                    <h1>{dish.title}</h1>
                    <p>Рецепт от: {dish.nickname}</p>
                    <Image src={process.env.REACT_APP_API_URL + dish.img}
                           style={{backgroundSize: "cover", width: '400px', borderRadius: '15px'}}/>
                </Col>
                <Col md={3}>
                    <h2>Как приготовить</h2>
                    <p>{dish.description}</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <h2>Ингредиенты</h2>
                {
                    info.map((i, index) =>
                        <Row key={index}  style={{backgroundColor: index % 2 === 0 ? '#808B96 ' : 'transparent', padding: 10}} >
                            <Col>
                                {i.ingridient}
                            </Col>
                            <Col>{i.amount}</Col>
                            <Col>{i.measure}</Col>
                            <Col>( {i.additionally} )</Col>
                        </Row>
                    )
                }
            </Row>
            <Row className="mt-5">
                <WebSock/>
            </Row>
        </Container>
    );
};

export default DishPage;