import React from 'react';

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import CadastroProjeto from '../views/cadastroProjeto'
import Home from '../views/home'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/cadastro-projetos" component={CadastroProjeto} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas