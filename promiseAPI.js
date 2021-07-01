'use strict';

const output = document.getElementById('output'),
	urlPhotos = 'http://jsonplaceholder.typicode.com/photos';


const getData = url => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			const response = JSON.parse(request.responseText);

			resolve(response);
		} else {
			reject(request.statusText);
		}
	});

	request.send();
});


const outputPhotos = data => {
	data.forEach(item => {
		output.insertAdjacentHTML('beforebegin',
			`<h4>${item.title}</h4>
			<img src="${item.thumbnailUrl}" alt="${item.title}">`);
	});
};

const oneImg = getData(urlPhotos + '/1'),
	twoImg = getData(urlPhotos + '/2');

Promise.all([oneImg, twoImg])
	.then(outputPhotos)
	.catch(error => console.error(error));