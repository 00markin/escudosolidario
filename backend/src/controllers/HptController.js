const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await connection('hpt').count();
        
        const hpt = await connection('hpt')
        .join('inputers', 'inputers.id', '=', 'hpt.inputers_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['hpt.*', 'inputers.name', 'inputers.email', 'inputers.whatsapp', 'inputers.city','inputers.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(hpt);
    },
   
    async create(request, response) {
        const { hospital, address, value } = request.body;
        const inputers_id = request.headers.authorization;

        const [id] = await connectiotion('hpt').insert({
            hospital,
            address,
            value,
            inputers_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const inputers_id = request.headers.authorization;

        const hpt = await connection('hpt')
            .where('id', id)
            .select('inputers_id')
            .first();

        if (hpt.inputers_id != inputers_id) {
            return response.status(401).json ({ error: 'Operation not permitted'});
        }

        await connection('hpt').where('id', id).delete();

        return response.status(204).send();
    }
};