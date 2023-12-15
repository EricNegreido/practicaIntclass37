import {ticketService} from '../services/ticket.services.js'

const generateTicket = async(req, res) => {

    try {
        const {amount, purchaser} = req.body;
        const result = await ticketService(amount,purchaser);
        req.logger.error('successfully generated tickt');
        res.status(201).send({status: 'sucess', payload: result}); 

    } catch (error) {
        req.logger.error('Error generating ticket');
        res.status(500).send({status: 'error', error: error.message})

    }
   

}

export default generateTicket;