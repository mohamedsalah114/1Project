import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, CATALOG_ROUTE} from "../utils/const";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    // const [avatar, setAvatar] = useState(null)

    // const selectFile = e => {
    //     setAvatar(e.target.files[0])
    // }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, nickname)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(CATALOG_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        autoComplete="on"
                    />
                    {isLogin ? null : [
                        <Form.Control
                        className="mt-3"
                        placeholder="Введите имя, под которым Вас будут видеть пользователи"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />,
                        // <Form.Label>Фотография профиля</Form.Label>,
                        // <Form.Control type="file" className="mt-3" onChange={selectFile}/>
                    ]}
                    <Row className="d-flex justify-content-between align-items-center mt-3">
                        {isLogin ?
                            <div style={{width: "auto"}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink>
                            </div>
                            :
                            <div style={{width: "auto"}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button style={{width: "auto"}} variant={"outline-success"} onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;