export default function starCheckboxHtml ({
	name = '', value = '', className = '', checked
}) {
	return `<span class="${`${className} star-checkbox`}">
		<input
			name="${name}"
			type="checkbox"
			value="${value}"
			${checked ? 'checked' : ''}
		/>
		<span class="checkbox-decoration"></span>
	</span>`
}