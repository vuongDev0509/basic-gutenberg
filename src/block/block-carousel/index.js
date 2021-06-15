//  import css
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, TextControl, ToolbarGroup, ToolbarButton, Dashicon, FocalPointPicker, Button } from '@wordpress/components'
import set from 'lodash/set'

class CarouselEdit extends Component {

    constructor(){
        super(...arguments);
    }

    clearVideoUrl = () =>{
        console.log("clear");
    }

    render() {
        // const { items, currentActive } = this.state;
        // const {attributes, setAttributes } = this.props;
        // const {imageID, imageUrl, iconID, iconUrl, videoUrl} = attributes;
        return (
            <div> carousel </div>
        );
    }

}

// const blockAttrs = {
//
// }



registerBlockType( 'cgb/beplus-bock-carousel', {

	title: __( 'Block Carousel' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'beplus-block' ),
		__( 'carousel' ),
		__( 'bock' ),
	],


	edit:CarouselEdit,

    // attributes: blockAttrs,

    save: function ({attributes}){

        // const {imageUrl, iconUrl, videoUrl} = attributes;

		return (

            <div className="check"> carousel</div>
		);
	},
} );
