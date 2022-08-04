
//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const listado=document.querySelector('#mostrar total');
const agregarGastoListado=document.querySelector('#agregarListado');
const btnInicial=document.getElementById("btnInicial");
const presu=document.querySelector('#presupuestoInicial');
//eventos
 
eventListeners();
function eventListeners()
{
    presu.focus();
    btnInicial.addEventListener('click',preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);
    gastos=JSON.parse( localStorage.getItem('gastos') || []);//operador or
    
}

//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto= Number(presupuesto);
        this.restante= Number(presupuesto);
        this.gastos=[]; // mi array
    }
    nuevoGasto(gasto){
        this.gastos= [...this.gastos,gasto]; //
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado=this.gastos.reduce((total,gasto)=>total+gasto.cantidad, 0);//Rest Parameters
        this.restante= this.presupuesto-gastado;
    }
 
}

class MOSTRAR{
    insertarPresupuesto(cantidad){
        const{presupuesto,restante}=cantidad; // desestructuración 
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
        agregarGastoListado(gastos){
            this.limpiarHTML();

            gastos.forEach(gasto => {
                const {cantidad, nombre, id} = gasto;
                const nuevoGasto= document.createElement('li');
             
              

              nuevoGasto.innerHTML=`${nombre} <span class="badge-primary badge-pill"> ${cantidad} </span>`;
              agregarGastoListado.appendChild(nuevoGasto);
            })
            }
            limpiarHTML(){
                while (agregarGastoListado.firstChild){
                    agregarGastoListado.removeChild(agregarGastoListado.firstChild);
                }
        }
}
//Instanciar
const mostrar=new MOSTRAR(); 
 
let presupuesto;


//funciones

   

function preguntarPresupuesto(){
   
    const presupuestoInicial=Number( document.querySelector('#presupuestoInicial').value);
   
   presupuesto=new Presupuesto(presupuestoInicial);
 
   if (presupuestoInicial ===''|| presupuestoInicial === null
     || isNaN(presupuestoInicial)||presupuestoInicial <=0)
    { 
        window.location.reload();
         
       
}else{
             console.log(presupuesto)
            const {gastos ,restante}=presupuesto;
            mostrar.insertarPresupuesto(presupuesto);
           
        } 

       
    }
//validacion para el formulario agregar

function agregarGasto(e){
    e.preventDefault();
    
//leo datos del formulario
    const nombre=document.querySelector('#gasto').value; //leo los datos del formulario
    const cantidad= Number(document.querySelector('#cantidad').value);
    
    //valido campos
    if(nombre ==='' || cantidad ===''){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ambos campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
          })
        //mostrar.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    }
        
      else if(cantidad <=0 || isNaN(cantidad)){
       Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Cantidad no válida',
            showConfirmButton: false,
           timer: 3000
          }) 
       //mostrar.imprimirAlerta('Cantidad no valida','error');
        return;
       
      } 
       
      const gasto={nombre,cantidad, id: Date.now()}//desestructurado por parámetro
      // ingreso nuevo gasto
      presupuesto.nuevoGasto(gasto);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agregó Gasto',
        showConfirmButton: false,
        timer: 2500
      })
      //mostrar.imprimirAlerta('Gasto Correctamente'); cambie las alertas simples por SweetAlert
      //imprimo los gastos
      const {gastos ,restante}=presupuesto;

      mostrar.agregarGastoListado(gastos);
      mostrar.actualizarRestante(restante);
      presu.value="";
      
      


        const gastoString=JSON.stringify(gastos);
        localStorage.setItem('gastos',gastoString);

     formulario.reset();
   
    }
    //fecha
    let hoy= new Date(),
        dia= hoy.getDay(),
        mes= hoy.getMonth(),
        year=hoy.getFullYear();
    
    let pdiaSemana= document.getElementById('diaSemana');
    let pdia= document.getElementById('dia');
    let pmes=document.getElementById('mes');
    let pyear=document.getElementById('year');
    let dias=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    let meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    let numeroDiaSemana= hoy.getDay();
    pdiaSemana.textContent= dias[numeroDiaSemana];
    pdia.textContent=dia;
    pmes.textContent=meses[mes];
    pyear.textContent=year;