//  import css
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, TextControl, ToolbarGroup, ToolbarButton, Dashicon, FocalPointPicker, Button } from '@wordpress/components'
import set from 'lodash/set'

class VideoEdit extends Component {

    constructor(){
        super(...arguments);
    }

    clearVideoUrl = () =>{
        console.log("clear");
    }

    render() {
        // const { items, currentActive } = this.state;
        const {attributes, setAttributes } = this.props;
        const {imageID, imageUrl, iconID, iconUrl, videoUrl} = attributes;
        return (
            <Fragment>

                <BlockControls>

                    <ToolbarGroup>
                        <MediaUpload
                            allowedTypes={['image']}
                            value={imageID}
                            onSelect={(image) => setAttributes({ imageUrl: image.url, imageID: image.id })}
                            render={ ( { open } ) => (
                                <Button onClick={ open }>Select Background Image</Button>
                            ) }
                        />

                        {imageUrl ?
                            <ToolbarButton
                                label={__('Remove Background Image')}
                                icon="no"
                                onClick={() => setAttributes({ imageUrl: undefined, imageID: undefined })}
                            />
                            : ""
                        }

                    </ToolbarGroup>

                </BlockControls>

                <div className="be-block block-videos">
                    <div className="container_block_video" style={{background: attributes.imageUrl ?  " ": "#eee"}}>
                        <div className="block_video_thumbnail" style={{ backgroundImage: `url(${attributes.imageUrl})` }}>
                        </div>

                        <div className="block_video_cta">

                                <MediaUpload
                                    allowedTypes={['image']}
                                    value={iconID}
                                    onSelect={(icon) => setAttributes({iconID: icon.id, iconUrl: icon.url})}
                                    render={ ( { open } ) => (
                                    <div className="block_image_box_thumbnail">
                                        <span className="cta_eidt_icon" onClick={open} >
                                            <Dashicon icon= "edit-large" />
                                        </span>
                                        <a href={videoUrl} className="block_video_cta_popups">
                                        {attributes.iconUrl ?
                                            <img src={iconUrl || cgbGlobal.icon_holder } alt="image" />
                                            : " "
                                        }
                                        </a>

                                    </div>
                                    ) }
                                />


                            <div class="block_group_video_url">
                                <TextControl
                                    label="Insert URL Video"
                                    className="block_videos_url"
                                    value={videoUrl}
                                    onChange={value => setAttributes({videoUrl:value})}
                                    placeholder={__('Please Enter Link')}
                                />
                                {videoUrl ?
                                    <span className="cta_clear_video_url" onClick={() => setAttributes({ videoUrl: ""})}>
                                        <Dashicon icon= "no-alt" />
                                    </span>
                                    : ""
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }

}

const blockAttrs = {
    imageID:{
        type: 'number'
    },
    imageUrl:{
        type: 'string'
    },
    iconID:{
        type: 'number'
    },
    iconUrl:{
        type: 'string'
    },
    videoUrl:{
        type: 'string'
    }
}



registerBlockType( 'cgb/beplus-bock-videos', {

	title: __( 'Block Videos' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'beplus-block' ),
		__( 'videos' ),
		__( 'bock' ),
	],


	edit:VideoEdit,

    attributes: blockAttrs,

    save: function ({attributes}){

        const {imageUrl, iconUrl, videoUrl} = attributes;

        // const backgroundColor = {imageUrl ? "" : "#eee"};

		return (

            <div className="be-block block-videos">
                <div className="container_block_video">
                    <div className="block_video_thumbnail" style={{backgroundImage: `url(${imageUrl})` }}> </div>
                    <div className="block_video_cta">
                        <a href={videoUrl} className="block_video_cta_popups">
                            <div className="block_image_box_thumbnail">
                                <img src={iconUrl} alt="play" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
		);
	},
} );
