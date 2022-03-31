 /*CODIGO PARA LOS TAMAÑOS DE LAS IMAGENES  */
 const grid  = new Muuri('.grid', {
    layout : {
        rounding: false    
    }
 });

 // este metodo nos permitirá que al cargar la pagina 
 // se haga una transición a las imagenes 
 window.addEventListener('load', () => {
	grid.refreshItems().layout();//refresca los elementos de nuestra grid 
    document.getElementById('grid').classList.add('imagenes-cargadas');
    
    
    /*Enlaces de filtrado*/
    // Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

            /**/
			const categoria = evento.target.innerHTML.toLowerCase();

            /* si la categoria es igual a todo se ejecuta este codigo*/
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

    // LISTENER PARA LA BARRA DE BUSQUEDA 
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});


	//LSITENER PARA LAS IMAGENES 
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});

	});

	// LISTENER PARA EL BOTON DE CERRAR 
	document.querySelector('#btn-cerrar-popup').addEventListener('click',() => {
		overlay.classList.remove('activo');
	});

	// LISTENER PARA EL OVERLAY 
	overlay.addEventListener('click', (evento) => {
		//condicional de una linea de codigo 
		// si el elemento al que yo le di un click tiene el id de overlay ejecuta este codigo 
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';

	});

 });
