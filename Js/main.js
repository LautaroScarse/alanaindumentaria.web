if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => {
      console.log("Service Worker registrado", reg);
    })
    .catch(err => {
      console.error("Error al registrar SW:", err);
    });
}
;(function () {

	let sticky = false
	let currentPostition = 0
	let currentIndex = 0
	const images = $("#gallery .image")
	
	const imageCounter = parseInt$("[data-name='image-counter']").attr("content")
	
	const imageWidth = 310
	const email = "lautaroscarselletta1234@gmail.com"

	$("#contacto").on("submit",function(ev){
		ev.preventDefault()

		sendForm($(this))

		return false

	})

// ocultar sticky al inicio
$("#sticky-nav").removeClass("hidden")
$("#sticky-nav").slideUp(0)
checkScroll()

isOpen()

// botón hamburguesa
$("#menu-opener").on("click", function(){
  $("#responsive-nav").toggleClass("active")
})

// cerrar menú al hacer click en un link
$(".menu-link").on("click", function(){
  $("#responsive-nav").removeClass("active")
})


// GALERÍA (esto va afuera, no dentro del click)
setInterval(() => {

  if (currentPostition < imageCounter -1) {
    currentPostition++
  } else {
    currentPostition = 0
  }

  $("#gallery .inner").css({
  transform: "translateX(-" + (currentPostition * imageWidth) + "px)"
	})

}, 4000)


 //SCROLL
$(window).scroll(checkScroll)

	function checkScroll(){const inBottom = isInBottom()

  if (inBottom && !sticky) {
   sticky = true
   stickNavigation()
  }

  if (!inBottom && sticky) {
    sticky = false
    unstickNavigation()
 }
}

images.on("click", function(){
  currentIndex = images.index(this)

  const bg = $(this).css("background-image")
  const url = bg.replace('url("','').replace('")','')

  $("#lightbox-img").attr("src", url)
  $("#lightbox").removeClass("hidden")
})

$("#close").on("click", function(){
  $("#lightbox").addClass("hidden")
})

$("#next").on("click", function(){
  currentIndex = (currentIndex + 1) % images.length
  updateImage()
})

$("#prev").on("click", function(){
  currentIndex = (currentIndex - 1 + images.length) % images.length
  updateImage()
})


	function isOpen(){
  let date = new Date()
  let hour = date.getHours()

  if (hour < 9 || hour > 20){
    $("#is-open .text").html("Cerrado ahora <br> Abrimos de 9 a 20")
  } else {
    $("#is-open .text").html("Abierto ahora 🟢")
  }
}

isOpen()
	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("i.bi.bi-list")
	}

	/*function stickNavigation() {
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp()
		$("#sticky-navigation").slideDown()
	}

	function unstickNavigation() {
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown()
		$("#sticky-navigation").slideUp()
	}*/

	function isInBottom() {
		const $description = $("#description")
		const descriptionHeight = $description.height()

		return $(window).scrollTop() >
			$(window).height() - (descriptionHeight * 2)
	}
	function updateImage(){
  const bg = $(images[currentIndex]).css("background-image")
  const url = bg.replace('url("','').replace('")','')

  $("#lightbox-img").attr("src", url)
}

})()
