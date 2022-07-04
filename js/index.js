//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const listado=document.querySelector('#mostrar total');





//eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    console.log (Number(preguntarPresupuesto));
}



//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto= Number(presupuesto);
    }
}


let presupuesto;
//funciones
function preguntarPresupuesto(){
    const presupuestoInicial= prompt('Cual es tu presupuesto?')
   // console.log(Number(presupuestoInicial));
    if (presupuestoInicial ===''|| presupuestoInicial === null || isNaN(presupuestoInicial)||presupuestoInicial <=0)
    { //si le doy a cancelar o aceptar no va a empezar
        window.location.reload();
    }
   
}