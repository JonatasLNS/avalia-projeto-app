

const projetosTable = (props) => {

    const rows = props.avaliacoes.map( avaliacao => {

        return (
            <tr key={avaliacao.id}>
                <td>{avaliacao.projetoTransient.ano}.{avaliacao.projetoTransient.semestre}</td>
                <td>{avaliacao.projetoTransient.tema}</td>
                <td>{avaliacao.projetoTransient.aluno.nome}</td>
                <td>{avaliacao.projetoTransient.professorOrientador.usuario.nome}</td>
                <td>{(avaliacao.status==='PENDENTE')?"Pendente":((avaliacao.status==='EM_ANDAMENTO')?"Em Andamento":"Concluída")}</td>
                <td>
                    <button type="button"  title="Avaliar"
                            className={(avaliacao.status==='PENDENTE')?"btn btn-success":((avaliacao.status==='EM_ANDAMENTO')?"btn btn-warning":"btn btn-danger")}
                            onClick={ e => props.avaliarAction(avaliacao.id)}> 
                            {(avaliacao.status==='PENDENTE')?"AVALIAR":((avaliacao.status==='EM_ANDAMENTO')?"CONTINUAR":"VISUALIZAR")}
                    </button>
                </td>
                <td>
                    
                    {
                        
                        (avaliacao.projetoTransient.status==='CONCLUIDO' && avaliacao.projetoTransient.professorOrientador.usuario.id == props.usuarioLogado)?
                            <button type="button"  title="Relatorio"
                                    className="btn btn-outline-danger"
                                    onClick={ e => props.relatorioAction(avaliacao.projetoTransient.id)}> 
                                    Relatório
                            </button>
                        : ""
                        
                    }


                      
                    
                </td>
            </tr>
        )
    } )

    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                      <th scope="col">Semestre</th>
                      <th scope="col">Tema</th>
                      <th scope="col">Aluno</th>
                      <th scope="col">Orientador</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Ações</th>
                      <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default projetosTable