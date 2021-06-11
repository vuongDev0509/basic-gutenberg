//  import css
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload, InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, ToolbarGroup, ToolbarButton, Dashicon, FocalPointPicker, Button } from '@wordpress/components'
import set from 'lodash/set'

class TabsEdit extends Component {

    constructor(){
        super(...arguments);
        this.state = {
            currentActive: 0,
            items: this.props.attributes.items,
        };

    }

    onChangeTextItem = (value, path) =>{
        let items = JSON.parse(JSON.stringify(this.state.items));
        items = set(items, path, value);
        this.setState({items});
        this.props.setAttributes({items});
    }

    changeCurrentActive = (index) =>{
        this.setState({
            currentActive: index,
        });
    }

    onAddItem = ()=>{
        let items = JSON.parse(JSON.stringify(this.state.items));
        items.push({
            tabsTitle: 'Tabs Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        })
        // items.desc.focus();
        this.setState({items});
        this.props.setAttributes({items});


        // const length = items.length;
        // let isIndex = length - 1;
        // let cc = items[isIndex].desc;

    }

    // onFocus = (index) =>{
    //     let items = JSON.parse(JSON.stringify(this.state.items));
    //     console.log(items);
    //     let isIndex = index - 1;
    //     let cc = items[isIndex].desc;
    //     console.log(cc);
    //     // items[isIndex].desc.focus();
    // }

    removeItems = (index)=>{
        let r = confirm("Remove Item ?");
        if (r == true) {
            let items = JSON.parse(JSON.stringify(this.state.items));
            items.splice(index, 1);
            this.setState({items});
            this.props.setAttributes({items});
        }
    }

    render() {
        const { items, currentActive } = this.state;

        return (
            <Fragment>

                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            className="tabs_cta_add_items"
                            icon="plus"
							label={__('Add item')}
							onClick={this.onAddItem}
                        />
                    </ToolbarGroup>
                </BlockControls>

                <div className="be-block block-tabs">

                    <div className="block_tabs_title">

                        {items.map((item, index) => {

                            return(


                                <h3 className={`block_tabs_title_item ${currentActive === index ? 'active' : ''} `} onClick={() => this.changeCurrentActive(index)}>
                                    <span className="block_tabs_cta_remove_item" onClick={() => { this.removeItems(index) }} data-index={index}>
                                        <Dashicon icon="no-alt" />
                                    </span>
                                    <RichText
                                        tagName="span"
                                        className="tab_title"
                                        value={item.tabsTitle}
                                        onChange={value => { this.onChangeTextItem(value, [index, 'tabsTitle']) }}
                                        placeholder={__('Title')}
                                    />
                                </h3>
                            );
                        })}
                        <h3 className="block_tabs_title_item block_tabs_cta_add_item" onClick={this.onAddItem}>
                            <Dashicon icon="insert" />
                        </h3>
                    </div>

                    <div className="block_tabs_content">
                        {items.map((item, index) => {

                            return(
                                <div className={`block_tabs_content_item ${currentActive === index ? 'active' : ''} `}>

                                    <RichText
                                        tagName="span"
                                        className="tab_content"
                                        value={item.desc}
                                        onChange={value => { this.onChangeTextItem(value, [index, 'desc']) }}
                                        placeholder={__('Desc')}
                                    />

                                </div>
                            );

                        })}
                    </div>

                </div>

            </Fragment>
        );
    }

}

const blockAttrs = {
    items:{
        type: 'array',
        default: [
			{ tabsTitle: 'Tabs Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ tabsTitle: 'Tabs Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
		],
    },
    currentActive:{
        type: 'number',
        default: 0,
    }
}



registerBlockType( 'cgb/beplus-bock-tabs', {

	title: __( 'Block Tabs' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'beplus-block' ),
		__( 'Tabs' ),
		__( 'bock' ),
	],


	edit:TabsEdit,

    attributes: blockAttrs,

    save: function ({attributes}){

        const {items, currentActive} = attributes;
        const blockProps = useBlockProps.save();
        // function changeCurrentActive = (index) =>{
        //     console.log(index);
        // }
		return (

            <div className="be-block block-tabs">
                <div className="block_tabs_title">
                    {items.map((item, index) => {
                        return(
                            <h3 className={`block_tabs_title_item ${index < 1 ? 'active' : ''}`} data-tabs={`be-tabs-${index}`}>
                                <RichText.Content className="tab_title " tagName="span" value={item.tabsTitle} />
                            </h3>
                        )
                    })}
                </div>
                <div className="block_tabs_content">
                    {items.map((item, index) => {
                        return(
                            <div className={`block_tabs_content_item be-tabs-${index} ${index < 1 ? 'active' : ''}`} {...useBlockProps}>
                                <RichText.Content className="tab_content" tagName="p" value={item.desc} />
                            </div>
                        )
                    })}

                </div>
            </div>
		);
	},
} );
