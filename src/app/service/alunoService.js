import ApiService from '../apiservice'

export default class AlunosService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/alunos')
    }

    getByMatricula(id){
        return this.get('/1')
    }
}