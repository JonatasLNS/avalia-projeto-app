import React from 'react'

import { withRouter } from 'react-router-dom'
import { Nav } from "react-bootstrap";
import update from 'immutability-helper';

import TabItem from '../components/tabItem'
import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'
import CardSubdimensoes from '../components/cardSubdimensoes'
import FormGroup from '../components/form-group'
import ProjetoService from '../app/service/projetoService'
import DimensaoService from '../app/service/dimensaoService'
import SelectMenu from '../components/selectMenu'

import "bootstrap/dist/css/bootstrap.min.css";
import tabItem from '../components/tabItem';

class FormularioAvaliacao extends React.Component{

    state = {
        tabSelecionada: "link-0",
        projeto: {},
        aluno:{},
        listaDimensoes : [],
        subdimensoesState : [],
        listaOpcoes : [
            { label: 'Selecione...' , value: '' },
            { label: 'SIM' , value: '1' },
            { label: 'NÃO' , value: '2' },
            { label: 'PARCIALMENTE' , value: '3' },
            { label: 'NÃO SE APLICA' , value: '4' }
        ]
    }

    componentDidMount(){

        const projetoService = new ProjetoService();
        const dimensaoService = new DimensaoService();
        
        const params = this.props.match.params

        projetoService.obterProjetoById(params.id)
            .then( resposta => {

                this.setState({ 
                    projeto: resposta.data,
                    aluno: resposta.data.aluno
                })

            }).catch( error =>  {
                console.log(error)
            })

        dimensaoService.listarDimensoes()
            .then( resposta => {
                this.setState({ 
                    listaDimensoes: resposta.data
                })

                //console.log(this.state.listaDimensoes)

            }).catch( error =>  {
                console.log(error)
            })
    }

    handleTabClick = (idTab) => {
        this.setState({ tabSelecionada: idTab})
    }

    handleChangeDimensao = (e, eixo) => {
   
        this.setState(update(this.state, {
            subdimensoesState: {
                [eixo.id]: {
                    $set: e.target.value
                }
            }
        }));
      
    }

    cancelar = () => {
        this.props.history.push('/home')
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
                            <h5 className="card-header">{`TEMA : ${this.state.projeto.tema}`}</h5>
                            <div className="card-body">
                                <h6 className="card-title">{`Aluno: ${this.state.aluno.nome}`}</h6>
                                <h6 className="card-subtitle text-muted">{`Curso: ${this.state.aluno.curso}`}</h6> <br />
                                <h6 className="card-subtitle text-muted">{`Semestre: ${this.state.projeto.ano}.${this.state.projeto.semestre}`}</h6>
                            </div>
                        </div>
                        
                        {/* FORMULARIO DE AVALIAÇÃO */}

                        {/* Abas */}
                        <div className="row">
                            <div className="container">
                                <Nav justify variant="pills" defaultActiveKey={this.state.tabSelecionada} >
                                    {
                                        this.state.listaDimensoes.map((dimensao, index) =>
                                            
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={"link-"+index} onSelect={() => this.handleTabClick(`link-${index}`)}>{dimensao.subdescricao}</Nav.Link>
                                            </Nav.Item>
                                        )       
                                    }
                                </Nav>
                            </div>
                        </div>

                        {/* Conteúdo das Abas */}
                        <CardAvaliacaoDimensao listaDimensoes={this.state.listaDimensoes} tabSelecionada={this.state.tabSelecionada}>
                            {
                                this.state.listaDimensoes.map( dimensao => {
                                    return(   
                                        <div key={dimensao.id}>
                                            {
                                                <CardSubdimensoes listaSubdimensoes={dimensao.subdimensoes}>
                                                    {
                                                        dimensao.subdimensoes.map((subdimensao, index) => {
                                                            return(
                                                                <div key={index}>
                                                                    {
                                                                        subdimensao.eixos.map((eixo) =>
                                                                        <div key={eixo.id}>
                                                                            <FormGroup label={eixo.descricao} htmlFor={"selectEixo"+eixo.id}>
                                                                                <SelectMenu 
                                                                                    className='form-control' 
                                                                                    lista={this.state.listaOpcoes}
                                                                                    onChange={ e => this.handleChangeDimensao(e, eixo)}
                                                                                    value = {this.state.subdimensoesState[eixo.id]}>
                                                                                </SelectMenu>
                                                                            </FormGroup>
                                                                        </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </CardSubdimensoes>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </CardAvaliacaoDimensao>

                        {/* BOTÕES */}
                        <div className="row justify-content-end">
                            <div className='form-group'>
                                <div className="col-md-12 ms-auto">   
                                        <button  type="button" className="btn btn-success mr-1">Salvar</button>
                                        <button  type="button" className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
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