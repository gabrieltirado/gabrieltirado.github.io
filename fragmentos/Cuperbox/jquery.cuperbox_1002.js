/**
 * Plugin que genera un iframe-lightbox en base a los parametros de referencia.
 * 
 * @param options
 *            string({ widht: Ancho del lightbox. height: Altura del lightbox.
 *            url: Dirección electrónica que se debe cargar en el
 *            iframe-lightbox. });
 * @author OFlorez
 * @since 2013
 */
(function(__jquery) {

    __jquery.fn.cuperbox = function(custom) {
        if (typeof (custom.overlay) === 'undefined') {
            custom.overlay = {};
        }
        if (typeof (custom.iframe) === 'undefined') {
            custom.iframe = {};
        }
        if (typeof (custom.container) === 'undefined') {
            custom.container = {};
        }

        /* Creacion de overlay para lightbox */
        var option = {
            overlay: {
                id: (typeof(custom.overlay.id) !== 'undefined' ? custom.overlay.id : 'cuper-overlay'),
                clase: (typeof(custom.overlay.clase) !== 'undefined' ? custom.overlay.clase : 'cuper-overlay')
            },
            container: {
                id: (typeof(custom.container.id) !== 'undefined' ? custom.container.id : 'cuper-container'),
                clase: (typeof(custom.container.clase) !== 'undefined' ? custom.container.clase : 'cuper-container'),
                width: (typeof(custom.container.width) !== 'undefined' ? custom.container.width : '100%'),
                height: (typeof(custom.container.height) !== 'undefined' ? custom.container.height : '100%')
            },
            iframe: {
                id: (typeof(custom.iframe.id) !== 'undefined' ? custom.iframe.id : 'cuper-iframe'),
                clase: (typeof(custom.iframe.clase) !== 'undefined' ? custom.iframe.clase : 'cuper-iframe'),
                name: (typeof(custom.iframe.name) !== 'undefined' ? custom.iframe.name : 'cuper-iframe'),
                src: (typeof(custom.iframe.src) !== 'undefined' ? custom.iframe.src : ''),
                width: '100%',
                height: '100%',
                frameborder: '0'
            }
        };

        var cuperbox = document.createElement("div");
        var overlay = document.createElement("div");
        var containerIframe = document.createElement("div");
        var iframe = document.createElement('iframe');
        var attr = document.createAttribute('class');
        var ancla = document.createElement("a");
        console.log(ancla);
        /* Atributos para el contenedor principal de cuperbox */
        attr = document.createAttribute('id');
        attr.value = "cuperbox";
        cuperbox.setAttributeNode(attr);

        /*attr = document.createAttribute('class');
         attr = "cuperbox";
         cuperbox.setAttributeNode(attr);*/

        /*Atributos para el botón de cerrar*/
        ancla.setAttribute("id", "cuper-close");
        ancla.setAttribute("onclick", "jQuery(this).cuperbox.close(); return false;");

        /* Atributos para el overlay */
        attr = document.createAttribute('id');
        attr.value = option.overlay.id;
        overlay.setAttributeNode(attr);
        attr = document.createAttribute('class');
        attr.value = option.overlay.clase;
        overlay.setAttributeNode(attr);

        /* Asociacion de overlay con body de pagina */
        document.body.appendChild(cuperbox);
        cuperbox.appendChild(overlay);

        /* Asociacion de atributos para contenedor de Iframe */
        attr = document.createAttribute('id');
        attr.value = option.container.id;
        containerIframe.setAttributeNode(attr);
        attr = document.createAttribute('class');
        attr.value = option.container.clase;
        containerIframe.setAttributeNode(attr);

        /* El contenedor de clase se inserta como hijo del contenedor principal */
        cuperbox.appendChild(containerIframe);
        containerIframe.appendChild(ancla);
        /* Asignacion de propiedades por defecto del iframe */

        iframe.setAttribute('id', option.iframe.id);
        iframe.setAttribute('class', option.iframe.clase);
        iframe.setAttribute('name', option.iframe.name);
        iframe.setAttribute('src', option.iframe.src);
        iframe.setAttribute('width', option.iframe.width);
        iframe.setAttribute('height', option.iframe.height);
        iframe.setAttribute('frameborder', option.iframe.frameborder);
        containerIframe.appendChild(iframe);
        document.getElementById(option.container.id).style.width = option.container.width;
        document.getElementById(option.container.id).style.height = option.container.height;

        /* Centrar */

        var options = {};
        var alto = $(window).height();
        var inFF = function() {
            if (/Firefox/.test(navigator.userAgent)) {
                alto = $(document).height();
            } else {
                alto = $(window).height();
            }
        }

        inFF();

        $(window).resize(function() {
            inFF();
            options.topCss = (alto - $('.' + option.container.clase).outerHeight()) / 2;
            options.leftCss = ($(window).width() - $('.' + option.container.clase).outerWidth()) / 2;
            resize(options.topCss, options.leftCss);
        });

        var resize = function(topCss, leftCss) {
            $('.' + option.container.clase).css({
                'top': topCss,
                'left': leftCss
            });
        }
        options.topCss = (alto - $('.' + option.container.clase).outerHeight()) / 2;
        options.leftCss = ($(window).width() - $('.' + option.container.clase).outerWidth()) / 2;
        resize(options.topCss, options.leftCss);

    };
    __jquery.fn.cuperbox.close = function() {
        __jquery("#cuperbox").remove();
    }
})(jQuery);