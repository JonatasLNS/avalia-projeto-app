import ApiService from '../apiservice'

export default class ProjetoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/projetos')
    }

    salvar(projeto){
        return this.post('/', projeto);
        
    }

    consultar(projetoFiltro){
        let params = `?idProfessor=${projetoFiltro.idProfessor}`

        if(projetoFiltro.ano){
            params = `${params}&ano=${projetoFiltro.ano}`
        }

        return this.get(params)
    }

    obterProjetoById(id){
        return this.get(`/${id}`)
    }

}