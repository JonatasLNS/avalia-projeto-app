import React from 'react'
import { Accordion, Card } from "react-bootstrap";

import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'

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
                            <FormGroup label="O título está relacionado com o tema problematizado?" htmlFor="inputFormTitulo1">
                                <SelectMenu className='form-control' lista={listaOpcoes}></SelectMenu>
                            </FormGroup>
                            <FormGroup label="O título apresenta o trabalho desenvolvido?" htmlFor="inputFormTitulo2">
                            <SelectMenu className='form-control' lista={listaOpcoes}></SelectMenu>
                                </FormGroup>
                            <FormGroup label="O título atrai o leitor?" htmlFor="inputFormTitulo3">
                                <SelectMenu className='form-control' lista={listaOpcoes}></SelectMenu>
                            </FormGroup>
                            <FormGroup label="O título está relacionado com uma pesquisa matricial?" htmlFor="inputFormTitulo4">
                                <SelectMenu className='form-control' lista={listaOpcoes}></SelectMenu>
                            </FormGroup>
                            <FormGroup label="O titulo está relacionado com a Linha e o Grupo de Pesquisa?" htmlFor="inputFormTitulo5">
                                <SelectMenu className='form-control' lista={listaOpcoes}></SelectMenu>
                            </FormGroup>
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

