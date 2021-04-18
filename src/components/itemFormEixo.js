import React from 'react'

import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'

export default (props) => {

    const listaEixos = props.listaEixos;
    
    const listaOpcoes = [
        { label: 'Selecione...' , value: '' },
        { label: 'SIM' , value: '1' },
        { label: 'NÃO' , value: '2' },
        { label: 'PARCIALMENTE' , value: '3' },
        { label: 'NÃO SE APLICA' , value: '4' }
    ]

    const listItems = listaEixos.map((eixo) =>
        <div key={eixo.id}>
            <FormGroup label={eixo.descricao} htmlFor={"selectEixo"+eixo.id}>
                <SelectMenu className='form-control' lista={listaOpcoes} onChange ={props.onChange}></SelectMenu>
            </FormGroup>
        </div>
    )

    return (
        <div>{listItems}</div>
    )

}
