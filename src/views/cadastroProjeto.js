import React from 'react'

import Card from '../components/cards'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'
import { PickList } from 'primereact/picklist';

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../components/toastr'
import AlunosService from '../app/service/alunoService'


class CadastroProjeto extends React.Component{

    constructor(){
        super();
        this.service = new AlunosService();

        this.state = {
            tema : '',
            ano : '',
            semestre : '',
            curso : '',
            matricula : '',
            nomeAluno : '',
            nomeProfessor: '',
			source: [
                {nome: 'Arnaldo', disciplina: 'Projeto Final'}, 
                {nome: 'João', disciplina: 'Análise I'},
                {nome: 'Maria', disciplina: 'Lógica de Programação'}
            ],
			target: [],
            disabledCamposAluno: true
		};

        this.cadastrar = this.cadastrar.bind(this);
        this.professorTemplate = this.professorTemplate.bind(this);
		this.onChangePickList = this.onChangePickList.bind(this);
        this.getAlunoByMatricula = this.getAlunoByMatricula.bind(this);

    }



    onChangePickList(event) {
		this.setState({
			source: event.source,
			target: event.target
		});
	}

    professorTemplate(professor) {
		return (
			<div className='p-clearfix'>
				<div >
					{professor.nome} - {professor.disciplina} 
				</div>
			</div>
		);
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
            msgs.forEach( (msg) => {
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

    getAlunoByMatricula = (matricula) => {
        if(matricula && matricula.length > 0){
            new AlunosService().getByMatricula(matricula)
                .then( resposta => {
                    this.setState({
                        nomeAluno: resposta.data.nome,
                        curso: resposta.data.curso,
                        disabledCamposAluno : true
                    })
                    mensagemSucesso("Aluno encontrado.")
                    
                }).catch( error =>  {
                    console.log(error)
                    this.setState({
                        disabledCamposAluno : false,
                        nomeAluno: '',
                        curso: ''
                    })
                    mensagemAlerta(`Aluno não encontrado! \n Cadastre um novo Aluno.`)
            })
        }
    }

    render(){

        const listaSemestre = [
            { label: 'Selecione...' , value: '' },
            { label: 'PRIMEIRO' , value: '1' },
            { label: 'SEGUNDO' , value: '2' }
        ]

        return(

            <div className="card bg-light mb-3">

                <div className="card-header"><h4>Cadastro de Projetos</h4></div>
                    <div className="card-body">
                        <Card title="Dados do Projeto:">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
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
                                                            onChange={ e => this.setState({matricula: e.target.value}) } 
                                                            onBlur={e => this.getAlunoByMatricula(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-9">
                                                    <FormGroup label="Nome do Aluno: *" htmlFor="inputNomeAluno">
                                                        <input type="text" 
                                                            id="inputNomeAluno" 
                                                            className="form-control"
                                                            name="nomeAluno" 
                                                            disabled = {this.state.disabledCamposAluno}
                                                            onChange={ e => this.setState({nomeAluno: e.target.value})} 
                                                            value = {this.state.nomeAluno}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <div className="col-md-9">
                                                    <FormGroup label="Curso: *" htmlFor="inputCurso">
                                                        <input type="text" 
                                                            id="inputCurso" 
                                                            className="form-control "
                                                            name="curso" 
                                                            disabled = {this.state.disabledCamposAluno}
                                                            onChange={ e => this.setState({curso: e.target.value})} 
                                                            value = {this.state.curso}
                                                        /> 
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-3">
                                                    <FormGroup label="Semestre: *" htmlFor="inputSemestre">
                                                        <input type="text" 
                                                            id="inputSemestre" 
                                                            className="form-control"
                                                            name="semestre" 
                                                            disabled = {this.state.disabledCamposAluno}
                                                            onChange={ e => this.setState({semestre: e.target.value})} 
                                                            value = {this.state.semestre}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div> 
                                    </div>
                                </div>
                            </div> 
                        </Card>   

                        <Card title="Banca Avaliativa:">
                            
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

                            {/* Exemplo: https://bit.dev/primefaces/primereact/picklist */}
                            <PickList
                                source={this.state.source}
                                target={this.state.target}
                                itemTemplate={this.professorTemplate}
                                sourceHeader='Professores Disponíveis:'
                                targetHeader='Professores Selcionados para a Banca:'
                                responsive={true}
                                sourceStyle={{ height: '300px' }}
                                targetStyle={{ height: '300px' }}
                                onChange={this.onChangePickList}
                            />
                            

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
        )
    }
}

export default withRouter( CadastroProjeto )