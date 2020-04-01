const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const inputer = await connection('inputers')
            .where('id', id)
            .select('name')
            .first();
        
        if (!inputer) {
            return response.status(400).json({error: 'No input found with this id'});
        }

        return response.json(input);
    }
}