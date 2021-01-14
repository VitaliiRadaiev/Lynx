

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };


$(document).ready(function () {
	document.body.classList.add('is-load');

	// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	// === // Проверка, поддержка браузером формата webp ==================================================================


	@@include('_function.js');
	@@include('files/dynamic_adapt.js');
	@@include('forms.js');
	

	{
		let aboutList = document.querySelector('.about__list');
		if(aboutList) {
			let arr = [...aboutList.children];
			let count = Math.ceil(aboutList.children.length / 2);
			for (let i = 0; i < 2; i++) {
				let column = document.createElement('div');
				column.className = 'column';

				for (let j = 0; j < count; j++) {
					if (arr[j]) {

						column.append(arr[j]);
					}
				}
				arr = arr.slice(count)
				aboutList.append(column);
			}
		}
	}

	// === product handler ========================================
	let productList = document.querySelector('.products__list');
	if(productList) {
		for(let item of productList.children) {
			item.addEventListener('click', function(e) {
				item.classList.add('_big');
				item.classList.remove('_mini');
				item.style.gridRowEnd = 'span ' + (productList.children.length -1);
				item.style.animation = 'fadeInCard 1.6s ease forwards, scaleCard 0.6s ease forwards';
				productList.classList.add('_open');

				let count = ((productList.children.length - 1)) * 0.1;
				
				
				
				for(let i of productList.children) {
					if( i == this) {
						continue
					} else {
						i.classList.remove('_big');
						i.classList.add('_mini');
						i.style.gridRowEnd = 'auto';
						i.style.animation = 'fadeInCard2 0.6s linear forwards ' + count + 's';
						count -= 0.1;
					}
				}
			})
		}

		document.body.addEventListener('click', (e)=> {
			if(!e.target.closest('.products__list')) {
				productList.classList.remove('_open')
				for(let item of productList.children) {
					item.classList.remove('_big');
					item.classList.remove('_mini');
					item.style.gridRowEnd = 'auto';
					item.style.animation = '';
				}
			}
		})
	}
	// === // product handler ========================================
	
});

//@@include('plagins/lazy-load.js');
