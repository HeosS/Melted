/* Landing Melted
 * Autor: Sebastián Bascuñán a.k.a HeosS
 */
 //inicio de wow
 wow = new WOW({
    animateClass: 'animated',
    offset: 100,
    mobile: true
});
wow.init();
//cuando el documento esta listo
$(document).ready(function(){
	init();
    $('.wrapper').removeClass('hidden');
    $('.loader').addClass('remove');
    setTimeout(function(){
        $('.fondo').fadeOut('fast');
    }, 400);
    setTimeout(function(){
        $('.loader').remove();
    }, 600);
});

var privacidad = false;

function init(){
	formulario();
    scrollPage();
    $('.info-aviso').hide();
    //aviso de privacidad
    $('input[type=checkbox]').on('click', function(){
        var check = $("input:checked").length;
        if(check ==1){
            $('.form-checkbox').addClass('active');
        }else{
            $('.form-checkbox').removeClass('active');
        }
    });
    $('fieldset p strong').on('click', function(){
        if(privacidad == false){
            $('.info-aviso').slideDown('slow');
            privacidad = true;
        }else{
            $('.info-aviso').slideUp('slow');
            privacidad = false;
        }
    });
    //navbar mobile
    var navOpen = false;
    $('.navbar-toggler-icon').on('click', function(){
        if(navOpen == false){
            $('.navbar').addClass('open');
            navOpen = true;
        }else{
            $('.navbar').removeClass('open');
            navOpen = false;
        }
    });
}

function formulario(){
    $('#formulario').on('submit', function(e) {
        // Prevent form submission
        e.preventDefault();
        if (!$('#submit span').hasClass('fa-spinner')){
            // Get the form instance
            var $form = $(e.target);
            // Use Ajax to submit form data
            var url = '';
            // show the loading
            $('#submit').prepend($('<span></span>').addClass('fa fa-spinner fa-pulse fa-fw'));
            $('#submit').disabled = true;
            var jqxhr = $.post(url, $form.serialize(), function(data) {
                modal('enviado');
                $('#submit span').remove();
                $('input').val('');
            }).fail(function(data) {
                console.warn('Error! Data: ' + data.statusText);
                // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                if (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0) {
                    modal('error');
                }
                $('input').val('');
                $('#submit').html('ENVIAR');
                $('#submit span').remove();
                $('#submit').disabled = false;
            });
        }
    });
}

function modal(data){
    var msg;
    var classMsg;

    if(data == 'enviado'){
        msg = '<p><i class="fa fa-check"></i> Tus datos fueron enviados.</p>';
        classMsg = 'btn-success';
    }else if(data == 'ingresa'){
        msg = '<p><i class="fa fa-times"></i> Ingresa un código.</p>';
        classMsg = 'btn-warning';
    }else{
        msg = '<p><i class="fa fa-times"></i> Fallo el envío.</p>';
        classMsg = 'btn-warning';
    }

    $('body').append('<div class="msg-form ' + classMsg + '">' + msg + '</div>');

    setTimeout(function(){
        $('.msg-form').addClass('active');
    }, 300);

    setTimeout(function(){
        $('.msg-form').removeClass('active');
    }, 4000);

    setTimeout(function(){
        $('.msg-form').remove();
    }, 4500);
}


[].slice.call(document.querySelectorAll('input.input-field')).forEach(function(inputEl){
	if(inputEl.value.trim() !== ''){
		classie.add(inputEl.parentNode, 'input-filled');
	}

	inputEl.addEventListener('focus', onInputFocus);
	inputEl.addEventListener('blur', onInputBlur);
});

function onInputFocus(ev){
	classie.add(ev.target.parentNode, 'input-filled');
}

function onInputBlur(ev){
	if(ev.target.value.trim() === ''){
		classie.remove(ev.target.parentNode, 'input-filled');
	}
}

function scrollPage(){
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 600);
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $(window).on('scroll', function(event) {
        var scrollValue = $(window).scrollTop();
        if(scrollValue > 50) {
            $('.navbar').addClass('navbar-active');
        }else{
            $('.navbar').removeClass('navbar-active');
        }
    });
}

function salirModal(){
    $('.modal').fadeOut();
    setTimeout(function(){
        $('.modal').remove();
    }, 600);
}

/* ==========  START GOOGLE MAP ========== */

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

        var myLatLng = new google.maps.LatLng(-33.448196, -70.669133);
        var myLatLngCenter = new google.maps.LatLng(-33.435324, -70.615748);

        var mapOptions = {
            zoom: 13,
            center: myLatLngCenter,
            disableDefaultUI: true,
            scrollwheel: false,
            navigationControl: true,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            featureType: 'water',
            stylers: [{
                color: '#00a295'
            }, {
                visibility: 'on'
            }]
        }, {
            featureType: 'landscape',
            stylers: [{
                color: '#f2f2f2'
            }]
        }, {
            featureType: 'road',
            stylers: [{
                saturation: -100
            }, {
                lightness: 45
            }]
        }, {
            featureType: 'road.highway',
            stylers: [{
                visibility: 'simplified'
            }]
        }, {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#444444'
            }]
        }, {
            featureType: 'transit',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'poi',
            stylers: [{
                visibility: 'off'
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map-canvas');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-33.448196, -70.669133),
        map: map,
        icon: 'image/map-marker.png',
    });
}
// ========== END GOOGLE MAP ========== //