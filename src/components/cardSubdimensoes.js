import React from 'react'
import { Accordion, Card } from "react-bootstrap";

const cardSubdimensoes = (props) => {

    const subdimensoes = props.listaSubdimensoes;

    const listItems = subdimensoes.map((subdimensao,index) =>
        <div key={subdimensao.id}>
            <Accordion>
            <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" >{subdimensao.descricao}</Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div> 
                            {props.children[index]}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </div>
    )

    return (
        <div>{listItems}</div>
    )

}

export default cardSubdimensoes

