import React from 'react'
import { Accordion, Card } from "react-bootstrap";

import CardSubdimensoes from '../components/cardSubdimensoes'

function CardAvaliacaoDimensoes(props){
 
    //console.log(props);

    const rows = props.listaDimensoes.map( dimensao => {
        return (
            <div key={dimensao.id}>
                <div className="row">
                    <div className="container">
                        <Card>
                            <div className="card-header">{dimensao.descricao}</div>
                            <div className="card-body"> 
                                <CardSubdimensoes listaSubdimensoes={dimensao.subdimensao}></CardSubdimensoes>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    })
    
    return(
        <div>
            {rows}
            <br />
        </div>
    )
}

export default CardAvaliacaoDimensoes