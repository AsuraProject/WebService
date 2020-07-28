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
	var signInButton = document.getElementById('signInButton');

 	signInButton.addEventListener('click', function(event) {
 		signIn();
 	});

	function signIn(){
		this.emptyPermission = true;

		this.main = function(){
			errorMessageDiv = document.getElementById('error-message-div');
			errorMessageSpan = document.getElementById('error-message-span');
			errorMessageDiv.style['display'] = "none";

			this.isEmptyInput('firstname');
			this.isEmptyInput('lastname');
			this.isEmptyInput('username');
			this.isEmptyInput('password');
			this.isEmptyInput('repassword');

			if(this.emptyPermission){
				if(this.passwordIsEqual()){
					this.usernameNotIsRegistered();
				}	
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

		this.passwordIsEqual = function(){
			var passwordInput = document.getElementById('password-input');
			var repeatPasswordInput = document.getElementById('repassword-input');

			if(passwordInput.value == repeatPasswordInput.value){
				return true;
			}else{
				errorMessageDiv.style['display'] = "block";
				errorMessageSpan.innerHTML = "Repeated password is different";
				repeatPasswordInput.style['border-bottom'] = "3px solid black";
				return false;
			}
		}

		this.usernameNotIsRegistered = function(){
			var thisVar = this;
			var json = new Object();
			json.username = document.getElementById('username-input').value;
			json = JSON.stringify(json);

			var httpConnection = new XMLHttpRequest();

			httpConnection.open("POST", "../backend/usernameNotIsRegistered.php", true);

    		httpConnection.onreadystatechange = function() { 
    			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
    				if(httpConnection.responseText){
    					thisVar.createAccount();
    				}else{
						errorMessageDiv.style['display'] = "block";
						errorMessageSpan.innerHTML = "Username is already registered";
						   					
    				}
        		}
    		}

    		httpConnection.send(json);
		}

		this.createAccount = function(){
			var json = new Object();
			json.firstname = document.getElementById('firstname-input').value;
			json.lastname = document.getElementById('lastname-input').value;
			json.username = document.getElementById('username-input').value;
			json.password = document.getElementById('password-input').value;
			json = JSON.stringify(json);

			var httpConnection = new XMLHttpRequest();

			httpConnection.open("POST", "../backend/createAccount.php", true);
    		httpConnection.send(json);

			httpConnection.onreadystatechange = function() { 
    			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
					window.location.href = '../index.html';
        		}
    		}

		}

		this.main();
	}	
}, false);