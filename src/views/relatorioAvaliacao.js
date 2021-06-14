import React from 'react'

import { withRouter } from 'react-router-dom'
import { Nav } from "react-bootstrap";
import update from 'immutability-helper';

import CardAvaliacaoDimensao from '../components/cardAvaliacaoDimensoes'
import CardSubdimensoes from '../components/cardSubdimensoes'
import AvaliacaoService from '../app/service/avaliacaoService'
import ProjetoService from '../app/service/projetoService'
import DimensaoService from '../app/service/dimensaoService'
import DadosAvaliacaoService from '../app/service/dadosAvaliacaoService'
import Card from '../components/cards'

import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart'

import { Accordion } from "react-bootstrap";


import "bootstrap/dist/css/bootstrap.min.css";

class FormularioAvaliacao extends React.Component{

    constructor(){
        super();
        this.service = new ProjetoService();

        this.lightOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        this.basicOptions1 = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        
       /* this.chartData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };*/

        



        
    }

    state = {
        avaliacoes:[],
        listChartData:[],
        chartData:{},
        listLabels:[],
        listDatasets:[],
        listDataAtingiu:[],
        listDataParcialmente:[],
        listDataNaoAtingiu:[],
        listGraficoAvaliacoesData:[],
        basicDataGrafico:{},
        tabSelecionada: "link-0",
        checked: false,
        avaliacao: {},
        projeto: {},
        aluno:{},
        dadosAvaliacao:[],
        listaDadosAvaliacao:[],
        listaDimensoes : [],
        subdimensoesState : [],
        mostrarTextComentarioState: [],
        textAreaObservacaoState: [],
        isCheckedState: [],
        listaOpcoes : [
            { label: 'Selecione...' , value: '' },
            { label: 'SIM - Este projeto está de acordo com este item.' , value: '1' },
            { label: 'NÃO - Este projeto não está de acordo a este item.' , value: '2' },
            { label: 'PARCIALMENTE - Este projeto está parcialmente de acordo a este item. ' , value: '3' },
            { label: 'NÃO SE APLICA - Este item não é aplicável a este projeto.' , value: '4' }
        ]
    }

    componentDidMount(){

        const dimensaoService = new DimensaoService();
        const dadosAvaliacaoService = new DadosAvaliacaoService();
   
        const params = this.props.match.params
        let varProjetoId;

        dimensaoService.listarDimensoes()
        .then( resposta => {
            this.setState({ 
                listaDimensoes: resposta.data
            })

        }).catch( error =>  {
            console.log(error)
        })

        this.service.obterProjetoById(params.id)
        .then( resposta => {
            varProjetoId = resposta.data.id
            this.setState({ 
                projeto: resposta.data,
                aluno: resposta.data.aluno,
                avaliacoes : resposta.data.avaliacoes
            })

            let percentualDeAcordo = resposta.data.percentualDeAcordo
            let percentualNaoDeAcordo = resposta.data.percentualNaoDeAcordo
            let percentualParcialDeAcordo = resposta.data.percentualParcialDeAcordo

            this.setState({ 
                chartData : {
                    labels: ['Atingiu expectativas', 'Atingiu parcialmente as expectativas', 'Não atingiu as expectativas'],
                    datasets: [
                        {
                            data: [percentualDeAcordo, percentualParcialDeAcordo, percentualNaoDeAcordo],
                            backgroundColor: [
                                "#18bc9c",
                                "#FFCE56",
                                "#FF6384"
                            ],
                            hoverBackgroundColor: [
                                "#18bc9c",
                                "#FFCE56",
                                "#FF6384"
                            ]
                        }]
                }
            })

            let listaLabelsProfessor = []
            let listaDeAcordoPercent = []
            let listaNaoDeAcordoPercent = []
            let listaParcialDeAcordoPercent = []

            resposta.data.avaliacoes.map(avaliacao => {
                let dadosFiltro = {
                    avaliacaoId: avaliacao.id
                }
                dadosAvaliacaoService.consultar(dadosFiltro)
                .then( resposta => {

                    let total = 0;

                    let totalProjeto = resposta.data.length;

                    let countDeAcordo = 0;
                    let countNaoDeAcordo = 0;
                    let countParcialDeAcordo = 0;

                    let deAcordoPercent = 0;
                    let naoDeAcordoPercent = 0;
                    let parcialDeAcordoPercent = 0;

                    resposta.data.map( dados => {

                        if(dados.valorSelect === 1){
                            total++
                            countDeAcordo++
                        }else if(dados.valorSelect === 2){
                            total++
                            countNaoDeAcordo++
                        }else if(dados.valorSelect === 3){
                            total++
                            countParcialDeAcordo++
                        }

                    })

                    deAcordoPercent = Math.round((countDeAcordo * 100) / total)
                    listaDeAcordoPercent.push(deAcordoPercent)

                    naoDeAcordoPercent = Math.round((countNaoDeAcordo * 100) / total)
                    listaNaoDeAcordoPercent.push(naoDeAcordoPercent)

                    parcialDeAcordoPercent = Math.round((countParcialDeAcordo * 100) / total)
                    listaParcialDeAcordoPercent.push(parcialDeAcordoPercent)

                    listaLabelsProfessor.push(`Prof. ${avaliacao.professor.usuario.nome}`)

                    this.setState(update(this.state, {
                        listaDadosAvaliacao: {
                            [avaliacao.id]: {
                                $set: resposta.data
                            }
                        }
                        
                    }));

                   

                    this.setState({ 
                        basicDataGrafico : {
                            labels: listaLabelsProfessor,
                            datasets: [
                                {
                                    label: 'Atingiu expectativas', 
                                    backgroundColor: '#18bc9c',                            
                                    data: listaDeAcordoPercent
                                },
                                {
                                    label: 'Atingiu parcialmente as expectativas',
                                    backgroundColor: '#f39c12',
                                    data: listaParcialDeAcordoPercent
                                }
                                ,
                                {
                                    label: 'Não atingiu as expectativas',
                                    backgroundColor: '#dc3545',
                                    data: listaNaoDeAcordoPercent
                                }
                            ]
                        }
                        
                    })

                    
                }).catch( error =>  {
                    console.log(error)
                })
            } )

            
        }).catch( error =>  {
            console.log(error)
        })
        
    }

