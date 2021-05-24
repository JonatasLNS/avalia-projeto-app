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

        const avaliacaoFiltro = {
            professorId: usuarioLogado.id
        }

        this.service.consultar(avaliacaoFiltro)
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

    avaliar = (id) => {
        this.props.history.push(`/formulario-avaliacao/${id}`)
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
                    <fieldset>
                        <button onClick={this.prepareCadastrarProjetos} className="btn btn-primary btn-lg mr-1">Cadastrar Novo Projeto de Pesquisa</button>
                        <button onClick={""} className="btn btn-danger btn-lg">Relatório Avaliações</button>
                    </fieldset>
                        
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