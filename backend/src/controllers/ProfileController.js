const connection = require('../database/connection');

module.exports ={
    async index(request, response) {
        const inputers_id = request.headers.authorization;
        
        const hpt = await connection('hpt')
        .where('inputers_id', inputers_id)
        .select('*');

        return response.json(hpt);
    }
}