

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
				if(document.documentElement.clientWidth > 991) {
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
				}

			})

			//let title = item.querySelector('.card-product__title');
			
		}

		let titles = document.querySelectorAll('.card-product__title');
		if(titles.length) {
			let arr = [];
			let maxHeight;

			titles.forEach(title => {
				title.addEventListener('click', function(e){
					if(document.documentElement.clientWidth < 992) {
						this.closest('.card-product__inner').classList.toggle('_active');
						_slideToggle(this.nextElementSibling);
						
						for(let i of titles) {
							if( i == this) {
								continue
							} else {
								i.closest('.card-product__inner').classList.remove('_active');
								_slideUp(i.nextElementSibling);
							}
							
						}
					}
				});

				arr.push(title.clientHeight);

				
			})
			if(document.documentElement.clientWidth > 991) {
				maxHeight = Math.max(...arr);
				titles.forEach(title => {
					title.style.height = maxHeight + 'px';
				})
			}

		
			
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

	const observer = new IntersectionObserver(entries => {
		entries.forEach(elem => {
		  if (elem.isIntersecting) {
		   let id = elem.target.id;

			console.dir(elem.target);
			let menuList = document.querySelector('.menu__list');

			for(let item of menuList.children) {
				let a = item.querySelector('a');
				let anchor = a.getAttribute('href').replace('#', '');
				if(id == anchor) {
					item.classList.add('_active');

					for(let i of menuList.children) {
						if(i === item) {
							continue
						} 
						i.classList.remove('_active');
					}
				}
				 
			}
		  }
		});
	  });
	  

	  let observeBlock = document.querySelectorAll('._observe');
	  if(observeBlock) {
		  window.addEventListener('scroll', () => {
  
			  for(let item of observeBlock) {
				  if(item.getBoundingClientRect().top <= (document.documentElement.clientHeight / 2) && item.getBoundingClientRect().bottom >= (document.documentElement.clientHeight / 2)) {
					  let id = item.id;
					  
					  let menuList = document.querySelector('.menu__list');

					  for(let item of menuList.children) {
						  let a = item.querySelector('a');
						  let anchor = a.getAttribute('href').replace('#', '');
						  if(id == anchor) {
							  item.classList.add('_active');
		  
							  for(let i of menuList.children) {
								  if(i === item) {
									  continue
								  } 
								  i.classList.remove('_active');
							  }
						  }
						   
					  }
				  }
			  }
		  })
	  }


	  const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

	

// == form contact error =============================
let form = document.querySelector('.wpcf7-form');
if(form) {
	let outputErr = form.querySelector('.wpcf7-response-output');
	let formTextarea = form.querySelector('.from-contact__textarea-wrap');
	formTextarea.after(outputErr);
}
// == // form contact error =============================


});

