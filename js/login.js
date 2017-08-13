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
	window.location.href = '../';
}

document.addEventListener('DOMContentLoaded', function(){

 	logInButton.addEventListener('click', function(event) {
 		logIn();
 	});

 	function logIn(){
		this.emptyPermission = true;
		this.usernameValue = document.getElementById('username-input').value;
		this.passwordValue = document.getElementById('password-input').value;

 		this.main = function(){
			errorMessageDiv = document.getElementById('error-message-div');
			errorMessageSpan = document.getElementById('error-message-span');
			errorMessageDiv.style['display'] = "none";

 			this.isEmptyInput('username');
 			this.isEmptyInput('password');

 			if(emptyPermission){
 				this.usernameIsRegistered();
 			}
 		}


		this.isEmptyInput = function(elementName){
			var input = document.getElementById(elementName + '-input');

			if(!input.value){
				input.style['border-bottom'] = "3px solid black";
				this.emptyPermission = false;			
			}else{
				input.style['border-bottom'] = "1px solid black";				
			}
		}

		this.usernameIsRegistered = function(){
			var thisVar = this;
			var json = new Object();
			json.username = this.usernameValue;
			json = JSON.stringify(json);

			var httpConnection = new XMLHttpRequest();

			httpConnection.open("POST", "../backend/usernameNotIsRegistered.php", true);

    		httpConnection.onreadystatechange = function() { 
    			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
    				if(httpConnection.responseText){
						thisVar.setMessageError("Username doesn't registered");
    				}else{
    					thisVar.connectAccount();
    				}
        		}
    		}

    		httpConnection.send(json);
		}

		this.connectAccount = function(){
			var thisVar = this;
			var json = new Object();
			json.username = this.usernameValue;
			json.password = this.passwordValue;
			json = JSON.stringify(json);

			var httpConnection = new XMLHttpRequest();

			httpConnection.open("POST", "http://localhost/asura/backend/connectAccount.php", true);

    		httpConnection.onreadystatechange = function() { 
    			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
    				console.log(httpConnection.responseText);
    				if(httpConnection.responseText){
    					window.location.href = '../';
    				}else{
						thisVar.setMessageError("Password is incorrect");    					
    				}
        		}
    		}

    		httpConnection.send(json);
		}

 	this.setMessageError = function(message){
		errorMessageDiv.style['display'] = "block";
		errorMessageSpan.innerHTML = message;	 		
 	}

		this.main();
 	}
}, false);