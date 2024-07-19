import React from 'react';
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COURSE_ROUTE } from "../utils/const";
import moduleStyle from "../modules/CourseItem.module.css"

const CourseItem = ({ course }) => {

    const navigate = useNavigate();

    return (
        <Col>
            <Card className="mt-3" style={{ width: 200, cursor: 'pointer', borderRadius: '15px' }}
                onClick={() => navigate(COURSE_ROUTE + '/' + course.id)}
            >
                <Card.Img className={moduleStyle.courseImage} src={
                    process.env.REACT_APP_API_URL + course.img}
                    style={{ width: 198, height: 200, borderRadius: '15px' }} />
                <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CourseItem;
