import ApiService from '../apiservice'

export default class DimensaoService extends ApiService {
    constructor(){
        // Precisa ser igual ao @RequestMapping da classe Resource
        super('/api/dimensoes')
    }

    listarDimensoes(){
        return this.get(`/`)
    }
}