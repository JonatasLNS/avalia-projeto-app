import React from 'react'
import Cards from '../components/cards'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {

        if(!this.state.email && !this.state.senha){
            mensagemErro("Email e Senha não informados.");
        }else if (!this.state.email ){
            mensagemErro("Email não informado.");
        }else if (!this.state.senha ){
            mensagemErro("Senha não informada.");
        }else{
            this.service.autenticar({
                email: this.state.email,
                senha: this.state.senha
            }).then( response => {
                console.log(response.data)
                LocalStorageService.adicionarItem('_usuario_logado', response.data)
                this.props.history.push('/home')
            }).catch( erro => {
                mensagemErro(erro.response.data)
            })
        }

    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
                <div className="row">
                    <div className="col-md-6" style={ {position : 'relative', left : '300px'} }>
                        <div className="bs-docs-section">
                            <Cards title='Login'>
                                <div className="row justify-content-end">
                                    <div className="col-lg-12"> 
                                        <div className="bs-component">
                                            <fieldset>
                                               <FormGroup label='Email:*' htmlFor='exampleInputEmail1'>
                                                    <input type="email" 
                                                           value={this.state.email}
                                                           onChange={e => this.setState({email: e.target.value})}
                                                           className="form-control" 
                                                           id="exampleInputEmail1" 
                                                           aria-describedby="emailHelp" 
                                                           placeholder="Digite o Email" />
                                               </FormGroup>
                                               <FormGroup label='Senha: *' htmlFor='exampleInputPassword1'>
                                                    <input type="password" 
                                                           value={this.state.senha}
                                                           onChange={e => this.setState({senha: e.target.value})}
                                                           className="form-control" 
                                                           id="exampleInputPassword1" 
                                                           placeholder="Password" />
                                               </FormGroup>
                                               <button onClick={this.entrar} className="btn btn-success mr-1">Entrar</button>
                                               <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Cards>
                        </div>
                    </div>
                </div>
        )

    }
}

export default withRouter( Login )