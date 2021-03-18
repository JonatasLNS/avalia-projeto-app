import React from 'react'

import { withRouter } from 'react-router-dom'
import { Nav } from "react-bootstrap";

import TabItem from '../components/tabItem'
import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'

import "bootstrap/dist/css/bootstrap.min.css";
import tabItem from '../components/tabItem';

class FormularioAvaliacao extends React.Component{

    state = {
        tabSelecionada: "link-1",
        listaDimensoes : [
            { id: 1, 
              descricao: 'Foco Investigativo',
              subdescricao: 'O quê?',
              subdimensao: [
                    {
                        id: 1,
                        descricao: 'Titulo do projeto',
                        eixo: [
                            {id: 1, descricao: 'O título está relacionado com o tema problematizado?'},
                            {id: 2, descricao: 'O título apresenta o trabalho desenvolvido?'},
                            {id: 3, descricao: 'O título atrai o leitor?'},
                            {id: 4, descricao: 'O título está relacionado com uma pesquisa matricial?'},
                            {id: 5, descricao: 'O titulo está relacionado com a Linha e o Grupo de Pesquisa?'}
                        ]
                    },
                    {
                        id: 2,
                        descricao: 'Tema de pesquisa e objeto da pesquisa',
                        eixo: [
                            {id: 6, descricao: 'O tema está bem definido no contexto do objeto?'},
                            {id: 7, descricao: 'O tema possibilita confusão com titulo do trabalho?'},
                            {id: 8, descricao: 'O objeto está bem delimitado?'},
                            {id: 9, descricao: 'O objeto está presente no título e inserido na temática?'}
                        ]
                    },
                    {
                        id: 3,
                        descricao: 'Problemática da pesquisa',
                        eixo: [
                            {id: 10, descricao: 'A pergunta é pertinente?'},
                            {id: 11, descricao: 'A pergunta é clara?'},
                            {id: 12, descricao: 'A pergunta é concisa?'},
                            {id: 13, descricao: 'A pergunta tem precisão e não dá abertura para várias possibilidades de resposta?'},
                            {id: 14, descricao: 'A pergunta leva à compreensão (em lugar de julgamento) daquilo que val ser investigado?'},
                            {id: 15, descricao: 'A proposta de estudo é exequivel para o tempo/recursos disponíveis?'},
                            {id: 16, descricao: 'A proposta de investigação é exequivel do ponto de vista de acesso aos dados?'},
                            {id: 17, descricao: 'A problemática diz respeito a uma necessidade vital de exigência da humanidade?'},
                            {id: 18, descricao: 'Permite uma visão de rigor, radicalidade e de totalidade (conjunto)?'}
                        ]
                    },
                    {
                        id: 4,
                        descricao: 'Objetivos',
                        eixo: [
                            {id: 19, descricao: 'O objetivo geral está integralmente relacionado à pergunta central?'},
                            {id: 20, descricao: 'O objetivo geral indica o resultado esperado do estudo?'},
                            {id: 21, descricao: 'Os objetivos específicos são passos para o alcance do objetivo geral e orientam o desenvolvimento teórico e empírico da investigação, assim como apontam para o desenvolvimento da investigação?'}
                        ]
                    },
                    {
                        id: 5,
                        descricao: 'As hipóteses e Perguntas norteadoras',
                        eixo: [
                            {id: 22, descricao: 'As perguntas norteadoras são coerentes com a pergunta de pesquisa?'},
                            {id: 23, descricao: 'As hipóteses colocadas respondem provisoriamente à pergunta e têm caráter de pressupostos de investigação?'},
                            {id: 24, descricao: 'As hipóteses são derivadas da teoria que sustenta a problemática investigativa?'}
                        ]
                    }
                ]
            },
            { id: 2, 
                descricao: 'Justificativa',
                subdescricao: 'Porquê?',
                subdimensao: [
                      {
                          id: 6,
                          descricao: 'O contexto',
                          eixo: [
                              {id: 25, descricao: 'A justificativa insere a pesquisa no campo temático científico (contexto histórico, social, econômico, e se possível político) definido?'},
                              {id: 26, descricao: 'O Objeto definido para a investigação está problematizado?'},
                              {id: 27, descricao: 'A problematicidade do problema é bem esclarecida textualmente?'},
                              {id: 28, descricao: 'Objeto e sua problematização demanda criação de novos referenciais sobre o objeto?'}
                          ]
                      },
                      {
                          id: 7,
                          descricao: 'A relevância',
                          eixo: [
                              {id: 29, descricao: 'A justificativa argumenta a relevância da investigação e apresenta as contribuições da pesquisa para o contexto científico, no qual encontra-se inserido o objeto?'},
                              {id: 30, descricao: 'A justificativa lança questões norteadoras que estão relacionadas com os objetivos específicos?'}
                          ]
                      }
                  ]
              },
              { id: 3, 
                  descricao: 'Fundamentação teórica',
                  subdescricao: 'Com base em quê?',
                  subdimensao: [
                        {
                            id: 8,
                            descricao: 'A fundamentação teórica - movimento das categorias empíricas/conteúdos (relacionadas ao operacional da investigação) e analíticas (balizas para o conhecimento do objeto porque mantém as relações sociais do objeto) ',
                            eixo: [
                                {id: 31, descricao: 'Apresenta as categorias teóricas necessárias à discussão do tema?'},
                                {id: 32, descricao: 'Na fundamentação teórica aparece as categorias, os principais conceitos e princípios?'},
                                {id: 33, descricao: 'Contém principais linhas de diálogo sobre o objeto tematizado (concordantes e contrastantes)?'},
                                {id: 34, descricao: 'As referências utilizadas no trabalho refletem o estado atual do conhecimento no campo temático sob foco?'},
                                {id: 35, descricao: 'As referências principais tratadas na investigação são pertinentes ao objeto (foco)?'},
                                {id: 36, descricao: 'A fundamentação forma um todo lógico?'},
                                {id: 37, descricao: 'A fundamentação leva à construção da(s) hipótese(s)?'},
                                {id: 38, descricao: 'As categorias teóricas — leis gerais da teoria do conhecimento, estão sendo lançadas?'},
                                {id: 39, descricao: 'As categorias empíricas estão corretamente delimitadas para permitirem a apreensão do real, a superação da pseudo-concreticidade e suas formas de manifestação?'}
                            ]
                        }
                    ]
                },
                { id: 4, 
                    descricao: 'Metodologia, passos, procedimentos metodológicos e instrumentos técnicos',
                    subdescricao: 'Como?',
                    subdimensao: [
                          {
                              id: 9,
                              descricao: 'A exposição e os passos metodológicos',
                              eixo: [
                                  {id: 40, descricao: 'Estabelece relações entre o geral, particular e singular do objeto?'},
                                  {id: 41, descricao: 'Está coerente e consistentemente expostas?'},
                                  {id: 42, descricao: 'A sequência dos passos metodológicos é coerente com o que se busca investigar?'},
                                  {id: 43, descricao: 'Os passos propostos da investigação são exequíveis?'},
                                  {id: 44, descricao: 'A apresentação dos passos na investigação permite a visualização do fluxo lógico de ações metodológicas?'},
                                  {id: 45, descricao: 'A lógica interna, a consistência e coerência da exposição são garantidas?'}
                              ]
                          },
                          {
                            id: 10,
                            descricao: 'A abrangência da pesquisa e as questões éticas',
                            eixo: [
                                {id: 46, descricao: 'A pesquisa é delimitada no tempo e no Espaço? Apresenta um cronograma?'},
                                {id: 47, descricao: 'A seleção da amostra, se for o caso, está explicitada?'},
                                {id: 48, descricao: 'A abrangência facilita a operacionalização da pesquisa?'},
                                {id: 49, descricao: 'Estão garantidas as normas éticas para pesquisas com seres humanos e grupos sociais (aprovação do comitê ético-científico)?'}
                            ]
                        },
                        {
                          id: 11,
                          descricao: 'Os Instrumentos/técnicas e exposição de dados',
                          eixo: [
                              {id: 50, descricao: 'A pesquisa é delimitada no tempo e no Espaço? Apresenta um cronograma?'},
                              {id: 51, descricao: 'A seleção da amostra, se for o caso, está explicitada?'},
                              {id: 52, descricao: 'A abrangência facilita a operacionalização da pesquisa?'},
                              {id: 53, descricao: 'Estão garantidas as normas éticas para pesquisas com seres humanos e grupos sociais (aprovação do comitê ético-científico)?'}
                          ]
                      }
                      ]
                  }
        ]

    }

