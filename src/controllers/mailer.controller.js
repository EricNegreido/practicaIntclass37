import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user:'ericnegreidooo@gmail.com',
        pass:'ozopmzysnlddgcbn'
    }

});

const sendMail = async (req, res) =>{
    const {content, email} = req.body;
    try {
        await transporter.sendMail({
            from: 'AppCoder',
            to: email,
            subject: 'TICKET DE COMPRA',
            html: content
        });
    req.logger.info("Sended Mail")
    res.send('Sended Mail');

    } catch (error) {
        req.logger.error("error seding mail")
        res.status(500).send({status: 'error', error: error.message})

    }
    

}

export default sendMail