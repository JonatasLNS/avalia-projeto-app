import React from 'react'

import { withRouter } from 'react-router-dom'
import { Nav } from "react-bootstrap";

import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'

import "bootstrap/dist/css/bootstrap.min.css";

class FormularioAvaliacao extends React.Component{
    state = {

        listaDimensoes : [
            { id: 1, 
              descricao: 'Foco Investigativo',
              subdescricao: 'O quê?',
              subdimensao: [
                    {
                        id: 1,
                        descricao: 'Titulo do projeto',
                        eixo: [
                            {id: 1, descricao: 'O título está relacionado com o tema problematizado?'},
                            {id: 2, descricao: 'O título apresenta o trabalho desenvolvido?'},
                            {id: 3, descricao: 'O título atrai o leitor?'},
                            {id: 4, descricao: 'O título está relacionado com uma pesquisa matricial?'},
                            {id: 5, descricao: 'O titulo está relacionado com a Linha e o Grupo de Pesquisa?'}
                        ]
                    },
                    {
                        id: 2,
                        descricao: 'Tema de pesquisa e objeto da pesquisa',
                        eixo: [
                            {id: 1, descricao: 'O tema está bem definido no contexto do objeto?'},
                            {id: 2, descricao: 'O tema possibilita ser confusão com titulo do trabalho?'},
                            {id: 3, descricao: 'O objeto está bem delimitado?'},
                            {id: 4, descricao: 'O objeto está presente no título e inserido na temática?'}
                        ]
                    },
                ]
            }
        ]

    }

    render(){
        
        return(
            
        
            <div>
                <div className="card bg-light mb-3" >
                    {/* CARD DA PÁGINA */}
                    <div className="card-header"><h4>Avaliação do Projeto:</h4></div>
                    <div className="card-body">
                        
                        {/* CARD DO CABEÇÁLIO */}
                        <div className="card mb-3">
                            <h5 className="card-header">TEMA: A avaliação da produção científica na UCSAL</h5>
                            <div className="card-body">
                                <h6 className="card-title">Aluno: Jônatas Lucas Nonato dos Santos</h6>
                                <h6 className="card-subtitle text-muted">Curso: Bacharelado em Informática</h6> <br />
                                <h6 className="card-subtitle text-muted">Semestre: 2021.1</h6>
                            </div>
                        </div>
                        
                        {/* FORMULARIO DE AVALIAÇÃO */}
                        
                            <div className="row">
                                <div className="container">
                                    <Nav justify variant="pills" defaultActiveKey="link-1" >
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1">O quê?</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2">Porquê?</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3">Com base em quê?</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-4">Como?</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                           <CardAvaliacaoDimensao listaDimensoes={this.state.listaDimensoes}></CardAvaliacaoDimensao>

                        {/* BOTÕES */}
                        <div className="row justify-content-end">
                            <div className='form-group'>
                                <div className="col-md-12 ms-auto">   
                                        <button  type="button" className="btn btn-success mr-1">Salvar</button>
                                        <button  type="button" className="btn btn-danger">Cancelar</button>
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