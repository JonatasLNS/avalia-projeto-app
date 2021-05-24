import ApiService from '../apiservice'

export default class AlunosService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/professores')
    }

    consultar(professorFiltro){
 
        let params = `/?`

        if(professorFiltro.nome){
            params = `${params}&nome=${professorFiltro.nome}`
        }

        if(professorFiltro.disciplina){
            params = `${params}&disciplina=${professorFiltro.disciplina}`
        }

        return this.get(params)
    }
}