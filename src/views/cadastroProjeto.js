import React from 'react'

import Card from '../components/cards'
import CardMensagem from '../components/cardMensagem'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'
import { PickList } from 'primereact/picklist';

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../components/toastr'
import ProjetoService from '../app/service/projetoService'
import AlunosService from '../app/service/alunoService'
import ProfessorService from '../app/service/professorService'
import LocalStorageService from '../app/service/localstorageService'


class CadastroProjeto extends React.Component{

    constructor(){
        super();
        this.service = new ProjetoService();
        this.alunoService = new AlunosService();
        this.professorService = new ProfessorService();

        this.state = {
            nomeUsuario: '',
            idUsuario: '',
            tema : '',
            ano : '',
            semestre : '',
            curso : '',
            matricula : '',
            idAluno : '',
            nomeAluno : '',
            nomeProfessor: '',
            disciplina: '',
			source: [],
			target: [],
            disabledCamposAluno: true
		};

        this.cadastrar = this.cadastrar.bind(this);
        this.professorTemplate = this.professorTemplate.bind(this);
		this.onChangePickList = this.onChangePickList.bind(this);
        this.getAlunoByMatricula = this.getAlunoByMatricula.bind(this);
        this.pesquisarProfessores = this.pesquisarProfessores.bind(this);

    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado') 
        this.setState({ nomeUsuario: usuarioLogado.nome})
        this.setState({ idUsuario: usuarioLogado.id})
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
					{professor.usuario.nome} - {professor.especialidade} 
				</div>
			</div>
		);
	}

    validar(){
        const msgs = []

        if(!this.state.tema){
            msgs.push('O campo \'Tema\' é obrigatório.')
        }

        if(!this.state.matricula){
            msgs.push('O campo \'Matrícula\' é obrigatório.')
        }

        if(!this.state.nomeAluno){
            msgs.push('O campo \'nomeAluno\' é obrigatório.')
        }
        
        if(!this.state.semestre){
            msgs.push('O campo \'Semestre\' é obrigatório.')
        }

        if(!this.state.curso){
            msgs.push('O campo \'Curso\' é obrigatório.')
        }

        if(this.state.target.length < 3){
            msgs.push('Selecione ao menos 3 professores para a Banca.')
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

        const projeto = {
            tema  : this.state.tema,
            semestre : this.state.semestre,
            curso : this.state.curso,
            idAluno: this.state.idAluno,
            nomeAluno: this.state.nomeAluno,
            idUsuarioOrientador: this.state.idUsuario,
            listaProfessores: this.state.target
        }

        console.log(projeto)
        this.service.salvar(projeto)
            .then( response => {
                mensagemSucesso('Projeto cadastrado com sucesso!')
                this.props.history.push('/home')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    getAlunoByMatricula = (matricula) => {
        if(matricula && matricula.length > 0){
            this.alunoService.getByMatricula(matricula)
                .then( resposta => {
                    console.log(this.getSemestre())
                    this.getSemestre()
                    this.setState({
                        idAluno: resposta.data.id,
                        nomeAluno: resposta.data.nome,
                        curso: resposta.data.curso,
                        semestre: this.getSemestre(),
                        disabledCamposAluno : true
                    })
                    console.log(this.state.idAluno)
                    mensagemSucesso("Aluno encontrado.")
                    
                }).catch( error =>  {
                    console.log(error)
                    this.setState({
                        disabledCamposAluno : false,
                        nomeAluno: '',
                        curso: '',
                        semestre: this.getSemestre()
                    })
                    mensagemAlerta(`Aluno não encontrado! \n Cadastre um novo Aluno.`)
                 })
        }
    }

    getSemestre = () => {
        let data = new Date()
        let ano = data.getFullYear();
        let mes = data.getMonth()+1;
        let semestre = 1;

        if(mes > 6){
            semestre = 2
        }
        return `${ano}.${semestre}`
    }

    pesquisarProfessores = () => {

        const professorFiltro = {
            nome: this.state.nomeProfessor,
            disciplina: this.state.disciplina
        }

        this.professorService.consultar(professorFiltro)
            .then( resposta => {
                if(resposta.data.length){
                    if(resposta.data.length > 1){
                        mensagemSucesso(`${resposta.data.length} Professores encontrados para o filtro.`)
                    }else{
                        mensagemSucesso(`${resposta.data.length} Professor encontrado para o filtro.`)
                    }
                    
                }else{
                    mensagemAlerta("Nenhum professor encontrado!")
                }
                this.setState({
                    source: resposta.data
                })
            }).catch( error =>  {
                mensagemErro(error)
                this.setState({
                    source: []
                })
            })
    }

    render(){

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

                                        <CardMensagem title="Busca de Professores:" text="Utilize os campos abaixo para filtrar e selecionar os professores que irão compor a banca e estarão aptos a avaliar o projeto de pesquisa."></CardMensagem>

                                        <div className="card">
                                            <div className="card-body">

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormGroup label="Nome professor:" htmlFor="inputNomeProfessor">
                                                                <input type="text" 
                                                                    id="inputNomeProfessor" 
                                                                    className="form-control"
                                                                    name="nomeProfessor" 
                                                                    onChange={ e => this.setState({nomeProfessor: e.target.value})} 
                                                                    value = {this.state.nomeProfessor}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormGroup label="Disciplina:" htmlFor="inputDisciplina">
                                                                <input type="text" 
                                                                    id="inputDisciplina" 
                                                                    className="form-control"
                                                                    name="disciplina" 
                                                                    onChange={ e => this.setState({disciplina: e.target.value}) } 
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div> 


                                                    <div className="row justify-content-end">
                                                        <div className='form-group'>
                                                            <div className="col-md-12 ms-auto">   
                                                                    <button  onClick={this.pesquisarProfessores}  type="button" className="btn btn-success mr-1">Filtrar</button>
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
                                                
                                                
                                            </div>
                                        </div>
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
        )
    }
}

export default withRouter( CadastroProjeto )