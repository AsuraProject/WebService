<?php
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

	require_once ("databaseClass.php");
	session_start();

	class uploadApp{
		private $appName;
		private $appDescription;
		private $appCreator;
		private $imgFile;
		private $appFile;
		private $imgFileName;
		private $appFileName;

		function __construct(){
			$this->appName = $_REQUEST['name'];
			$this->appDescription = $_REQUEST['description'];
			$this->appCreator = $_SESSION['USERNAME'];
			$this->imgFile = $_FILES['img'];
			$this->appFile = $_FILES['app'];

			$this->upload();
		}

		function upload(){
			$path = '../upload/';
			$timeNow = time() . '_';

			$this->imgFileName = $timeNow . $this->imgFile['name'];
			$this->appFileName = $timeNow . $this->appFile['name'];

			if(!move_uploaded_file($this->imgFile['tmp_name'], $path . 'img/' . $this->imgFileName)){
				echo false;
				exit;
			}

			if(!move_uploaded_file($this->appFile['tmp_name'], $path . 'js/' . $this->appFileName)){
				echo false;
				exit;
			}

			$this->setOnDB();	
		}

		function setOnDB(){
			$database = new databaseClass;
			$pdo = new PDO("mysql:host=".$database->returnHost().";dbname=".$database->returnDbName().";charset=utf8", $database->returnUsername(), $database->returnPassword());

			$stmt = $pdo->prepare("INSERT INTO app(name, description, creator, img, js) VALUES ('$this->appName', '$this->appDescription', '$this->appCreator', '$this->imgFileName', '$this->appFileName')");
			$stmt->execute();

			$pdo = null;
			echo true;
		}
	}

	if(isset($_SESSION['CONNECTED'])){
		$uploadApp = new uploadApp(file_get_contents('php://input'));
	}
?>