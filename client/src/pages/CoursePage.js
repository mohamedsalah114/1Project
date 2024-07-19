import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Col, Container, Image, Row, Card, Button, CardBody, CardTitle, CardText } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneCourse, fetchCheckTicket } from "../http/courseAPI";
import {
    signInToTheCourse
} from "../http/courseAPI";
import { jwtDecode as jwt_decode } from 'jwt-decode';

const CoursePage = () => {
    const [course, setCourse] = useState({});
    const [courseBooked, setCourseBooked] = useState(false);
    const { id } = useParams();

    const descriptionStyle = {
        color: '#333',
        fontSize: '18px',
        fontFamily: 'Helvetica Neue", Helvetica, Arial, sans-serif',
        lineHeight: '1.6',
        backgroundColor: 'white',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'left'
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = jwt_decode(token).id
        let courseId = course.id
        fetchCheckTicket(userId, courseId).then(data => setCourseBooked(data.data))
    })

    useLayoutEffect(() => {
        fetchOneCourse(id).then(data => setCourse(data[0]));
    }, [id]);

    const signIn = () => {
        let token = localStorage.getItem('token');
        let userId = jwt_decode(token).id;
        let courseId = course.id
        let ids = {
            'studentId': userId,
            'courseId': courseId,
            'teacherId': 1
        }
        signInToTheCourse(ids).then(data => alert('Вы записались на курс'));
        setCourseBooked(true)
    };

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={6} >
                    <p style={{ fontFamily: 'sans - serif', fontSize: '20px' }}>Course: {course.teacherName}</p>
                    <h1>{course.title}</h1>
                    <Image src={process.env.REACT_APP_API_URL + course.img}
                        style={{ backgroundSize: "cover", width: '400px', borderRadius: '15px' }} />
                </Col>
                <Col md={3} style={descriptionStyle}>
                    <h2 style={{ fontFamily: 'sans - serif' }}>Description</h2>
                    <p style={{ fontFamily: 'sans - serif' }}>{course.description}</p>
                </Col>
                <Row />
                <Card style={{ color: 'black', backgroundColor: 'white' }}>
                    <CardBody>
                        <CardTitle>sing in to the cousre.</CardTitle>
                        <CardText>start a new journy learning a new language.</CardText>
                        <Button variant='primary' onClick={signIn} disabled={courseBooked}>оставить заявку</Button>
                    </CardBody>
                </Card>
            </Row>
        </Container >
    );
};

export default CoursePage;
