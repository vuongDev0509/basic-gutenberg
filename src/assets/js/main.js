
;( function( w, $ ){
  'use strict'

    // active tabs in block tabs
    function activeTabs (){
        let isTab = $('.block-tabs .block_tabs_title_item');
        let isContent = $('.block-tabs .block_tabs_content_item');
        isTab.click(function(event){

            let dataTabs = $(this).data('tabs');

            isTab.removeClass('active');
            $(this).addClass('active');

            isContent.removeClass('active');
            $('.block-tabs .block_tabs_content_item.'+dataTabs).addClass('active');

        })
    };

    $(document).ready(function () {
		activeTabs();

        $('.block-videos .block_video_cta_popups').magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                            return m[1];
                        },
                        src: '//www.youtube.com/embed/%id%?autoplay=1&mute=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                            return m[5];
                        },
                        src: '//player.vimeo.com/video/%id%?autoplay=1&mute=1'
                    }
                }
            }
        });
	})

} )( window, jQuery );
