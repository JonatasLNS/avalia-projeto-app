import React from 'react'

import Card from '../components/cards'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'
import { withRouter } from 'react-router-dom'

import { mensagemSucesso, mensagemErro } from '../components/toastr'
import AlunosService from '../app/service/alunoService'


class CadastroUsuario extends React.Component{

    state = {
        tema : '',
        ano : '',
        semestre : '',
        curso : '',
        matricula : '',
        nomeAluno : '',
        nomeProfessor: ''
    }

    constructor(){
        super();
        this.service = new AlunosService();
    }

    getAlunoByMatricula(){
        this.service.getByMatricula(this.state.matricula)
        .then( resposta => {

            this.setState({ nomeAluno :  resposta.data})

            console.log(resposta.data)
        }).catch( error =>  {
            console.log(error)
        })
    }

    validar(){
        const msgs = []

        if(!this.state.tema){
            msgs.push('O campo \'Tema\' é obrigatório.')
        }

        if(!this.state.ano){
            msgs.push('O campo \'Ano\' é obrigatório.')
        }
        
        if(!this.state.semestre){
            msgs.push('O campo \'Semestre\' é obrigatório.')
        }

        if(!this.state.curso){
            msgs.push('O campo \'Curso\' é obrigatório.')
        }

        if(!this.state.matricula){
            msgs.push('O campo \'Matrícula\' é obrigatório.')
        }

        return msgs;
    }

    cadastrar = () => {
        
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const usuario = {
            nome  : this.state.nome,
            email : this.state.email,
            senha : this.state.senha
        }
        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Projeto cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render(){

        const listaSemestre = [
            { label: 'Selecione...' , value: '' },
            { label: 'PRIMEIRO' , value: '1' },
            { label: 'SEGUNDO' , value: '2' }
        ]

        return(
            
                <Card title="Cadastro de Projetos">
                     <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">


                                <h4 className="card-title">Dados do Projeto:</h4>
                                
                                <div className="row">
                                    <div className="col-md-12">

                                            <FormGroup label="Tema: *" htmlFor="inputTema">
                                                <input type="text" 
                                                    id="inputTema" 
                                                    className="form-control"
                                                    name="tema" 
                                                    onChange={ e => this.setState({tema: e.target.value})} />
                                            </FormGroup>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-3">
                                            <FormGroup label="Matricula do Aluno: *" htmlFor="inputMatricula">
                                                <input type="text" 
                                                    id="inputMatricula" 
                                                    className="form-control"
                                                    name="matricula" 
                                                    onChange={ e => this.setState({matricula: e.target.value})} 
                                                />
                                            </FormGroup>
                                    </div>
                                    <div className="col-md-9">
                                            <FormGroup label="Nome do Aluno: *" htmlFor="inputNomeAluno">
                                                <input type="text" 
                                                    id="inputNomeAluno" 
                                                    className="form-control"
                                                    name="nomeAluno" 
                                                    onChange={ e => this.setState({nomeAluno: e.target.value})} 
                                                />
                                            </FormGroup>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-3">
                                        <FormGroup label="Ano: *" htmlFor="inputAno">
                                            <input type="text" 
                                                id="inputAno" 
                                                className="form-control"
                                                name="ano" 
                                                onChange={ e => this.setState({ano: e.target.value})} /> 
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-3">
                                        
                                        <FormGroup label="Semestre: *" htmlFor="inputSemestre">
                                           <SelectMenu className='form-control' lista={listaSemestre}></SelectMenu>
                                        </FormGroup>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup label="Curso: *" htmlFor="inputCurso">
                                            <input type="text" 
                                                id="inputCurso" 
                                                className="form-control "
                                                name="curso" 
                                                onChange={ e => this.setState({curso: e.target.value})} /> 
                                        </FormGroup>
                                    </div>
                                </div>    

                                <Card title="Banca Avaliativa">
                                   
                                    <div className="row">
                                        <div className="col-md-12">

                                            <label htmlFor="inputNomeProfessor">Nome professor:</label>
                                            <div className="input-group mb-3">
                                                <input type="text"
                                                       id="inputNomeProfessor" 
                                                       className="form-control" 
                                                       nome="nomeProfessor"
                                                       onChange={ e => this.setState({nomeProfessor: e.target.value})}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-success" type="button">Filtrar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>        

                                    <div className="row">    
                                        <div className="col-md-12">      
                                            
                                                <select multiple className="form-control" id="selectProfessoresDisp">
                                                <option>Professor 1</option>
                                                <option>Professor 2</option>
                                                <option>Professor 3</option>
                                                <option>Professor 4</option>
                                                <option>Professor 5</option>
                                                </select>  
                                                
                                            
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row justify-content-end" >
                                        <div className='form-group'>
                                            <div className="col-md-6">   
                                                <button  type="button" className="btn btn-outline-success" >Selecionar</button>                                        
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="row">    
                                        <div className="col-md-12">  
                                            <label htmlFor="selectProfessoresSelec">Professores Selecionados para a banca:</label>
                                             
                                                <select multiple className="form-control" id="selectProfessoresSelec">
                                                    <option>Professor 1</option>
                                                    <option>Professor 2</option>
                                                    <option>Professor 3</option>
                                                    <option>Professor 4</option>
                                                    <option>Professor 5</option>
                                                </select>    
                                                                           
                                        </div>
                                    </div>

                                </Card>
                                <br />

                                <div className="row justify-content-end">
                                    <div className='form-group'>
                                        <div className="col-md-12 ms-auto">   
                                                <button onClick={this.cadastrar} type="button" className="btn btn-success mr-1">Salvar</button>
                                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div> 
                </Card>
        )
    }
}

export default withRouter( CadastroUsuario )