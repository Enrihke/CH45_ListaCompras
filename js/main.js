const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablalistacompras= document.getElementById("tablalistacompras");
const cuerpoTabla = tablalistacompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


// bandera, al ser true permite agregar los dtos a la tabala
let isValid = true;
let contador =0;
let precio = 0; 
let costoTotal=0;
let totalEnProductos=0;



function validarCantidad(){
    if (txtNumber.value.lenght==0){
        return false;
    }//length==0

    if (isNaN(txtNumber.value)){
        return false;
    } // isNaN()

    if(Number(txtNumber.value)<=0){
        return false;
    }//<=0

    return true;
}//validarCantidad()

function getPrecio(){
    return Math.round((Math.random() * 10000))/100;
}//getPrecio

btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
        txtNombre.style.border="";
        txtNumber.style.border="";
        alertValidacionesTexto.innerHTML="";
        alertValidaciones.style.display="none";
        isValid = true;
// Validar el nombre del producto
    if(txtNombre.value.lenght<3){
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto. <br/>";
        alertValidaciones.style.display="block"
        isValid = false;
    }//if lenght<3

 //validar la cantidad
    if (! validarCantidad()){
        txtNumber.style.border="solid red medium";
        alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta. <br/>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//validar cantidad

    if (isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = "$" + costoTotal.toFixed(2);

        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }//isvalid


}); //btnAgregar.addEventListener

// evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
}); // txtNombre.addEventListener

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
}); // txtNumber.addEventListener

window.addEventListener("load", function(event){
    txtNumber.value = txtNumber.value.trim();
});// txtNumber.addEventListener

window.addEventListener("load", function(){
    if(this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    }// null
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }// null

    if(this.localStorage.getItem("costoTotal")!= null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }//null
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
});//windows load


