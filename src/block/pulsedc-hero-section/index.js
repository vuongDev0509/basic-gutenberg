//  Import CSS.
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment, Component } from '@wordpress/element'
import { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload } from '@wordpress/block-editor'
import { PanelBody, ToolbarGroup, ToolbarButton, FocalPointPicker } from '@wordpress/components'


class PulseHeroEdit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			currentEdit: '',
		}
	}

	componentDidMount() {
		const { attributes, setAttributes, clientId } = this.props;
		const { blockIDX } = attributes;

		setAttributes({ blockIDX: `section-hero-${clientId}` });
	}

	render() {
		const { currentEdit } = this.state;
		const { attributes, setAttributes, isSelected } = this.props;
		const {
			blockIDX, imageUrl, imageID,
			title, titleColor, subtitle, subtitleColor, focalPoint,
			isPreview,
		} = attributes;
		const blockClassName = [
			'pulsedc-block',
			'pulsedc-hero-section',
			blockIDX,
		].filter(Boolean).join(' ');

		return (
			isPreview ?
				<img alt={__('Hero section')} width='100%' src={previewImageData} />
				:
				<Fragment>
					<BlockControls>
						<ToolbarGroup>
							<MediaUpload
								allowedTypes={['image']}
								value={imageID}
								onSelect={(image) => setAttributes({ imageUrl: image.url, imageID: image.id })}
								render={({ open }) => (
									<ToolbarButton
										label={__('Change Background')}
										icon="edit"
										onClick={open}
									/>
								)}
							/>
							<ToolbarButton
								label={__('Remove Background')}
								icon="no"
								onClick={() => setAttributes({ imageUrl: undefined, imageID: undefined })}
							/>
						</ToolbarGroup>
					</BlockControls>
					<InspectorControls>
						<PanelBody title={__('General')}>
							<PanelBody title={__('Image Position')}>
								{imageUrl && (
									<FocalPointPicker
										label={__('Focal Point Picker')}
										url={imageUrl}
										value={focalPoint}
										onChange={(value) => setAttributes({ focalPoint: value })}
									/>
								)}
							</PanelBody>
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
										label: __('Subtitle Color'),
										value: subtitleColor,
										onChange: (value) => setAttributes({ subtitleColor: value === undefined ? '#fff' : value }),
									},
								]}
							/>
						</PanelBody>
					</InspectorControls>
					<div className={blockClassName}
						style={{
							backgroundImage: `url(${imageUrl || cgbGlobal.image_holder})`,
							backgroundPosition: focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined,
						}}
					>
						<div className="container">
							<div className="hero-inner">
								<RichText
									tagName="h2"
									className="pulsedc-title"
									value={title}
									onChange={(value) => setAttributes({ title: value.trim() })}
									style={{ color: titleColor }}
									isSelected={isSelected && currentEdit === 'title'}
									unstableOnFocus={() => this.setState({ currentEdit: 'title' })}
									placeholder={__('Enter title…')}
									allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									className="pulsedc-subtitle"
									value={subtitle}
									onChange={(value) => setAttributes({ subtitle: value.trim() })}
									style={{ color: subtitleColor }}
									isSelected={isSelected && currentEdit === 'subtitle'}
									unstableOnFocus={() => this.setState({ currentEdit: 'subtitle' })}
									placeholder={__('Enter subtitle…')}
									allowedFormats={[]}
								/>
							</div>
						</div>

					</div>
				</Fragment>
		);
	}
}

const BlockIcon = (
	<svg id="Capa_1" enableBackground="new 0 0 467.765 467.765" height="512" viewBox="0 0 467.765 467.765" width="512" xmlns="http://www.w3.org/2000/svg"><path id="path-1_72_" d="m0 175.412h58.471v58.471h-58.471z" transform="translate(0 6)" /><path d="m0 292.353h467.765v58.471h-467.765z" /><path d="m0 409.294h350.824v58.471h-350.824z" /><path id="path-1_71_" d="m0 58.471h58.471v58.471h-58.471z" transform="translate(0 2)" /><path id="path-1_70_" d="m409.294 175.412h58.471v58.471h-58.471z" transform="translate(14 6)" /><path id="path-1_69_" d="m409.294 58.471h58.471v58.471h-58.471z" transform="translate(14 2)" /><path d="m116.941 263.118h233.882c16.145 0 29.235-13.09 29.235-29.235v-204.648c.001-16.145-13.089-29.235-29.234-29.235h-233.883c-16.145 0-29.235 13.09-29.235 29.235v204.647c0 16.145 13.09 29.236 29.235 29.236zm29.235-204.647h175.412v146.176l-87.706-87.706-87.706 87.706z" /></svg>
);

const blockAttrs = {
	blockIDX: {
		type: 'string',
	},
	imageUrl: {
		type: 'string',
	},
	imageID: {
		type: 'number',
	},
	title: {
		type: 'string',
		default: 'Your title here',
	},
	titleColor: {
		type: 'string',
		default: '#fff',
	},
	subtitle: {
		type: 'string',
		default: 'Your subtitle here',
	},
	subtitleColor: {
		type: 'string',
		default: '#fff'
	},
	focalPoint: {
		type: 'object',
	},
	changed: {
		type: 'boolean',
		default: false,
	},
	isPreview: {
		type: 'boolean',
		default: false,
	}
};


registerBlockType('cgb/beplus-hero-section', {
	title: __('Hero Section - Beplus'),
	description: __('Hero section block with more options and styles.'),
	icon: {
		src: BlockIcon,
	},
	category: 'common',
	keywords: [
		__('PulseDC'),
		__('hero'),
		__('image')
	],
	attributes: blockAttrs,
	example: {
		attributes: {
			isPreview: true
		},
	},
	supports: {
		align: true,
		anchor: true
	},
	edit: PulseHeroEdit,
	save: ({ attributes }) => {
		const {
			blockIDX,
			imageUrl,
			title,
			titleColor,
			subtitle,
			subtitleColor,
			focalPoint,
		} = attributes;

		const blockClassName = [
			'pulsedc-block',
			'pulsedc-hero-section',
			blockIDX,
		].filter(Boolean).join(' ');

		return (
			<div className={blockClassName}
				style={{
					backgroundImage: `url(${imageUrl || cgbGlobal.image_holder})`,
					backgroundPosition: focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined,
				}}
				data-image={imageUrl}
			>
				<div className="container">
					<div className="hero-inner">
						{title && (
							<RichText.Content className="pulsedc-title" tagName="h2" style={{ color: subtitleColor }} value={title} />
						)}
						{subtitle && (
							<RichText.Content tagName="p" className="pulsedc-subtitle" style={{ color: subtitleColor }} value={subtitle} />
						)}

					</div>
				</div>

			</div>
		);
	}
});
