import React from 'react'

import { withRouter } from 'react-router-dom'
import { Nav } from "react-bootstrap";
import update from 'immutability-helper';

import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'
import CardSubdimensoes from '../components/cardSubdimensoes'
import FormGroup from '../components/form-group'
import FormGroupAvaliacao from '../components/form-group-avaliacao'
import ProjetoService from '../app/service/projetoService'
import DimensaoService from '../app/service/dimensaoService'
import SelectMenu from '../components/selectMenu'
import CardMensagem from '../components/cardMensagem'

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../components/toastr'

import "bootstrap/dist/css/bootstrap.min.css";

import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

class FormularioAvaliacao extends React.Component{

    constructor() {
        super()
        //this.handleCheck = this.handleCheck.bind(this);
    }

    state = {
        tabSelecionada: "link-0",
        checked: false,
        projeto: {},
        aluno:{},
        listaDimensoes : [],
        subdimensoesState : [],
        mostrarTextComentarioState: [],
        textAreaComentarioState: [],
        isCheckedState: [],
        listaOpcoes : [
            { label: 'Selecione...' , value: '' },
            { label: 'SIM - Este projeto está de acordo com este item.' , value: '1' },
            { label: 'NÃO - Este projeto não está de acordo a este item.' , value: '2' },
            { label: 'PARCIALMENTE - Este projeto está parcialmente de acordo a este item. ' , value: '3' },
            { label: 'NÃO SE APLICA - Este item não é aplicável a este projeto.' , value: '4' }
        ]
    }

    handleCheck = (e, eixo) => {

        if(e.target.checked){
            this.setState(update(this.state, {
                mostrarTextComentarioState: {
                    [eixo.id]: {
                        $set: true
                    }
                },
                isCheckedState: {
                    [eixo.id]: {
                        $set: true
                    }
                }
            }));

        }else{
            this.setState(update(this.state, {
                mostrarTextComentarioState: {
                    [eixo.id]: {
                        $set: false
                    }
                },
                isCheckedState: {
                    [eixo.id]: {
                        $set: false
                    }
                },
                textAreaComentarioState: {
                    [eixo.id]: {
                        $set: ''
                    }
                }
            }));
        }
        
    }

    confirm = () => {
        confirmDialog({
            message: 'A avaliação está incompleta, deseja salvar e continuar a avaliação mais tarde?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => this.acceptFunc(),
            reject: () => this.rejectFunc()
        });
    }

    confirmCancel = () => {
        confirmDialog({
            message: 'Os dados não foram salvos, deseja cancelar a avaliação?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => this.acceptCancel(),
            reject: () => this.rejectCancel()
        });
    }

    acceptFunc(){
        mensagemSucesso("SALVO!")
    }

    rejectFunc(){
        mensagemErro("não salvou")
    }

    acceptCancel(){
        this.props.history.push('/home')
    }

    rejectCancel(){
        
    }

    setChecked(){
        alert('teste')
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

            }).catch( error =>  {
                console.log(error)
            })

            this.state.listaDimensoes.map(dimensao => {
                dimensao.subdimensoes.map(subdimensao => {
                    subdimensao.eixos.map(eixo => {
                        this.setState(update(this.state, {
                            mostrarTextComentarioState: {
                                [eixo.id]: {
                                    $set: false
                                }
                            }
                        }));
                    })       
                })  
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

    handleChangeTextArea = (e, eixo) => {

        this.setState(update(this.state, {
            textAreaComentarioState: {
                [eixo.id]: {
                    $set: e.target.value
                }
            }
        }))
      
    }

    cancelar = () => {
        this.confirmCancel()
    }

    salvar = () => {

       
        if(this.validaAvaliacaoVazia()){
            mensagemAlerta("Preencha os dados da avaliação antes de salvar!");
        }else{
            if(!this.validaAvaliacaoCompleta()){
                this.confirm()
            }else{
                mensagemSucesso("SALVO!")
            }
        }

       // console.log(this.state.subdimensoesState)
    }

    validaAvaliacaoCompleta(){

        const subdimensoesState = this.state.subdimensoesState

        let isCompleta = true

        this.state.listaDimensoes.map( dimensao => {
            dimensao.subdimensoes.map(subdimensao => {
                subdimensao.eixos.map(eixo => {
                    if(!subdimensoesState[eixo.id]){
                        isCompleta = false
                    }
                })       
            })  
        })
        

        return isCompleta
   
    }

    validaAvaliacaoVazia(){

        const subdimensoesState = this.state.subdimensoesState

        let isVazia = true

        this.state.listaDimensoes.map( dimensao => {
            dimensao.subdimensoes.map(subdimensao => {
                subdimensao.eixos.map(eixo => {
                    if(subdimensoesState[eixo.id]){
                        isVazia = false
                    }
                })       
            })  
        })


        return isVazia
   
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

                        <CardMensagem title="Avaliação:"
                                      text="Utilize os campos abaixo para realizar a avaliação."
                        ></CardMensagem>

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
                                                                            <FormGroupAvaliacao label={eixo.descricao} htmlFor={"selectEixo"+eixo.id}>
                                                                                <SelectMenu 
                                                                                    className='form-control' 
                                                                                    lista={this.state.listaOpcoes}
                                                                                    onChange={ e => this.handleChangeDimensao(e, eixo)}
                                                                                    value = {this.state.subdimensoesState[eixo.id]}    
                                                                                >
                                                                                </SelectMenu>
                                                                            

                                                                                <div className="form-check" data-bs-toggle="tooltip" data-bs-placement="right" title="Não é obrigatório inserir um comentário.">
                                                                                    <input className="form-check-input" 
                                                                                            type="checkbox"  
                                                                                            checked={this.state.isCheckedState[eixo.id]}
                                                                                            id={"selectEixo"+eixo.id} 
                                                                                            onChange={e => this.handleCheck(e, eixo)}
                                                                                            disabled = {!this.state.subdimensoesState[eixo.id]}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor={"selectEixo"+eixo.id}> <i>Comentário</i></label>
                                                                                </div>

                                                                                {this.state.mostrarTextComentarioState[eixo.id] && 
                                                                                    <div class="mb-3">
                                                                                        <textarea class="form-control" 
                                                                                                    id={"textArea"+eixo.id} 
                                                                                                    rows="3"
                                                                                                    onChange={ e => this.handleChangeTextArea(e, eixo)}
                                                                                                    value = {this.state.textAreaComentarioState[eixo.id]} 
                                                                                                    
                                                                                        />
                                                                                    </div>
                                                                                }
                                                                            
                                                                            </FormGroupAvaliacao>

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
                                        <button  type="button" className="btn btn-success mr-1" onClick={this.salvar}>Salvar</button>
                                        <button  type="button" className="btn btn-danger"       onClick={this.cancelar}>Cancelar</button>
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