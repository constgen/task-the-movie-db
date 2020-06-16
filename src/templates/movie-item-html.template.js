import starCheckboxHtml from './star-checkbox-html.template.js'

export default function movieItemHtml ({
	title, releaseYear, imageUrl, favorite, overview, score
}) {
	return `<li class="movie-item">
		<picture class="image">
			<img src="${imageUrl}" alt="${title}" >
		</picture>
		<div class="score">${score}</div>
		<div class="description">
			<h3 class="title">${title} (${releaseYear})</h3>
			${overview}
		</div>
		<div class="controls">
			${starCheckboxHtml({ checked: favorite, className: 'favorite-checkbox' })}
			<a class="button details-link" href="#" title="${title} (${releaseYear})">More info</a>
		</div>
	</li>`
}