//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const listado=document.querySelector('#mostrar total');
const agregarGastoListado=document.querySelector('#agregarListado');
const btnInicial=document.getElementById("btnInicial");
const presu=document.querySelector('#presupuestoInicial');
const agregar= document.getElementById("btnAgregar");
const nombre=document.getElementById('gasto'); //leo los datos del formulario
const cantidad= Number(document.getElementById('cantidad'));
//eventos
 
eventListeners();
function eventListeners()
{
    nombre.value="";
     cantidad.value="";
    presu.focus();
    btnInicial.addEventListener('click',preguntarPresupuesto);
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
        this.gastos= [...this.gastos,gasto]; //
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado=this.gastos.reduce((total,gasto)=> total+gasto.cantidad, 0);//Rest Parameters
        this.restante= this.presupuesto - gastado;
        
    }
 eliminarGasto(id){
  this.gastos= this.gastos.filter(gasto => gasto.id !== id);
  this.calcularRestante();
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
                 nuevoGasto.className= 'list-group-item justify-content-between align-items-center';
                 nuevoGasto.dataset.id =id;
                 nuevoGasto.innerHTML=`${nombre} <span class="badge-primary badge-pill"> $ ${cantidad} </span>`;
                agregarGastoListado.appendChild(nuevoGasto);

              const btnBorrar = document.createElement ('button');
              btnBorrar.classList.add('btn', 'btn-danger','borrar-gasto');
              btnBorrar.textContent= 'Borrar';
              btnBorrar.onclick = () =>{
                eliminarGasto(id);
                formulario.focus();
              }

              nuevoGasto.appendChild(btnBorrar);


             agregarGastoListado.appendChild(nuevoGasto);



            })
            }
            limpiarHTML(){
                while (agregarGastoListado.firstChild){
                    agregarGastoListado.removeChild(agregarGastoListado.firstChild);
                }
        }
        actualizarRestante(restante){
            document.querySelector('#saldo').textContent= restante;
        }
        comprobarPresupuesto(presupuestoOjb){
           const {restante}= presupuestoOjb;
           const restanteDiv= document.querySelector('.restante');
           
          
           if (restante <= 0){
            restanteDiv.classList.remove ('alert-success');
            restanteDiv.classList.add('alert-danger');
            btnAgregar.disabled=true; 
            console.log('ya gastaste todo');
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Te pasaste de tu presupuesto',
                showConfirmButton: false,
                timer: 2000
              }) }
              else{
                restanteDiv.classList.remove ('alert-danger');
                restanteDiv.classList.add('alert-success');
                
              }
               
              presu.focus();
              presu.value=""; 
              presu.disabled= true;
             
    
        }
    }
//Instanciar
const mostrar=new MOSTRAR(); 
 
let presupuesto;


   function preguntarPresupuesto(){
   
    const presupuestoInicial=Number( document.querySelector('#presupuestoInicial').value);
    const nombre=document.querySelector('#gasto');
   presupuesto=new Presupuesto(presupuestoInicial);
 
   if (presupuestoInicial ===''|| presupuestoInicial === null
     || isNaN(presupuestoInicial)||presupuestoInicial <=0)
    { 
     window.location.reload();
     mostrar.imprimirAlerta('Ingresa valor ','error'); 
      
       
}else{
        console.log(presupuesto)
            const {gastos,restante}=presupuesto;
            mostrar.insertarPresupuesto(presupuesto);
            
        } 

        presu.value=""; 
     presu.disabled= true;
    
     btnInicial.disabled= true;
    nombre.focus();
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
       //mostrar.imprimirAlerta('Cantidad no valida','error');//utilice SweetAlert 
        return;
       
      } 
       
      const gasto={nombre,cantidad, id: Date.now()}//desestructurado por parámetro
      // ingreso nuevo gasto
      presupuesto.nuevoGasto(gasto);
      document.getElementById("gasto").focus();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agregó Gasto',
        showConfirmButton: false,
        timer: 1000
      })
      //mostrar.imprimirAlerta('Gasto Correctamente'); //cambie las alertas simples por SweetAlert
      //imprimo los gastos
      const {gastos,restante} = presupuesto;
      mostrar.agregarGastoListado(gastos);
      mostrar.actualizarRestante (restante);
      
    mostrar.comprobarPresupuesto(presupuesto);

        const gastoString=JSON.stringify(gastos);
        localStorage.setItem('gastos',gastoString);
       
     formulario.reset();
     presu.value="";
     nombre.value="";
     cantidad.value="";
   
    }

function eliminarGasto(id){
   presupuesto.eliminarGasto(id);
   const{ gastos,restante}= presupuesto;
   mostrar.agregarGastoListado(gastos);
   mostrar.actualizarRestante(restante);
   mostrar.comprobarPresupuesto(presupuesto);
  btnAgregar.disabled= false;
  document.getElementById("gasto").focus();
}
   
    
   //fecha . 
   (function(){
    let actualizarFecha= function(){
    const fecha= new Date(),
         diaSemana= fecha.getDay(),
         dia=fecha.getDate(),
         mes= fecha.getMonth(),
         year=fecha.getFullYear();
       


let  pdiaSemana= document.getElementById('diaSemana'),
     pDia= document.getElementById('dia'),
     pMes=document.getElementById('mes'),
      pYear=document.getElementById('year');

 let semana=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
 pdiaSemana.textContent= semana[diaSemana];
 pDia.textContent=dia;

let meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
 
 pMes.textContent= meses[mes];
 pYear.textContent= year;
    
}
actualizarFecha();
}())



//API
const url= 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
fetch(url)
    .then (response => response.json())
    .then (data => {
        let compra= document.getElementById('c1')
        let venta= document.getElementById('v1')
        compra.innerHTML= `$${data['1'].casa.compra}`
        venta.innerHTML= `$${data['1'].casa.venta}`;
         console.log(data['1'].casa.compra),
         console.log(data['1'].casa.nombre),
         console.log(data['1'].casa.venta)})
     
    
   

    