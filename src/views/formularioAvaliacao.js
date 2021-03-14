import React from 'react'

import { withRouter } from 'react-router-dom'
import { Accordion, Card } from "react-bootstrap";

import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'

import "bootstrap/dist/css/bootstrap.min.css";

class FormularioAvaliacao extends React.Component{
    render(){
        
        const listaOpcoes = [
            { label: 'Selecione...' , value: '' },
            { label: 'SIM' , value: '1' },
            { label: 'NÃO' , value: '2' },
            { label: 'PARCIALMENTE' , value: '3' }
        ]
        
        return(
            
        
            <div>
                <div className="card bg-light mb-3" >
                    <div className="card-header"><h4>Avaliação do Projeto:</h4></div>
                    <div className="card-body">

                    <div className="card mb-3">
                        <h5 className="card-header">TEMA: A avaliação da produção científica na UCSAL</h5>
                        <div className="card-body">
                            <h6 className="card-title">Aluno: Jônatas Lucas Nonato dos Santos</h6>
                            <h6 className="card-subtitle text-muted">Curso: Bacharelado em Informática</h6> <br />
                            <h6 className="card-subtitle text-muted">Semestre: 2021.1</h6>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <h5 className="card-header"> Fase 1 - Foco Investigativo: </h5>
                        <div className="card-body">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Titulo do projeto
                                    </Accordion.Toggle>

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

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Tema de pesquisa e objeto da pesquisa
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div>This is second tab body </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Problemática da pesquisa
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div>This is second tab body </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Objetivos
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div>This is second tab body </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        A(s) hipótese(s) e Perguntas norteadoras e(as) hipótese(es)
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div>This is second tab body </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    
                                </Card>
                            </Accordion>
                            <br />
                            <div className="row justify-content-end">
                                <div className='form-group'>
                                    <div className="col-md-12 ms-auto">   
                                            <button  type="button" className="btn btn-success mr-1">Avançar</button>
                                            <button  type="button" className="btn btn-danger">Cancelar</button>
                                    </div>
                                </div>    
                            </div>

                        </div>
                    </div>

                        
                        


                    </div>
                </div>
                


                
            </div>
        

        )
    }
}

export default withRouter( FormularioAvaliacao )