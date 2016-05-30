/**  
 * Script for infinite scroll usage (c) 2016 Silpion Tomasz Gregorczyk infinitescroll.js may be freely distributed under the MIT license. 
 * https://github.com/Tomasz-Silpion/infinitescroll
 * Feel free to fork an edit, therefore your changes may be included by me in source library
 **/

(function ($) {
    jQuery.fn.infinitescroll = function (options) {

        var settings = $.extend({
            breakpoint: $(this).height(),
            page: 1
        }, options);

        var container = $(this);
        var breakpoint = settings.breakpoint;
        var page = settings.page;
        var loaded = [];
        var end = false;

        $(window).bind('scroll', function (e) {
            if (!end && $(window).scrollTop() > breakpoint * page && settings.url) {
                page++;
                loaded.push(page);
                $.get(settings.url, {page: page}, function (data) {
                    if (data) {
                        container.append(data);
                        options.callback.call(this);
                    } else {
                        end = true;
                    }
                });
            }
        });

        return this;

    };
})(jQuery);
