<?php
	header("Content-type:");
	$username = $_GET['username'];
	if($username==='xiaoming'){
		$opts = array('username'=>'xiaoming','password'=>'abcd1234');
	}els{
		$opts = array('username'=>'blank','password'=>'blank');

	}
	echo json_encode($opts);
?>