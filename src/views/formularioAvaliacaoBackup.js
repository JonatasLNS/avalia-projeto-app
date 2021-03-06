import React, { useState, useEffect, useRef } from 'react';
import { Nav } from "react-bootstrap";
import { withRouter, useHistory, useParams } from 'react-router-dom'

import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'
import CardSubdimensoes from '../components/cardSubdimensoes'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'
import ProjetoService from '../app/service/projetoService'
import DimensaoService from '../app/service/dimensaoService'

import "bootstrap/dist/css/bootstrap.min.css";

const FormularioAvaliacao = () => {

    let history = useHistory();
    const { id } = useParams();
    
    const getDadosProjeto = () => {

        const projetoService = new ProjetoService();

        if (id !== undefined) {
            projetoService.obterProjetoById(id)
            .then( resposta => {
                setProjeto(resposta.data)
                setTema(resposta.data.tema)
                setNomeAluno(resposta.data.aluno.nome)
                setCurso(resposta.data.aluno.curso)
                setAnoProjeto(resposta.data.ano)
                setSemestre(resposta.data.semestre)

                console.log(projeto)
            }).catch( error =>  {
                console.log(error)
            })
       
        }
    }

    useComponentWillMount(() => getDadosProjeto());
    useComponentDidMount(() => console.log("didMount"));

    const [projeto, setProjeto] = useState()
    const [subdimensoesState, setSubdimensoes] = useState([0]);
    const [tabSelecionada, setTabSelecionada] = useState("link-1") 
    const [tema, setTema] = useState('')
    const [nomeAluno, setNomeAluno] = useState('')
    const [curso, setCurso] = useState('')
    const [anoProjeto, setAnoProjeto] = useState('')
    const [semestre, setSemestre] = useState('')

    const listaDimensoes = [
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
   
    const listaOpcoes = [
        { label: 'Selecione...' , value: '' },
        { label: 'SIM' , value: '1' },
        { label: 'NÃO' , value: '2' },
        { label: 'PARCIALMENTE' , value: '3' },
        { label: 'NÃO SE APLICA' , value: '4' }
    ]
    
    const handleChangeDimensao = (e, eixo) => {
        subdimensoesState[eixo.id] =  e.target.value ;
        setSubdimensoes([...subdimensoesState])
        console.log(subdimensoesState)
    }

    const handleTabClick = (idTab) => {
        setTabSelecionada(idTab)
    }

    const cancelar = () => {
        history.push("/home");
    }

    return (
        <div>
                <div className="card bg-light mb-3" >
                    {/* CARD DA PÁGINA */}
                    <div className="card-header"><h4>Avaliação do Projeto:</h4></div>
                    <div className="card-body">
                        
                        {/* CARD DO CABEÇÁLIO */}
                        <div className="card mb-3">
                            <h5 className="card-header">{tema}</h5>
                            <div className="card-body">
                                <h6 className="card-title">{`Aluno: ${nomeAluno}`}</h6>
                                <h6 className="card-subtitle text-muted">{`Curso: ${curso}`}</h6> <br />
                                <h6 className="card-subtitle text-muted">{`Semestre: ${anoProjeto}.${semestre}`}</h6>
                            </div>
                        </div>

                        {/* FORMULARIO DE AVALIAÇÃO */}

                        {/* Abas */}
                        <div className="row">
                            <div className="container">
                                <Nav justify variant="pills" defaultActiveKey={tabSelecionada} >
                                    {
                                        listaDimensoes.map((dimensao, index) =>
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={"link-"+dimensao.id} onSelect={() => handleTabClick(`link-${dimensao.id}`)}>{dimensao.subdescricao}</Nav.Link>
                                            </Nav.Item>
                                        )       
                                    }
                                </Nav>
                            </div>
                        </div>

                        {/* Conteúdo das Abas */}
                        <CardAvaliacaoDimensao listaDimensoes={listaDimensoes} tabSelecionada={tabSelecionada}>
                            {
                                listaDimensoes.map( dimensao => {
                                    return(   
                                        <div key={dimensao.id}>
                                            <CardSubdimensoes listaSubdimensoes={dimensao.subdimensao}>
                                                {
                                                    dimensao.subdimensao.map((subdimensao, index) => {
                                                        return(
                                                            <div key={index}>
                                                                {
                                                                    subdimensao.eixo.map((eixo) =>
                                                                    <div key={eixo.id}>
                                                                        <FormGroup label={eixo.descricao} htmlFor={"selectEixo"+eixo.id}>
                                                                            <SelectMenu 
                                                                                className='form-control' 
                                                                                lista={listaOpcoes}
                                                                                onChange={ e => handleChangeDimensao(e, eixo)}
                                                                                value = {subdimensoesState[eixo.id]}>
                                                                            </SelectMenu>
                                                                        </FormGroup>
                                                                    </div>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </CardSubdimensoes>
                                        </div>
                                    )
                                })
                            }
                        </CardAvaliacaoDimensao>
                        
                        {/* BOTÕES */}
                        <div className="row justify-content-end">
                            <div className='form-group'>
                                <div className="col-md-12 ms-auto">   
                                        <button  type="button" className="btn btn-success mr-1">Salvar</button>
                                        <button  type="button" className="btn btn-danger" onClick={cancelar}>Cancelar</button>
                                </div>
                            </div>    
                        </div>

                    </div>
                </div>
                  
            </div>
    )
    
}

const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };

const useComponentDidMount = func => useEffect(func, []);

/*const useInputState = initial => {
    const [state, setState] = useState(initial);
    const setInputState = e => {
        setState(e.target.value);
    };
    return [state, setInputState];
};*/

export default withRouter( FormularioAvaliacao )