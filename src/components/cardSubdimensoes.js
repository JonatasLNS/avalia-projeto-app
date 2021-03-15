import React from 'react'
import { Accordion, Card } from "react-bootstrap";

import ItemFormEixo from '../components/itemFormEixo'

export default (props) => {

    const subdimensoes = props.listaSubdimensoes;
    
    const listaOpcoes = [
        { label: 'Selecione...' , value: '' },
        { label: 'SIM' , value: '1' },
        { label: 'NÃO' , value: '2' },
        { label: 'PARCIALMENTE' , value: '3' }
    ]

    const listItems = subdimensoes.map((subdimensao) =>
        <div key={subdimensao.id}>
            <Accordion>
            <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" >{subdimensao.descricao}</Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div> 
                            <ItemFormEixo listaEixos={subdimensao.eixo}></ItemFormEixo>
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

