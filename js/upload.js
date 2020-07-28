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
isLogged.onNoLogged = function(){
	window.location.href = "../"; 		
}

document.addEventListener('DOMContentLoaded', function(){
	errorMessageDiv = document.getElementById('error-message-div');
	errorMessageSpan = document.getElementById('error-message-span');

	logoImage = false;
	jsApp = false;

 	imgFileInput.addEventListener('click', function(event) {
 		document.getElementById('uploadFileImgInput').click();
 	});

 	uploadFileImgInput.addEventListener('change', function(event) {
 		if(fileFormat(this.files[0], 'jpg png jpeg gif')){
 			document.getElementById('imgFileInput').src = window.URL.createObjectURL(this.files[0]);
 			logoImage = this.files[0];
 		}else{
			errorMessageDiv.style['display'] = "block";
			setMessageError("Upload an image (jpg, png, jpeg or gif format)");			
 		}
 	});

 	uploadJSFileInput.addEventListener('change', function(event) {
 		if(fileFormat(this.files[0], 'js')){
 			jsApp = this.files[0];
			document.getElementById('upload-js-button--text').innerHTML = this.files[0].name;
			document.getElementById('uploadGo').style['display'] = "block";
		}else{
			setMessageError("Upload an javascript app");			
		}
 	});

 	uploadGo.addEventListener('click', function(event) {
 		upload();
 	});

 	function upload(){
		this.emptyPermission = true;

 		this.main = function(){
 			this.isEmptyInput('upload-app-name');
 			this.isEmptyInput('upload-description');

 			if(this.emptyPermission){
 				if(logoImage){
 					this.appNotExists();
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

		this.appNotExists = function(){
			var thisVar = this;
			var json = new Object();
			json.name = document.getElementById('upload-app-name-input').value;
			json = JSON.stringify(json);

			var httpConnection = new XMLHttpRequest();

			httpConnection.open("POST", "../backend/appNotExists.php", true);

    		httpConnection.onreadystatechange = function() { 
    			if(httpConnection.readyState == 4 && httpConnection.status == 200) {
    				if(httpConnection.responseText){
						thisVar.startUpload();
    				}else{
    					thisVar.setMessageError("The app name is already registered");
    				}
        		}
    		}

    		httpConnection.send(json);
		}

		this.startUpload = function(){
		  	var formData = new FormData();
		  	formData.append("img", logoImage);
		  	formData.append("name", document.getElementById('upload-app-name-input').value);
		  	formData.append("description", document.getElementById('upload-description-input').value);
		  	formData.append("app", jsApp);
		  	formData.append("creator", isLogged.username);

			document.getElementById('upload-progress').style['display'] = "block";
			document.getElementById('uploadGo').style['display'] = "none";

		  	var httpConnection = new XMLHttpRequest();
		  	httpConnection.open("POST", "../backend/uploadApp.php", true);
		  
		  	httpConnection.upload.onprogress = function(e){
		   		if (e.lengthComputable){
		      		var percentComplete = (e.loaded / e.total) * 100;
		      		document.getElementById('upload-progress').innerHTML = percentComplete + '%';
		    	}
		  	}

		  	httpConnection.onload = function(){
				if (this.status == 200){
					if(this.response){
						console.log("All right");
						window.location.href = "../index.html";
					}else{
						document.getElementById('upload-progress').style['display'] = "none";
						document.getElementById('uploadGo').style['display'] = "block";
						setMessageError("Error on upload, try again");
					}
				}
		  	}

		  	httpConnection.send(formData);
		}

 		this.main();
 	}

 	function setMessageError(message){
		errorMessageDiv.style['display'] = "block";
		errorMessageSpan.innerHTML = message;	 		
 	}

	function fileFormat(file, format) {
		var fileFormate = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length);

 		if(format.includes(fileFormate)){
			errorMessageDiv = document.getElementById['display'] = "none";
			errorMessageSpan.innerHTML = ""; 			
 			return true;
 		}
	}
}, false);