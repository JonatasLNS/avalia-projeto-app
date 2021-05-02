

const projetosTable = (props) => {

    const rows = props.avaliacoes.map( avaliacao => {
        return (
            <tr key={avaliacao.id}>
                <td>{avaliacao.projeto.ano}.{avaliacao.projeto.semestre}</td>
                <td>{avaliacao.projeto.tema}</td>
                <td>{avaliacao.projeto.aluno.nome}</td>
                <td>{avaliacao.projeto.professorOrientador.usuario.nome}</td>
                <td>{avaliacao.status}</td>
                <td>{avaliacao.nota}</td>
                <td>
                    <button type="button"  title="Avaliar"
                            className="btn btn-success" 
                            onClick={ e => props.avaliarAction(avaliacao.projeto.id)}> 
                            Avaliar
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