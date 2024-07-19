import React, { useContext, useEffect } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCategories, fetchCourses, fetchLanguages, fetchTeachers } from "../http/courseAPI";
import LanguageBar from "../components/LanguageBar";
import CourseList from "../components/CourseList";
import Pages from "../components/Pages";

const Catalog = observer(() => {
    const { course } = useContext(Context);

    useEffect(() => {
        fetchCategories().then(data => course.setCategories(data));
        fetchLanguages().then(data => course.setLanguages(data));
    }, [course]);

    useEffect(() => {
        fetchCourses(course.selectedCategory.id, course.selectedLanguage.id, course.selectedTeacher.id, course.page, 8).then(data => {
            course.setCourses(data);
            course.setTotalCount(data.length);
        });
    }, [course.page, course.selectedCategory, course.selectedLanguage, course.selectedTeacher]);

    const clean = () => {
        if (!course.selectedSearch) {
            course.setSelectedCategory('*');
            course.setSelectedLanguage('*');
            course.setSelectedTeacher('*');
        } else {
            window.location.reload();
        }
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md={9}>
                    <CourseList />
                </Col>
                <Col md={3}>
                    <CategoryBar />
                    <LanguageBar className="mt-3" />
                    <Button className="mt-3" variant="outline-danger" onClick={clean}>Очистить</Button>
                </Col>
            </Row>
            <Pages />
        </Container>
    );
});

export default Catalog;
