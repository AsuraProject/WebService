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

function getApps(typeReq = '..'){
	this.quantity = 10;
	this.startPosition = 0;
	this.order = 'new';
	this.search = '';
	this.app = '';
	this.results = new Array();

	this.setQuantity = function(quantity){
		this.quantity = quantity;
	}

	this.setOrder = function(order){
		this.order = order;
	}

	this.setSearch = function(search){
		this.setOrder('search');
		this.search = search;
	}

	this.setApp = function(name){
		this.setOrder('specific');
		this.app = name;
	}

	this.setStartPosition = function(position){
		this.startPosition = position;
	}

	this.getResults = function(){
		var thisVar = this;
		var json = new Object();
		json.quantity = this.quantity;
		json.startPosition = this.startPosition;
		json.order = this.order;
		json.search = this.search;
		json.app = this.app;
		json = JSON.stringify(json);

		var httpConnection = new XMLHttpRequest();

		httpConnection.open("POST", typeReq + "/backend/getAppsAPI.php", true);

		httpConnection.onreadystatechange = function() { 
			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
				if(httpConnection.responseText.length){
					thisVar.results = JSON.parse(httpConnection.responseText);
					thisVar.onGetResults();
    			}
    		}
    	}

    	this.onGetResults = function(){
    	}

    	httpConnection.send(json);
	}
}