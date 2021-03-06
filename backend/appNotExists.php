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

	class appNotExists{
		private $name;

		function __construct($json){
			$json = json_decode($json, true);

			$this->username = $json['name'];
			$this->searchApp();
		}

		function searchApp(){
			$database = new databaseClass;
			$pdo = new PDO("mysql:host=".$database->returnHost().";dbname=".$database->returnDbName().";charset=utf8", $database->returnUsername(), $database->returnPassword());
		
			$stmt = $pdo->prepare("SELECT name FROM  app WHERE name = '$this->name'");
			$stmt->execute();

			if(!$stmt->fetchObject()){
				echo true;
			}

			$pdo = null;
		}
	}

	$app = new appNotExists(file_get_contents('php://input'));
?>