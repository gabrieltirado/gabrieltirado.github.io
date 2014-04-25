/**
 *Plugin que genera un iframe-lightbox en base a los parametros de referencia.
 *@param options string({
 widht: Ancho del lightbox.
 height: Altura del lightbox.
 url: Dirección electrónica que se debe cargar en el iframe-lightbox.
 });
 *@author OFlorez
 *@since 2013
 */
(function(__jquery) {

    __jquery.fn.cuperbox = function(custom) {
        

        /* Creacion de overlay para lightbox */
        var option = {
            overlay: {
                id: 'cuper-overlay',
                clase: 'cuper-overlay'
            },
            container: {
                id: 'cuper-container',
                clase: 'cuper-container'
            },
            iframe: {
                id: 'cuper-iframe',
                clase: 'cuper-iframe',
                name: 'cuper-iframe',
                src: '',
                width: '100%',
                height: '100%',
                frameborder: '0'
            }
        };

        if (custom) {
            option = __jquery.extend(custom, option);
        }

        var overlay = document.createElement("div");
        var containerIframe = document.createElement("div");
        var iframe = document.createElement('iframe');
        var attr = document.createAttribute('class');

        /* Atributos para el overlay */
        overlay.setAttribute("id", option.overlay.id);
        attr.value = option.overlay.clase;
        overlay.setAttributeNode(attr);

        /* Asociacion de overlay con body de pagina */
        document.body.appendChild(overlay);

        /* Asociacion de atributos para contenedor de Iframe*/
        attr = document.createAttribute('id');
        attr.value = option.container.id;
        containerIframe.setAttributeNode(attr);
        attr = document.createAttribute('class');
        attr.value = option.container.clase;
        containerIframe.setAttributeNode(attr);

        /* El contenedor de clase se inserta como hijo del overlay */
        overlay = document.getElementById(option.overlay.id);
        overlay.appendChild(containerIframe);

        /* Asignacion de propiedades por defecto del iframe */

        iframe.setAttribute('id', option.iframe.id);
        iframe.setAttribute('class', option.iframe.clase);
        iframe.setAttribute('name', option.iframe.name);
        iframe.setAttribute('src', option.iframe.src);
        iframe.setAttribute('width', option.iframe.width);
        iframe.setAttribute('height', option.iframe.height);
        iframe.setAttribute('frameborder', option.iframe.frameborder);
        containerIframe.appendChild(iframe);


        /* Centrar */

        var options = {
            topCss: ($(window).height() - $(this).outerHeight()) / 2,
            leftCss: ($(window).width() - $(this).outerWidth()) / 2,
        };

        $(window).resize(function() {
            options.topCss = ($(window).height() - $('.' + option.container.clase).outerHeight()) / 2;
            options.leftCss = ($(window).width() - $('.' + option.container.clase).outerWidth()) / 2;
            resize(options.topCss, options.leftCss);
        });

        var resize = function(topCss, leftCss) {
            $('.' + option.container.clase).css({
                'top': topCss,
                'left': leftCss
            });
        }
    };
})(jQuery);

