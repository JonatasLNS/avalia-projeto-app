import ApiService from '../apiservice'

export default class AvaliacaoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/avaliacoes')
    }

    buscarAvaliacaoById(id){
        return this.get(`/${id}`)
    }

    salvar(listAvaliacao){
        return this.post('/', listAvaliacao);
    }

    consultar(avaliacaoFiltro){
  
        let params = `/?`

        if(avaliacaoFiltro.professorId){
            params = `${params}&professorId=${avaliacaoFiltro.professorId}`
        }

        if(avaliacaoFiltro.projetoId){
            console.log(avaliacaoFiltro.projetoId)
            params = `${params}&projetoId=${avaliacaoFiltro.projetoId}`
        }

        return this.get(params)
    }
}