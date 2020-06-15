import starCheckboxHtml from './star-checkbox-html.template.js'

export default function movieItemHtml ({
	title, releaseYear, imageUrl, favorite
}) {
	return `<li class="movie-item">
		<picture class="image">
			<img src="${imageUrl}" alt="${title}" >
		</picture>
		<div class="description">
			<h3 class="title">${title} (${releaseYear})</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, inventore maxime? Quidem, quos dolore odit accusamus dolorum, unde assumenda soluta est ex cupiditate non harum mollitia vitae, et animi tempore.
			</p>
		</div>
		<div class="controls">
			${starCheckboxHtml({ checked: favorite, className: 'favorite-checkbox' })}
			<a class="button details-link" href="#" title="${title} (${releaseYear})">More info</a>
		</div>
	</li>`
}