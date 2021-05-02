import React from 'react'

class Card extends React.Component{
    render(){
        return(
            <div className="row">
                    <div className="col-md-12">
                        <div className="card text-white bg-primary mb-3" >
                            <div className="card-header"> 
                                <i className="pi pi-info-circle" style={{'fontSize': '1em'}}></i>
                                &nbsp; {this.props.title}
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {this.props.text}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Card