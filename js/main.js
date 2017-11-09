/* ====================== Variables ==============================*/

var searchButton = document.getElementById('search-button');
var searchOptions = document.getElementById('search-options');
var newSearch = document.getElementById('new-search');
var results = document.getElementById('results');

var myRequest = new XMLHttpRequest();

/* ================== Get the data from wiki api ===============*/

searchButton.addEventListener('click', function(){
	var prefix = 'https://cors-anywhere.herokuapp.com/';
	var cors = '&origin=*';
	var endpoint = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
	var suffix = '&format=json';

	var searchTerm = document.getElementById('search-term').value;

	/* use either  [prefix + endpoint + searchTerm + suffix] or [endpoint + searchTerm + suffix + cors] */

	var requestString = endpoint + searchTerm + suffix + cors;

	myRequest.open('GET', requestString);
	
	myRequest.onload = function(){
		var data = JSON.parse(myRequest.responseText);
		var list = data[3];

		buildList(list);
		showList();
	}

	myRequest.send();
	resetSearch();
});

/* ================= click handler for new search button =============*/

newSearch.addEventListener('click', function(){
	clearList();
	results.style.display = 'none';
	searchOptions.style.display = 'block';
})

/* ======================= Functions ===========================*/

function buildList(data){ // build the list of links. add to the UL
	var index = 0;

	if (data.length === 0){
		var noResult = document.createElement('p');
		noResult.id = 'no-result';
		var noResultText = document.createTextNode("I couldn't find anything on that subject. Please enter a new search term.");
		noResult.appendChild(noResultText);
		results.insertBefore(noResult, newSearch);
	} else if (data.length < 10){
		for (var j = 0; j < data.length; j++){
			var resultList = document.getElementById('result-list');
			var listItemElement = document.createElement('LI');
			var listItemLink = document.createElement('a');
			listItemLink.setAttribute('href', data[index]);
			listItemLink.setAttribute('target', '_blank');
			listItemLink.innerHTML = data[index];
			listItemElement.appendChild(listItemLink);
			resultList.appendChild(listItemElement);

			index ++;
		}
	} else {
		for (var i = 0; i < 10; i++){
			var resultList = document.getElementById('result-list');
			var listItemElement = document.createElement('LI');
			var listItemLink = document.createElement('a');
			listItemLink.setAttribute('href', data[index]);
			listItemLink.setAttribute('target', '_blank');
			listItemLink.innerHTML = data[index];
			listItemElement.appendChild(listItemLink);
			resultList.appendChild(listItemElement);

			index += 1;
		}
	}
}

function showList(){
	searchOptions.style.display = 'none';
	results.style.display = 'block';
}


function clearList(){
	if (document.getElementById('result-list').getElementsByTagName('li').length === 0){
		var paragraph = document.getElementById('no-result');
		paragraph.parentNode.removeChild(paragraph);
	}
	document.getElementById('result-list').innerHTML = '';
}


function resetSearch(){
	document.getElementById('search-term').value = '';
}












