import Button, {ButtonColor, ButtonVariant} from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'components/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		variant: {
			options: Object.values(ButtonVariant),
			control: {type: 'inline-radio'},
		},
		color: {
			options: Object.values(ButtonColor),
			control: {type: 'inline-radio'},
		},

	},
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />

export const rounded = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
rounded.args = {
	children: 'Lorem ipsum',
	variant: ButtonVariant.rounded,
	color: ButtonColor.white,
}
