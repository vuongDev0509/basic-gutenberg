//  Import CSS.
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor'
import { ToggleControl, TextControl, ToolbarButton, Dashicon, ToolbarGroup, PanelBody, Tooltip } from '@wordpress/components'
import set from 'lodash/set'

const ALLOWED_MEDIA_TYPES = ['image']
const instructions = <p>{__('To edit the background image, you need permission to upload media.')}</p>;



class IconTextEdit extends Component {
	constructor() {
		super(...arguments);
		this.state = {

			currentSelected: 0,
			currentEdit: '',
			items: this.props.attributes.items,
			searchedText: '',
		}

		this.onChangeImageItems = this.onChangeImageItems.bind(this)
		this.removeItems = this.removeItems.bind(this)
		this.onChangeTextItem = this.onChangeTextItem.bind(this)
		this.onAddItem = this.onAddItem.bind(this)
	}

	onChangeImageItems(id, index) {
		const self = this
		const mediaID = id
		const items = JSON.parse(JSON.stringify(this.state.items))

		if (!mediaID) {
			items[index].iconID = ''
			items[index].iconUrl = ''
			this.setState({ items })
			this.props.setAttributes({ items })
			return
		}

		wp.media.attachment(mediaID).fetch().then((data) => {

			items[index].iconID = id
			items[index].iconUrl = data.url
			if (data.subtype == 'svg+xml') {

			}
			self.setState({ items })
			self.props.setAttributes({ items });
			console.log(this.state.items);
		});
	}

	removeItems(index) {
		const r = confirm(__('Remove item?'))
		if (!r) return

		const items = JSON.parse(JSON.stringify(this.state.items))
		items.splice(index, 1)

		this.setState({ items })
		this.props.setAttributes({ items })
	}

	onChangeTextItem(value, path) {
		let items = JSON.parse(JSON.stringify(this.state.items))
		items = set(items, path, value)

		this.setState({ items })
		this.props.setAttributes({ items })
	}


	onAddItem() {
		let items = JSON.parse(JSON.stringify(this.state.items))
		items.push({
			iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		})

		this.setState({ items })
		this.props.setAttributes({ items })
	}

