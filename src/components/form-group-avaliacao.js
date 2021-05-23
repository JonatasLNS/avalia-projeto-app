import React from 'react'

function FormGroup(props){
    return(
        <div className="form-group">
            <label htmlFor="props.htmlFor"><b>{props.label}</b></label>
            {props.children}
        </div>
    )
}

export default FormGroup