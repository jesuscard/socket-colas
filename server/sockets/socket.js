const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('numeroTicket', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguienteTicket();

        console.log(siguienteTicket)
        
        callback(siguienteTicket);
    })

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimoCuatro()
    })

    client.on('atenderTicket',(data, callback) => {
        
        if ( !data.escritorio ){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        console.log('Socket', data.escritorio)
        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTicket)

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimoCuatro()
        })
        //
    })

});