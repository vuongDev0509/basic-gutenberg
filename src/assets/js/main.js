
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
	})

} )( window, jQuery );