	render() {
		const { attributes, setAttributes, isSelected } = this.props;
		const { isPreview, title, desc, fullWidth, fontSize } = attributes;
		const { currentSelected, currentEdit, searchedText, items } = this.state;



		const classCol = fullWidth ? 'col-6 col-sm-6 col-md-4 col-lg-2 card-featured-item' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3 card-featured-item'
		return (
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
							label="Fullwidth"
							checked={fullWidth}
							onChange={() => setAttributes({ fullWidth: !fullWidth })}
						/>
						<TextControl
							label="Font size Heading"
							help="Enter font size (10em or 10px)"
							value={fontSize}
							onChange={(value) => setAttributes({ fontSize: value })}
						/>
					</PanelBody>

					<PanelBody title={__('Preset Icons')}>

					</PanelBody>
				</InspectorControls>
				<div className={`pulsedc-block pulsedc-icon-text-ss ${fullWidth ? 'pulsedc-fullwidth' : ''}`}>
					<div className="blocks-inner">
						<RichText
							tagName="h2"
							className="pulsedc-title"
							value={title}
							onChange={(value) => setAttributes({ title: value.trim() })}
							isSelected={isSelected && currentEdit === 'title'}
							unstableOnFocus={() => this.setState({ currentEdit: 'title' })}
							style={{fontSize: fontSize}}
							placeholder={__('YOUR TITLE HERE')}
							allowedFormats={[]}
						/>
						<RichText
							tagName="p"
							className="pulsedc-desc"
							value={desc}
							onChange={(value) => setAttributes({ desc: value.trim() })}
							isSelected={isSelected && currentEdit === 'desc'}
							unstableOnFocus={() => this.setState({ currentEdit: 'desc' })}
							placeholder={__('Your description here')}
							allowedFormats={[]}
						/>
						<div className="row card-featured-list">

							{items.map((item, index) => {

								return (
									<div className={`${classCol} ${currentSelected === index ? 'selected' : ''}`} key={index} onClick={() => this.setState({ currentSelected: index })}>
										<span className="pulsedc-remove" onClick={() => { this.removeItems(index) }}>
											<Dashicon icon="no-alt" />
										</span>
										<div className="inner-item">
											{
												<MediaUploadCheck fallback={instructions}>
													<MediaUpload
														title={__('Icon')}
														onSelect={(media) => { this.onChangeImageItems(media.id, index) }}
														allowedTypes={ALLOWED_MEDIA_TYPES}
														value={item.iconID}
														render={({ open }) => (
															<div className="card-features__icon">
																<div className="wrap-edit">
																	<span className="pulsedc-edit"
																		onClick={open}
																	>
																		<Dashicon icon="edit-large" />
																	</span>

																</div>
																<img src={item.iconUrl || cgbGlobal.icon_holder} alt="#" />
															</div>

														)}
													/>
												</MediaUploadCheck>

											}
											<RichText
												tagName="h6"
												className="card-title"
												value={item.title}
												isSelected={isSelected && currentEdit === 'title' + index}
												unstableOnFocus={() => this.setState({ currentEdit: 'title' + index })}
												onChange={value => { this.onChangeTextItem(value, [index, 'title']) }}
												placeholder={__('Title...')}
											/>
											<RichText
												tagName="p"
												className="card-desc"
												value={item.desc}
												isSelected={isSelected && currentEdit === 'desc' + index}
												unstableOnFocus={() => this.setState({ currentEdit: 'desc' + index })}
												onChange={value => { this.onChangeTextItem(value, [index, 'desc']) }}
												placeholder={__('Description...')}
											/>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</Fragment >
		)
	}
}

const BlockAttrs = {
	items: {
		type: 'array',
		default: [
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
			{ iconUrl: '', iconID: '', title: 'Title', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
		],
	},
	title: {
		type: 'string',
		default: 'YOUR HERE TITLE'
	},
	desc: {
		type: 'string',
		default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in quam convallis, venenatis lectus a, consequat odio. Nullam mattis, eros vitae mollis lobortis, enim mi varius magna, quis rhoncus ipsum diam ut libero. Donec tempus ut lacus at commodo. Sed faucibus, dolor ut feugiat commodo, nulla odio convallis tortor, sit amet blandit leo justo ut ex.'
	},
	fullWidth: {
		type: 'boolean',
		default: false,
	},
	fontSize: {
		type: 'string',
		default: '2.5em'
	},
	changed: {
		type: 'boolean',
		default: false,
	},
	isPreview: {
		type: 'boolean',
		default: false,
	},
};


registerBlockType('cgb/beplus', {
	title: __('Icon Text Ex - Beplus'),
	description: __('Section with icon text.'),
	icon: 'smiley',
	category: 'common',
	keywords: [__('icon'), __('text'), __('section'), __('beplus')],
	attributes: BlockAttrs,
	example: {
		attributes: {
			isPreview: true
		},
	},
	supports: {
	},
	edit: IconTextEdit,
	save: function ({ attributes }) {
		const { items, title, desc, fullWidth, className, fontSize } = attributes;
		const classCol = fullWidth ? 'col-6 col-sm-6 col-md-4 col-lg-2 card-featured-item' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3 card-featured-item'

		return (
			<div className={[
				'pulsedc-block',
				'pulsedc-icon-text-ss',
				fullWidth ? 'pulsedc-fullwidth' : '',
				className].join(' ')}>
				<div className="blocks-inner">
					<RichText.Content className="pulsedc-title" style={{ fontSize: fontSize }} tagName="h2" value={title} />
					<RichText.Content className="pulsedc-desc" tagName="p" value={desc} />
					<div className="row card-featured-list">
						{items.map((item, index) => {
							let v = (index + 1) % 4;
							let vT = Math.ceil(v);
							let anm = { 'data-aos': 'fade-up', 'data-aos-duration': 400 * (v !== 0 ? vT : 4) }
							return (
								<div className={classCol} key={index} {...(anm)}>
									<div className="inner-item">
										<div className={'card-features__icon'} data-aos="fade-up">
											<img src={item.iconUrl || cgbGlobal.icon_holder} alt={item.title} />
										</div>
										<RichText.Content className="card-title" tagName="h6" value={item.title} />
										<div className="wrap-desc">
											<RichText.Content className="card-desc" tagName="p" value={item.desc} />
											{fullWidth ? <span className="close-icon"></span> : ''}
										</div>
									</div>
								</div>
							)
						}
						)}
					</div>
				</div>
			</div >
		);
	},
})
