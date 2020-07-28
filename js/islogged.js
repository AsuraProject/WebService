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

function isLogged(typeReq = '..'){
	this.username;

	this.main = function(){
		var thisVar = this;
		var httpConnection = new XMLHttpRequest();

		httpConnection.open("POST", typeReq + "/backend/isLogged.php", true);

		httpConnection.onreadystatechange = function() { 
			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
				if(httpConnection.responseText){
					thisVar.onLogged();
					thisVar.getUser();
				}else{
					thisVar.onNoLogged();
				}
			}
		}

		httpConnection.send();
	}

	this.onLogged = function(){
	}

	this.getUser = function(){
		var thisVar = this;
		var httpConnection = new XMLHttpRequest();

		httpConnection.open("POST", typeReq + "/backend/getUser.php", true);

		httpConnection.onreadystatechange = function() { 
			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
				thisVar.username = httpConnection.responseText;
			}
		}

		httpConnection.send();			
	}

	this.onNoLogged = function(){
	}

	this.main();
}