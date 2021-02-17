require('colors')
const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }


    get listadoArr() {
        const listado = [];
        Object.keys( this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }


    cargarTareasFromArray( tareas = [] ) {

        console.log('desde taras arra')
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });
    }


    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;
    }


    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }


    listadoCompleto() {
        this.listadoArr.forEach( ({desc, completadoEn}, index) => {
            console.log( `${index+1}.`.green, `${desc} :: ${ completadoEn ? 'Completada'.green : 'Pendiente'.red}` );
        })
    }


    listarPendientesCompletadas( completadas = true ) {
        this.listadoArr.forEach( ({desc, completadoEn}, index) => {
            if ( completadas ) {
                if( completadoEn ) {
                    console.log( `${index+1}.`.green, `${desc} :: ${completadoEn.green}` );
                }
            } else {
                if( !completadoEn ) {
                    console.log( `${index+1}.`.green, `${desc} :: ${'Pendiente'.red}` );
                }
            }
        });
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}


module.exports = Tareas;