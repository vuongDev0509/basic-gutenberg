//  import css
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload } from '@wordpress/block-editor'
import { PanelBody, ToolbarGroup, ToolbarButton, FocalPointPicker, Button } from '@wordpress/components'


class ImageBoxEdit extends Component {

    constructor(){
        super(...arguments);
        this.state = {
            urlImage: '',
        };
    }

    componentDidMount() {
        const {clientId, attributes, setAttributes} = this.props;
        const { blockIDX } = attributes;
        setAttributes({ blockIDX: `block-image-block-${clientId}` });
    }

    setUrl(url){
         this.setState({
             urlImage: url,
         });
         // setAttributes( { author: event.target.value } );
    }

    render() {
        const { attributes, setAttributes, isSelected, isSelector } = this.props;

        const { urlImage } = this.state;
        const {
			blockIDX, imageUrl, imageID,
			title, titleColor, description, descriptionColor, focalPoint,
			isPreview,
		} = attributes;
        const blockClassName = [
			'be-block',
			'block-image-box',
			blockIDX,
		].filter(Boolean).join(' ');
        return (
            <Fragment>
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUpload
                            allowedTypes={['image']}
                            value={imageID}
                            onSelect={(image) => setAttributes({ imageUrl: image.url, imageID: image.id })}
                            // onSelect={(image) => this.setUrl(image.url)}
                            render={ ( { open } ) => (
                                <Button onClick={ open }>Select Image</Button>
                            ) }
                        />

                        <ToolbarButton
                            label={__('Remove Image')}
                            icon="no"
                            onClick={() => setAttributes({ imageUrl: undefined, imageID: undefined })}
                        />

                    </ToolbarGroup>
                </BlockControls>

                <InspectorControls>
                    <PanelBody title={__('General')}>

                        <PanelColorSettings
                            title={__('Color Settings')}
                            initialOpen={false}
                            colorSettings={[
                                {
                                    label: __('Title Color'),
                                    value: titleColor,
                                    onChange: (value) => setAttributes({ titleColor: value === undefined ? '#fff' : value }),
                                },
                                {
                                    label: __('Description Color'),
                                    value: descriptionColor,
                                    onChange: (value) => setAttributes({ descriptionColor: value === undefined ? '#fff' : value }),
                                },
                            ]}
                            />

                    </PanelBody>
                </InspectorControls>

                <div className={blockClassName}>

                    <div className="container-block-image-box">
                        <div className="block_image_box_thumbnail">
                            <img src={attributes.imageUrl}/>
                        </div>
                        <div className="block_image_box_meta">

                            <RichText
                                tagName="h2"
                                className="block_image_box_title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value.trim() })}
                                style={{ color: titleColor }}
                                placeholder={__('Title…')}
                                allowedFormats={[]}
                            />

                            <RichText
                                tagName="p"
                                className="block_image_box_description"
                                value={description}
                                onChange={(value) => setAttributes({ description: value.trim() })}
                                style={{ color: descriptionColor }}
                                placeholder={__('Description…')}
                                allowedFormats={[]}
                            />

                        </div>
                    </div>

                </div>

            </Fragment>
        );
    }

}

const blockAttrs = {
	imageUrl: {
		type: 'string',
	},
    title:{
        type: 'string',
    },
    description:{
        type: 'string',
    },
    titleColor:{
        type : 'string',
    },
    descriptionColor:{
        type: 'string',
    },
    blockClassName:{
        type: 'string',
    },
    blockIDX:{
        type: 'string'
    }
}


registerBlockType( 'cgb/beplus-bock-image-box', {

	title: __( 'Block Image Box' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'beplus-block' ),
		__( 'image' ),
		__( 'box' ),
	],


	edit:ImageBoxEdit,

    attributes: blockAttrs,

    save: (props) => {



        const { attributes } = props;
        const {
			imageUrl,
            title,
            description,
            titleColor,
            descriptionColor,
            blockClassName,
            blockIDX,
		} = attributes;

		return (

			<div className={blockClassName}>
                <div className="block_image_box_thumbnail">
                    <img src={attributes.imageUrl} alt="#"/>
                </div>
                <div className="block_image_box_meta">
                    {title && (
                        <RichText.Content className="block_image_box_title" tagName="h2"  value={title} style={{color: titleColor}} />
                    )}
                    {description && (
                        <RichText.Content className="block_image_box_description" tagName="p"  value={description}  style={{color: descriptionColor}}/>
                    )}
                </div>
			</div>
		);
	},
} );
