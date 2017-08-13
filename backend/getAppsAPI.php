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

	class getApps{
		private $quantity;
		private $startPosition;
		private $order;
		private $search;
		private $app;

		function __construct($json){
			$json = json_decode($json, true);

			$this->quantity = $json['quantity'];
			$this->startPosition = $json['startPosition'];
			$this->order = $json['order'];
			$this->search = $json['search'];
			$this->app = $json['app'];

			$this->getResults();
		}

		function getResults(){
			$database = new databaseClass;
			$pdo = new PDO("mysql:host=".$database->returnHost().";dbname=".$database->returnDbName().";charset=utf8", $database->returnUsername(), $database->returnPassword());

			if($this->order == 'specific'){
				$stmt = $pdo->prepare("SELECT id, name, description, creator, img, js FROM app WHERE name = '$this->app'");				
			}

			if($this->order == 'search'){
				$stmt = $pdo->prepare("SELECT id, name, description, creator, img, js FROM app WHERE name LIKE '%$this->search%' ORDER BY id desc LIMIT $this->quantity OFFSET $this->startPosition");
			}

			if($this->order == 'new'){
				$stmt = $pdo->prepare("SELECT id, name, description, creator, img, js FROM app ORDER BY id desc LIMIT $this->quantity OFFSET $this->startPosition");		
			}

			$stmt->execute();
			echo json_encode($stmt->fetchAll());
			$pdo = null;
		}
	}

	$getApp = new getApps(file_get_contents('php://input'));
?>