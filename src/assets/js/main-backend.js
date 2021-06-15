;( function( w, $ ){
  'use strict'

  $(document).ready(function () {
     console.log("check backend");
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
