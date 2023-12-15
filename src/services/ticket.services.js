import TicketModel from '../dao/dbManagers/models/ticket.models.js';

const ticketService = async( amount, purchaser) =>{

    try {
        const purchaser_datetime = new Date().toISOString();
        const code = "Ticket";

        const newTicket = new TicketModel({
            code,
            purchaser_datetime,
            amount,
            purchaser,
        });

        const savedTicket = await newTicket.save();
        
        return savedTicket;
    } catch (error) {
        console.error('Error generating ticket:', error);
        throw new Error('Error generating ticket');
    }
};

export {ticketService}