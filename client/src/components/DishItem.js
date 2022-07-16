import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {DISH_ROUTE} from "../utils/const";
import moduleStyle from "../modules/DishItem.module.css"

const DeviceItem = ({dish}) => {

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    let dateString = dish.created_at.toString()
    let date = new Date(dateString).toLocaleString("ru", options);

    const history = useHistory()
    // let description = dish.description
    // description = description.slice(0, 60)
    return (
        <Col>
            <Card className="mt-3" style={{width: 200, cursor: 'pointer', borderRadius: '15px'}}
                  onClick={() => history.push(DISH_ROUTE + '/' + dish.id)}
            >
                <Card.Img className={moduleStyle.dishImage} src={
                    process.env.REACT_APP_API_URL + dish.img}
                          style={{width: 198, height: 200, borderRadius: '15px'}}/>
                <Card.Body>
                    <Card.Title>{dish.title}</Card.Title>
                    <hr/>
                    <b>Добавлено </b>
                    <Card.Text>{date}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;