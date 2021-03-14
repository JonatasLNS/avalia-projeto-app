import React from 'react'

import { withRouter } from 'react-router-dom'

import LocalStorageService from '../app/service/localstorageService'
import AvaliacaoService from '../app/service/avaliacaoService'
import ProjetosTable from './projetosTable'
import Card from '../components/cards'

class Home extends React.Component{

    state = {
        nomeUsuario: '',
        idUsuario: '',
        avaliacoes: []
    } 

    constructor(){
        super();
        this.service = new AvaliacaoService();
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado') 
        this.setState({ nomeUsuario: usuarioLogado.nome})
        this.setState({ idUsuario: usuarioLogado.id})

        this.service.listarByProfessorId(1)
            .then( resposta => {

                this.setState({ avaliacoes :  resposta.data})

                console.log(Array.from(resposta.data))
            }).catch( error =>  {
                console.log(error)
            })
    }

    prepareCadastrarProjetos = () => {
        this.props.history.push('/cadastro-projetos')
    }

    avaliar = () => {
        this.props.history.push('/formulario-avaliacao')
    }


    render(){
        return(
            <div>
                <div className="jumbotron">
                    <p className="lead">{this.state.nomeUsuario},</p>
                    <h1 className="display-4">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de avaliação de projetos de pesquisa da Ucsal.</p>
                    <hr className="my-4" />

                    <p className="lead">
                        <a className="btn btn-primary btn-lg" 
                            onClick={this.prepareCadastrarProjetos}
                            role="button"><i className="fa fa-users"></i>  
                            Cadastrar Novo Projeto de Pesquisa
                        </a>
                       
                        {/*<a className="btn btn-success btn-lg" 
                            href="https://bootswatch.com/flatly/#" 
                            role="button"><i className="fa fa-users"></i>  
                            Cadastrar Professor
                        </a>*/}
                    </p>
                </div>

                <br/ >
                <Card title="Meus projetos">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <ProjetosTable 
                                    avaliacoes={this.state.avaliacoes}
                                    avaliarAction={this.avaliar}>
                                </ProjetosTable>
                            </div>
                        </div>  
                    </div> 
                </ Card>
            </div>

        )
    }

}

export default withRouter( Home )