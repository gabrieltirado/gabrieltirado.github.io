(function($) {
    $.fn.centrar = function(cont) {
        var $this = $(this);
        var options = {
            topCss: ($(window).height() - $(this).outerHeight()) / 2,
            leftCss: ($(window).width() - $(this).outerWidth()) / 2
        };        

        $(window).resize(function() {
            options.topCss = ($(window).height() - $this.outerHeight()) / 2;
            options.leftCss = ($(window).width() - $this.outerWidth()) / 2;
            resize(options.topCss, options.leftCss);
        });

        var resize = function(topCss, leftCss) {
            $this.css({
                'position': 'absolute',
                'top': topCss,
                'left': leftCss
            });
        }
        
        resize(options.topCss, options.leftCss);

    }
})(jQuery); 