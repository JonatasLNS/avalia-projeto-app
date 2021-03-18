import React from 'react'
import { Accordion, Card } from "react-bootstrap";

import CardSubdimensoes from '../components/cardSubdimensoes'

function CardAvaliacaoDimensoes(props){
 
    //console.log(props);

    console.log(props)
    const rows = props.listaDimensoes.map( dimensao => {

        if(props.tabSelecionada == "link-"+dimensao.id){
            return (
    
                <div key={dimensao.id}>
                    <div className="row">
                        <div className="container">
                            <Card>
                                <div className="card-header"><b>{dimensao.subdescricao}</b></div>
                                <div className="card-body"> 
                                    <CardSubdimensoes listaSubdimensoes={dimensao.subdimensao}></CardSubdimensoes>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        }
    })
    
    return(
        <div>
            {rows}
            <br />
        </div>
    )
}

export default CardAvaliacaoDimensoes