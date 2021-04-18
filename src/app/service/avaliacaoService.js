import ApiService from '../apiservice'

export default class AvaliacaoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/avaliacoes')
    }

    listarByProfessorId(id){
        return this.get(`/${id}`)
    }
}