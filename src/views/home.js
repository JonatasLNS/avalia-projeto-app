import React from 'react'

import { withRouter } from 'react-router-dom'

import LocalStorageService from '../app/service/localstorageService'

class Home extends React.Component{

    state = {
        nomeUsuario: ''
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado') 
        this.setState({ nomeUsuario: usuarioLogado.nome})
    }

    render(){
        return(
            <div className="jumbotron">
                <p>{this.state.nomeUsuario},</p>
                <h1 className="display-4">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de avaliação de projetos de pesquisa da Ucsal.</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="https://bootswatch.com/flatly/#" 
                        role="button"><i className="fa fa-users"></i>  
                        Cadastrar Projeto de Pesquisa
                    </a>
                    <a className="btn btn-success btn-lg" 
                        href="https://bootswatch.com/flatly/#" 
                        role="button"><i className="fa fa-users"></i>  
                        Cadastrar Professor
                    </a>
                </p>
            </div>
        )
    }

}

export default withRouter( Home )