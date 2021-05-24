

const projetosTable = (props) => {

    const rows = props.avaliacoes.map( avaliacao => {
        return (
            <tr key={avaliacao.id}>
                <td>{avaliacao.projeto.ano}.{avaliacao.projeto.semestre}</td>
                <td>{avaliacao.projeto.tema}</td>
                <td>{avaliacao.projeto.aluno.nome}</td>
                <td>{avaliacao.projeto.professorOrientador.usuario.nome}</td>
                <td>{(avaliacao.status==='PENDENTE')?"Pendente":((avaliacao.status==='EM_ANDAMENTO')?"Em Andamento":"Concluída")}</td>
                <td>{avaliacao.nota}</td>
                <td>
                    <button type="button"  title="Avaliar"
                            className={(avaliacao.status==='PENDENTE')?"btn btn-success":((avaliacao.status==='EM_ANDAMENTO')?"btn btn-warning":"btn btn-danger")}
                            onClick={ e => props.avaliarAction(avaliacao.id)}> 
                            {(avaliacao.status==='PENDENTE')?"AVALIAR":((avaliacao.status==='EM_ANDAMENTO')?"CONTINUAR":"VISUALIZAR")}
                    </button>
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
                      <th scope="col">Nota</th>
                      <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default projetosTable