import ApiService from '../apiservice'

export default class AvaliacaoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/dadosAvaliacao')
    }

    consultar(dadosFiltro){
  
        let params = `/?`

        if(dadosFiltro.avaliacaoId){
            params = `${params}&avaliacaoId=${dadosFiltro.avaliacaoId}`
        }

        return this.get(params)
    }
}