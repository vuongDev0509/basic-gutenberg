//  import css
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, MediaUpload, MediaUploadCheck, PanelColorSettings, RichTextToolbarButton } from '@wordpress/block-editor'
import { ToggleControl, TextControl, ToolbarButton, Dashicon, ToolbarGroup, PanelBody, Tooltip } from '@wordpress/components'
import set from 'lodash/set'

class ListImagesBoxEdit extends Component{
    constructor() {
        super(...arguments);
        this.state ={
            // get data from attributes
            items: this.props.attributes.items,

        }
    }

    onChangeImage = (id, index) =>{

        const items = JSON.parse(JSON.stringify(this.state.items))

        wp.media.attachment(id).fetch().then((data) => {

            items[index].imageID = id
            items[index].imageUrl = data.url

            this.setState({ items })
            this.props.setAttributes({ items });

        });
    }

    onChangeTextItem = (value, path) => {
		let items = JSON.parse(JSON.stringify(this.state.items));

        // set() in Lodash
		items = set(items, path, value);
		this.setState({ items })
		this.props.setAttributes({ items })
	}

    onAddItem = () =>{
        let items = JSON.parse(JSON.stringify(this.state.items));
        items.push({ imageID: '', imageUrl: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', button: 'Read More', link: '#!' })
        this.setState({ items })
		this.props.setAttributes({ items })
    }

    removeItems = (index) =>{
        const r = confirm(__('Remove item?'));
        if(r == true){
            let items = JSON.parse(JSON.stringify(this.state.items));
            items.splice(index, 1)
            this.setState({ items })
    		this.props.setAttributes({ items })
        }
    }

    render(){

        const { items } = this.state;
        const { attributes, setAttributes } = this.props;
        const { showButton, buttonColor, buttonBackground} = attributes;

        const blockClassName = [
			'be-block',
			'block-list-images-box',
		].filter(Boolean).join(' ');
        return(
            <Fragment>

                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            className="components-toolbar__control"
                            icon="plus"
                            label={__('Add item')}
                            onClick={this.onAddItem}
                        />
                    </ToolbarGroup>
                </BlockControls>

                <InspectorControls>

                    <PanelBody title={__('General')}>
                        <ToggleControl
                            label="Show Button"
                            checked={showButton}
                            onChange={() => setAttributes({ showButton: !showButton })}
                        />
                    </PanelBody>
                    {showButton ?
                        <PanelBody title={__('Button')}>
                            <PanelColorSettings
                                title={__('Color Settings')}
                                initialOpen={false}
                                colorSettings={[
                                    {
                                        label: __('Color'),
                                        value: buttonColor,
                                        onChange: (value) => setAttributes({ buttonColor: value === undefined ? '#fff' : value }),
                                    },
                                    {
                                        label: __('Background Color'),
                                        value: buttonBackground,
                                        onChange: (value) => setAttributes({ buttonBackground: value === undefined ? '#fff' : value }),
                                    },
                                ]}
                            />

                        </PanelBody>
                        : ""
                    }


                </InspectorControls>

                <div className={blockClassName}>
                    <div className="content-block-list-images-box">

                        {items.map((item, index) => {
                            return(
                                <div className="items item-image-box">
                                    <div className="__content">

                                        <span className="block_image_box_remove" onClick={() => { this.removeItems(index) }} data-index={index}>
                                            <Dashicon icon="no-alt" />
                                        </span>

                                        <MediaUploadCheck>

                                            <MediaUpload
                                                allowedTypes={['image']}
                                                value={item.imageID}
                                                onSelect={(image) => this.onChangeImage(image.id, index)}
                                                render={ ( { open } ) => (
                                                    <div className="block_image_box_thumbnail">
                                                        <span className="image_box_edit" onClick={open} >
                                                            <Dashicon icon="edit-large" />
                                                        </span>
                                                        <img src={item.imageUrl || cgbGlobal.icon_holder } alt="image" />
                                                    </div>
                                                ) }
                                            />

                                        </MediaUploadCheck>

                                        <RichText
                                            tagName="h2"
                                            className="block_image_box_title"
                                            value={item.title}
                                            onChange={value => { this.onChangeTextItem(value, [index, 'title']) }}
                                            placeholder={__('Title...')}
                                        />

                                        <RichText
                                            tagName="p"
                                            className="block_image_box_desc"
                                            value={item.desc}
                                            onChange={value => { this.onChangeTextItem(value, [index, 'desc']) }}
                                            placeholder={__('Desc...')}
                                        />

                                        {showButton ?
                                            <a href={item.link}>
                                                <RichText
                                                    tagName="span"
                                                    className="block_image_box_button"
                                                    value={item.button}
                                                    onChange={value => { this.onChangeTextItem(value, [index, 'button']) }}
                                                    placeholder={__('Learn More')}
                                                    style={{ color: buttonColor, background: buttonBackground }}
                                                />
                                            </a>

                                            : " "
                                        }

                                        {showButton ?
                                            <TextControl
                                                label="Insert URL Button"
                                                className="block_image_box_link_button"
                                                value={item.link}
                                                onChange={value => { this.onChangeTextItem(value, [index, 'link']) }}
                                                placeholder={__('Please Enter Link')}
                                            />

                                            : " "

                                        }

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </Fragment>

        );

    }
}

const BlockAttrs = {
    items:{
        // default data initialization
        type: 'array',
        default: [
			{ imageID: '', imageUrl: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', button: 'Read More', link: '#!' },
			{ imageID: '', imageUrl: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', button: 'Read More', link: '#!' },
		],
    },
    showButton:{
        type: 'boolean',
		default: false,
    },
    buttonColor:{
        type: 'string'
    },
    buttonBackground:{
        type: 'string',
    },
    blockClassName:{
        type: 'string',
    }
}

registerBlockType( 'cgb/beplus-bock-list-images-box', {

	title: __( 'List Block Images Box' ),
	icon: 'smiley',
	category: 'common',
	keywords: [
		__( 'beplus-block' ),
		__( 'image'),
		__( 'box' ),
	],
    attributes: BlockAttrs,
	edit:ListImagesBoxEdit,
    save: function ({attributes}){

        const {items, showButton, buttonColor, buttonBackground, blockClassName} = attributes;
        return (
            <div className="be-block block-list-images-box">
                <div className="content-block-list-images-box kkk">

                    {items.map((item, index) =>{
                        return(
                            <div className="items item-image-box">
                                <div className="__content">
                                    <div className="block_image_box_thumbnail">
                                        <img src={item.imageUrl || cgbGlobal.icon_holder} alt="image"/>
                                    </div>
                                    <RichText.Content className="block_image_box_title" tagName="h2" value={item.title} />
                                    <RichText.Content className="block_image_box_desc" tagName="p" value={item.desc} />
                                    <p className="block_image_box_desc"> {item.desc} </p>
                                    {showButton ?
                                        <a href={item.link} >
                                            <RichText.Content className="block_image_box_button" style={{color: buttonColor, background: buttonBackground}} tagName="span" value={item.button} />
                                        </a>
                                        : " "
                                    }
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    },
})
