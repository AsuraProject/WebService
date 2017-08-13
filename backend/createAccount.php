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

	class newUser{
		private $firstName;
		private $lastName;
		private $username;
		private $email;
		private $password;

		function __construct($json){
			$userData = json_decode($json, true);

			$this->firstName = $userData['firstname'];
			$this->lastName = $userData['lastname'];
			$this->username = $userData['username'];
			$this->password = sha1(md5($userData['password']));

			$this->setOnDB();
		}

		function setOnDB(){
			$database = new databaseClass;
			$pdo = new PDO("mysql:host=".$database->returnHost().";dbname=".$database->returnDbName().";charset=utf8", $database->returnUsername(), $database->returnPassword());

			$pdoExe = $pdo->prepare("INSERT INTO user(firstname, lastname, username, password) VALUES ('$this->firstName', '$this->lastName', '$this->username', '$this->password')");
			$pdoExe->execute();

			$pdo = null;
		 	$this->startAccount();
		}

		function startAccount(){
			session_start();
			$_SESSION['CONNECTED'] = true;
			$_SESSION['USERNAME'] = $this->username;	
		}
	}

	$newUser = new newUser(file_get_contents('php://input'));
?>