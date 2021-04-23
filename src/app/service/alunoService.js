import ApiService from '../apiservice'

export default class AlunosService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/alunos')
    }

    getByMatricula(matricula){
        return this.get(`/${matricula}`)
    }
}