    handleTabClick = (idTab) => {
        this.setState({ tabSelecionada: idTab})
    }

    handleChangeDimensao = (e, eixo) => {
   
        this.setState(update(this.state, {
            subdimensoesState: {
                [eixo.id]: {
                    $set: e.target.value
                }
            }
        }));
      
    }

    voltar = () => {
        this.props.history.push('/home')
    }

    render(){


        return(


            <div>
                <div className="card bg-light mb-3" >
                    {/* CARD DA PÁGINA */}
                    <div className="card-header"><h4>Relatório da Avaliação:</h4></div>
                    <div className="card-body">
                        
                        {/* CARD DO CABEÇÁLIO */}
                        <div className="card mb-3">
                            <h5 className="card-header">{`${this.state.projeto.tema}`}</h5>
                            <div className="card-body">
                                <h6 className="card-title">{`Aluno: ${this.state.aluno.nome}`}</h6>
                                <h6 className="card-subtitle text-muted">{`Curso: ${this.state.aluno.curso}`}</h6> <br />
                                <h6 className="card-subtitle text-muted">{`Semestre: ${this.state.projeto.ano}.${this.state.projeto.semestre}`}</h6>
                            </div>
                        </div>
                        
                        {/* LISTAGEM DAS AVALIAÇÕES */}

                        <div className="card mb-3">
                            <h5 className="card-header">Resumo das Avaliações:</h5>
                            <div className="card-body">
                                <Chart type="bar" data={this.state.basicDataGrafico } options={this.basicOptions1} />
                            </div>
                        </div>

                        <div className="card mb-12">
                            <h5 className="card-header">Avaliação Geral:</h5>
                            <div className="card-body p-jc-center">
                                <div className="card p-d-flex p-jc-center ">
                                    <Chart type="doughnut" data={this.state.chartData} options={this.lightOptions} style={{  width: '50%' }} />
                                </div>
                            </div>
                        </div>
                                
                        {
                            this.state.avaliacoes.map( avaliacao => {

                                return(  
                                    <Card title={`Professor: ${avaliacao.professor.usuario.nome}`}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    
                                                </div>
                                            </div>

                                            {/* Abas */}
                                            <div className="row">
                                                <div className="container">
                                                    <Nav justify variant="pills" defaultActiveKey={this.state.tabSelecionada} >
                                                        {
                                                            this.state.listaDimensoes.map((dimensao, index) =>
                                                                
                                                                <Nav.Item key={index}>
                                                                    <Nav.Link eventKey={"link-"+index} onSelect={() => this.handleTabClick(`link-${index}`)}>{dimensao.subdescricao}</Nav.Link>
                                                                </Nav.Item>
                                                            )       
                                                        }
                                                    </Nav>
                                                </div>
                                            </div>

                                            <CardAvaliacaoDimensao listaDimensoes={this.state.listaDimensoes} tabSelecionada={this.state.tabSelecionada}>
                                            {
                                                this.state.listaDimensoes.map( dimensao => {
                                                    return(   
                                                        <div key={dimensao.id}>
                                                            {
                                                                <CardSubdimensoes listaSubdimensoes={dimensao.subdimensoes}>
                                                                    {
                                                                        dimensao.subdimensoes.map((subdimensao, index) => {
                                                                            return(
                                                                                <div key={index}>
                                                                                    {
                                                                                        subdimensao.eixos.map((eixo) => {
                                                                                            if(this.state.listaDadosAvaliacao[avaliacao.id] != undefined){
                                                                                                    return(

                                                                                                        this.state.listaDadosAvaliacao[avaliacao.id].map((dados) => {
                                                                                                            if( dados.eixo.id == eixo.id){
                                                                                                                
                                                                                                                return(
                                                                                                                    <div>
                                                                                                                        <h5>{dados.eixo.descricao}</h5>
                                                                                                                        
                                                                                                                        {(dados.valorSelect === 1)?
                                                                                                                                <div className="form-group">
                                                                                                                                    <div className="p-d-inline-flex p-ai-center text-success">
                                                                                                                                        <i className="pi pi-thumbs-up p-mr-2"></i>
                                                                                                                                        <b> Este projeto está de acordo com este item.</b>
                                                                                                                                    </div>
                                                                                                                                    {dados.observacao && 
                                                                                                                                        <fieldset disabled={true}>
                                                                                                                                            <Divider align="left" type="dashed">
                                                                                                                                                <div className="p-d-inline-flex p-ai-center">
                                                                                                                                                    <b>Observações</b>
                                                                                                                                                </div>
                                                                                                                                            </Divider>
                                                                                                                                            <p>{dados.observacao}</p>
                                                                                                                                        </fieldset>
                                                                                                                                    }
                                                                                                                                    
                                                                                                                                </div>
                                                                                                                        :((dados.valorSelect === 2)?
                                                                                                                                <div>
                                                                                                                                    <div className="p-d-inline-flex p-ai-center text-danger">
                                                                                                                                        <i className="pi pi-thumbs-down p-mr-2"></i>
                                                                                                                                        <b> Este projeto não está de acordo a este item.</b>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                        :((dados.valorSelect === 3)?
                                                                                                                                <div>
                                                                                                                                    <div className="p-d-inline-flex p-ai-center text-warning">
                                                                                                                                        <i className="pi pi-minus-circle p-mr-2"></i>
                                                                                                                                        <b> Este projeto está parcialmente de acordo a este item.</b>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                        :((dados.valorSelect === 4)?
                                                                                                                                <div>
                                                                                                                                    <div className="p-d-inline-flex p-ai-center text-secondary">
                                                                                                                                        <i className="pi pi-times-circle p-mr-2"></i>
                                                                                                                                        <b> Este item não é aplicável a este projeto.</b>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                        :" "))) }
                                                                                                                        
                                                                                                                        <Divider />
            
                                                                                                                    </div>
                                                                                                                )
            
                                                                                                            }
                                                                                                            
                                                                                                        })
                                                                                                    )
                                                                                                }
                                                                                            })
                                                                                    }
                                                                                    
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                    
                                                                </CardSubdimensoes>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            </CardAvaliacaoDimensao>
               
                                    </Card>
                                )

                            })

                        }

                                        

                        



                        {/* BOTÕES */}
                        <div className="row justify-content-end">
                            <div className='form-group'>
                                <div className="col-md-12 ms-auto">   
                                        <button  type="button" className="btn btn-success mr-1" >Imprimir Relatorio</button>
                                        <button  type="button" className="btn btn-danger"  onClick={this.voltar}>Voltar</button>
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