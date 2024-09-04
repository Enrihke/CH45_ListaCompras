const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
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

let datos= new Array();


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

        let elemento ={"contador":contador, 
                        "nombre":txtNombre.value,
                        "cantidad":txtNumber.value,
                        "precio":precio};
        
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));
        
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

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    //Limpiar el valor de los campos
    txtNombre.value="";
    txtNumber.value="";
    //Limpiar el localstorage
    //Elimina  por cada llave/clave un solo elemento
    // localStorage.removeItem("contador");
    // localStorage.removeItem("costoTotal");
    // localStorage.removeItem("totalEnProductos");
    //Elimina todo el contenido en el Local storage
    localStorage.clear();
    
    //Limpiar la tabla
    cuerpoTabla.innerHTML = "";
    //Reiniciar las variables , contador, cosotoTotal, totalEnProductos
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    //Asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$" + totalEnProductos.toFixed(2);

    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus();
});

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

    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }// =null
    datos.forEach(r => {
        let row = `<tr>
                        <td>${r.contador}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td> 
                    `<tr>
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });// forEach
    
});//windows load




