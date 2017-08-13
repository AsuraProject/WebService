/* Copyright 2017 Yuri Faria

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

isLogged = new isLogged();
isLogged.onLogged = function(){
 	document.getElementById('log-in-link').style['display'] = "none";
 	document.getElementById('sign-in-link').style['display'] = "none";
 	document.getElementById('upload-link').style['display'] = "block";

   	document.getElementById('log-in-link-drawer').style['display'] = "none";
 	document.getElementById('sign-in-link-drawer').style['display'] = "none";
 	document.getElementById('upload-link-drawer').style['display'] = "block";	
}

isLogged.onNoLogged = function(){
 	document.getElementById('log-in-link').style['display'] = "block";
 	document.getElementById('sign-in-link').style['display'] = "block";
 	document.getElementById('upload-link').style['display'] = "none"; 

  	document.getElementById('log-in-link-drawer').style['display'] = "block";
 	document.getElementById('sign-in-link-drawer').style['display'] = "block";
 	document.getElementById('upload-link-drawer').style['display'] = "none"; 			
}

document.addEventListener('DOMContentLoaded', function(){

	searchButton.addEventListener('click', function(event) {
		var query = document.getElementById('search-input').value;
		window.location.href = "?search=" + query;
	});

	searchButtonSmall.addEventListener('click', function(event) {
		var query = document.getElementById('search-input-small').value;
		window.location.href = "?search=" + query;
	});

	function feed(){
		this.initialStart = 0;
		this.apps = new getApps();

		this.main = function(){
			var thisVar = this;

			this.apps.setQuantity(20);
			var searchQuery = window.location.href.split('=')[1];
			this.apps.setSearch(searchQuery);			
			this.apps.getResults();

			this.apps.onGetResults = function(){
				thisVar.createElements(thisVar.apps.results);
			}
		}

		this.createElements = function(results){
			for(part = 0; part < results.length; part++){
				var newImage = document.createElement('img');
				newImage.src = "../upload/img/" + results[part]['img'];
				newImage.style['width'] = "300px";
				newImage.style['height'] = "300px";

				var newTitle = document.createElement('span');
				newTitle.classList.add('mdl-layout-title');
				newTitle.innerText = results[part]['name'];

				var newDescription = document.createElement('span');
				newDescription.innerHTML = results[part]['description'] + "<br>";

				var newCreator = document.createElement('span');
				newCreator.innerText = "Creator: " + results[part]['creator'];

				var newElement = document.createElement('div');
				newElement.classList.add('mdl-cell');
				newElement.classList.add('mdl-cell-1--col');
				newElement.appendChild(newImage);
				newElement.appendChild(newTitle);
				newElement.appendChild(newDescription);
				newElement.appendChild(newCreator);
				document.getElementById('feed-new').appendChild(newElement);
			}

			if(results.length == 0){
				var errorMessage = document.createElement('span');
				errorMessage.classList.add('mdl-layout-title');
				errorMessage.innerText = "=/";
				document.getElementById('main').appendChild(errorMessage);
			}

			if(results.length == 20){
				document.getElementById('showMoreButton').style['display'] = "block";
				this.initialStart += 20;
				this.apps.setStartPosition(this.initialStart);
			}else{
				document.getElementById('showMoreButton').style['display'] = "none";
			}
		}

		this.main();
	}

	indexFeed = new feed();

	showMoreButton.addEventListener('click', function(event) {
		indexFeed.main();
	});

}, false);