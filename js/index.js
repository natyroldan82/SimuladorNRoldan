//variables y selectores
/*input.oninput = function() {
    presu.innerHTML = input.value;
    
  }*/


//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const listado=document.querySelector('#mostrar total');
const agregarListado=document.querySelector('#agregarListado');


//eventos

eventListeners();
function eventListeners()
{
   
    formulario.addEventListener('submit',agregarGasto);
    document.addEventListener('onclick',preguntarPresupuesto);
    gastos=JSON.parse( localStorage.getItem('gastos') || []);
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
           divMensaje.classList.add('alert-danger');//alertas de boostrap
       }else{
               divMensaje.classList.add('aleta-success');
           }
           divMensaje.textContent= mensaje;
            document.querySelector('.col-md-6').insertBefore(divMensaje, formulario);
            setTimeout(()=> {
                divMensaje.remove();
            }, 1000);
       }
        actualizarRestante(restante){
            document.querySelector('#saldo').textContent=restante; 
        }
        //iterar
      /* agregarListado(gastos){
            gastos.forEach(gasto => {
                const {cantidad, nombre, id} = gasto;
                const nuevoGasto= document.createElement('li');
              nuevoGasto.className='list-group-item d-flex justify-content-between align-items-center';
              nuevoGasto.dataset.id = id;
              console.log(nuevoGasto);

              nuevoGasto.innerText=`${nombre} < span class="badge-primary badge-pill"> ${cantidad}</span`;
              agregarListado.appendChild(li);
            })*/
        }
    
//Instanciar
const mostrar=new MOSTRAR(); 
 
let presupuesto;


//funciones

   

function preguntarPresupuesto(){
    const presupuestoInicial=Number( document.querySelector('#presupuestoInicial').value);
  
   presupuesto=new Presupuesto(presupuestoInicial);
   console.log(presupuesto)
   const {gastos ,restante}=presupuesto;
   mostrar.insertarPresupuesto(presupuesto);
   
}
//validacion para el formulario agregar

function agregarGasto(e){
    e.preventDefault();
//leo datos del formulario
    const nombre=document.querySelector('#gasto').value; //leo los datos del formulario
    const cantidad= Number(document.querySelector('#cantidad').value);
   
    //valido campos
    if(nombre ==='' || cantidad ===''){
        mostrar.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    }
        
      else if(cantidad <=0 || isNaN(cantidad)){
        mostrar.imprimirAlerta('Cantidad no valida','error');
        return;
       
      } 
      
      const gasto={nombre,cantidad, id: Date.now()}
      // ingreso nuevo gasto
      presupuesto.nuevoGasto(gasto);
      mostrar.imprimirAlerta('Gasto Correctamente');
      //imprimo los gastos
      const {gastos ,restante}=presupuesto;

     /*/ mostrar.agregarListado(presupuesto);*/
      mostrar.actualizarRestante(restante);
      


        const gastoString=JSON.stringify(gastos);
        localStorage.setItem('gastos',gastoString);

     formulario.reset();
    
    }
     