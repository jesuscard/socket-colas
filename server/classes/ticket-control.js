const { throws } = require('assert');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }

}

class TicketControl {
    constructor(){
        this.ultimo =  0,
        this.hoy =  new Date().getDate();
        this.tickets = []
        this.ultimosCuatros = []

        let data = require('../data/data.json');

        if ( data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatros =  data.ultimosCuatros;

        } else {

            this.reiniciarConteo()
        }
    }

    siguienteTicket(){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Tickect ${this.ultimo}`;
    }

    getUltimoTicket(){
        return  `Tickect ${this.ultimo}`;
    }

    getUltimoCuatro(){
        return  this.ultimosCuatros;
    }
    atenderTicket(escritorio){
        if ( this.tickets.length === 0 ){
            return 'No hay tickets'
        }

        let numeroTicket =  this.tickets[0].numero
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio)

        this.ultimosCuatros.unshift(atenderTicket)

        if ( this.ultimosCuatros.length > 4){
            this.ultimosCuatros.splice(-1,1); //Borra el último elemento
        }

        console.log('últimos 4', this.ultimosCuatros)

        this.grabarArchivo();

        return atenderTicket
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = []
        this.ultimosCuatros =  []
        console.log('reiniciar el conteo')

        this.grabarArchivo();
    }

    grabarArchivo(){

      let jsonData = {
          ultimo: this.ultimo,
          hoy: this.hoy,
          tickets: this.tickets,
          ultimosCuatros: this.ultimosCuatros
      }

      let jsonDataString = JSON.stringify(jsonData);
      
      fs.writeFileSync('server/data/data.json',jsonDataString)
    }
}

module.exports = {
    TicketControl
}