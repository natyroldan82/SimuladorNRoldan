//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const listado=document.querySelector('#mostrar total');


//eventos

eventListeners();
function eventListeners()
{
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    console.log(Number(preguntarPresupuesto));
    formulario.addEventListener('submit',agregarGasto);
}

//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto= Number(presupuesto);
        this.restante= Number(presupuesto);
        this.gastos=[]; // mi array
    }
    nuevoGasto(gasto){
        this.gastos= [...this.gastos,gasto]; //... copia  el arreglo y se agrega el nuevo gasto
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado=this.gastos.reduce((total,gasto)=>total+gasto.cantidad, 0);
        this.restante= this.presupuesto-gastado;
    }
}
class MOSTRAR{
    insertarPresupuesto(cantidad){
        const{presupuesto,restante}=cantidad;
        document.querySelector('#total').textContent=presupuesto;
        document.querySelector('#saldo').textContent=restante;
    }   
        imprimirAlerta(mensaje,tipo){
       const divMensaje= document.createElement('div');
       divMensaje.classList.add('text-center','alert');
       if (tipo ==='error'){
           divMensaje.classList.add('alert-danger');//alerta de boostrap
       }else{
               divMensaje.classList.add('aleta-success');
           }
           divMensaje.textContent= mensaje;
            document.querySelector('.col-md-6').insertBefore(divMensaje, formulario);
            setTimeout(()=> {
                divMensaje.remove();
            }, 3000);
       }
        actualizarRestante(restante){
            document.querySelector('#saldo').textContent=restante; 
        }
    }
//Instanciar
const mostrar=new MOSTRAR(); 
let presupuesto;


//funciones

function preguntarPresupuesto(){
    const presupuestoInicial= prompt('Cual es tu presupuesto?');
    console.log(Number(presupuestoInicial));
    if (presupuestoInicial ===''|| presupuestoInicial === null
     || isNaN(presupuestoInicial)||presupuestoInicial <=0)
    { //si le doy a cancelar o aceptar no va a cargar 
        window.location.reload();
    }
   presupuesto=new Presupuesto(presupuestoInicial);
   console.log(presupuesto);
   mostrar.insertarPresupuesto(presupuesto);
}
//validacion para el formulario agregar

function agregarGasto(e){
    e.preventDefault();

    const nombre=document.querySelector('#gasto').value; //leo los datos del formulario
    const cantidad= Number(document.querySelector('#cantidad').value);
    //validar
    if(nombre ==='' || cantidad ===''){
        mostrar.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    }
        
      else if(cantidad <= 0 || isNaN(cantidad)){
        mostrar.imprimirAlerta('Cantidad no valida','error');
        return;
       
      } 
      const gasto={nombre,cantidad}
      // ingreso nuevo gasto
      presupuesto.nuevoGasto(gasto);
      mostrar.imprimirAlerta('Gasto Correctamente');
      //imprimo los gastos
      const {gastos ,restante}=presupuesto;
    
      mostrar.actualizarRestante(restante);
      formulario.reset();
      } 
     