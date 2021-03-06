import React from 'react'
import { Card } from "react-bootstrap";

function CardAvaliacaoDimensoes(props){
 
    const rows = props.listaDimensoes.map( (dimensao, index) => {
        
        if(props.tabSelecionada === "link-"+index){
            return (
                
                <div key={dimensao.id}>
                    <div className="row">
                        <div className="container">
                            <Card>
                                <div className="card-header"><b>{dimensao.descricao}</b></div>
                                <div className="card-body"> 
                                    {props.children[index]}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        }else{
            //código inútil, apenas para evitar alerta de falta de retorno no console
            return (
                <div key={dimensao.id}></div>
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