    handleClick = (idTab) => {
        this.setState({ tabSelecionada: idTab})
    }

    cancelar = () => {
        this.props.history.push('/home')
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
                            <h5 className="card-header">TEMA: A avaliação da produção científica na UCSAL</h5>
                            <div className="card-body">
                                <h6 className="card-title">Aluno: Jônatas Lucas Nonato dos Santos</h6>
                                <h6 className="card-subtitle text-muted">Curso: Bacharelado em Informática</h6> <br />
                                <h6 className="card-subtitle text-muted">Semestre: 2021.1</h6>
                            </div>
                        </div>
                        
                        {/* FORMULARIO DE AVALIAÇÃO */}
                        
                            <div className="row">
                                <div className="container">
                                    <Nav justify variant="pills" defaultActiveKey="link-1">
                                        <Nav.Item >
                                            <Nav.Link eventKey="link-1" onSelect={() => this.handleClick("link-1")}>Foco Investigativo</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2" onSelect={() => this.handleClick("link-2")}>Justificativa</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3" onSelect={() => this.handleClick("link-3")}>Fundamentação teórica</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-4" onSelect={() => this.handleClick("link-4")}>Metodologia</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            {/*<tabItem listaDimensoes={this.state.listaDimensoes}></tabItem>*/}
                           <CardAvaliacaoDimensao listaDimensoes={this.state.listaDimensoes} tabSelecionada={this.state.tabSelecionada}></CardAvaliacaoDimensao>

                        {/* BOTÕES */}
                        <div className="row justify-content-end">
                            <div className='form-group'>
                                <div className="col-md-12 ms-auto">   
                                        <button  type="button" className="btn btn-success mr-1">Salvar</button>
                                        <button  type="button" className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
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