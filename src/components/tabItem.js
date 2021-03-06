import React from 'react'
import { Nav } from "react-bootstrap";

export default (props) => {

    const dimensoes = props.listaDimensoes;

    const listNav = dimensoes.map((dimensao, index) =>
        <Nav.Item key={index}>
            <Nav.Link eventKey={"link-"+dimensao.id} onSelect={() => this.handleClick(`link-${dimensao.id}`)}>{dimensao.subdescricao}</Nav.Link>
        </Nav.Item>
    )

    return (
        <div className="row">
            <div className="container">
                <Nav justify variant="pills" defaultActiveKey={"link-"+dimensoes[0].id} >
                    {listNav}
                </Nav>
            </div>
        </div>
    )

}