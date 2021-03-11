import ApiService from '../apiservice'

export default class ProjetoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/projetos')
    }

    consultar(projetoFiltro){
        let params = `?idProfessor=${projetoFiltro.idProfessor}`

        if(projetoFiltro.ano){
            params = `${params}&ano=${projetoFiltro.ano}`
        }

        return this.get('params')
    }
}