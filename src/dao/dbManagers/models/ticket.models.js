import mongoose from 'mongoose'

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
    code: String,
    purchaser_datetime: String,
    amount: Number,
    purchaser: String

});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;

