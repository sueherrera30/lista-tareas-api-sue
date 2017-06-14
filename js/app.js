var api ={
	url: 'https://lab-api-test.herokuapp.com/tasks/'
};
	

var $taskList = $("#tasks-list");

var cargarPagina = function() {
	cargarTareas();
	$("#add-form").submit(agregarTarea);
	$(document).on("click",".bote",borrarTarea);
	/*$(document).on("click",".ojo",verTarea);*/
    /*$(document).on("click",".lapiz",editarTarea);*/
};


var cargarTareas = function (){
	$.getJSON(api.url, function(tareas){		
		tareas.forEach(crearTarea);
	});
}
var crearTarea = function(tarea){
			var nombre =tarea.name;
	        var id = tarea._id;
	
			var estado =tarea.status[0];
			/*creamos la fila */
			/*console.log(nombre + " " + estado);*/
			var $tr =$("<tr/>").attr("data-id",id);
	
	
			/*creamos ls celda del nombre*/
			var $nombreTd =$("<td/>");
			$nombreTd.text(nombre);
			/*creamos la celda del estado*/
			var $estadoTd =$("<td/>");
			$estadoTd.text(estado);
	        /*celda de opciones*/
	        var $opcionesTd =$("<td/>"); 
	        var $iconoEliminar = $("<span/>",{"class":"glyphicon glyphicon-trash bote","data-id":id});
			var $iconoLapiz = $("<span/>",{"class":"glyphicon glyphicon-pencil lapiz" });
	        var $iconoVer = $("<span/>",{"class":"glyphicon glyphicon-eye-open ojo"});
	        $opcionesTd.append($iconoVer);
	        $opcionesTd.append($iconoEliminar);
	        $opcionesTd.append($iconoLapiz);
			
			$tr.append($nombreTd);
			$tr.append($estadoTd);
	        $tr.append($opcionesTd);
			$taskList.append($tr);
};


var borrarTarea = function(){
	
 var $idAborrar = $(this).attr("data-id");
	
 $.ajax(
 {url: api.url +$idAborrar,
  type:'delete',
  success:function(data){
   	cargarTareas();
   }
  });
};


/*funcion de agregar tarea nueva*/
var agregarTarea = function(e){
	e.preventDefault();
	var nombre = $("#nombre-tarea").val();
	/*hacer peticion ajax
	1er parametro es url , ya la tenemos arriba , la seguda es la nfo que debemos enviar,el key value,es un objeto, como en postman, agregabamos un nombre etc. tercer parametro es al respuesta que esta en un callback,despues nos devuelve un objeto nuevo :O */
	$.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
	});
};

$(document).ready(cargarPagina);