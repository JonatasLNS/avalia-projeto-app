import React from 'react';

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import CadastroProjeto from '../views/cadastroProjeto'
import FormularioAvaliacao from '../views/formularioAvaliacao'
import Home from '../views/home'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/"><Redirect to="/login"/></Route>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/cadastro-projetos" component={CadastroProjeto} />
                <Route path="/formulario-avaliacao/:id" component={FormularioAvaliacao} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas