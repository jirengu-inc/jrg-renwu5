<?php
	//$username = $_GET['username']; //用于接收get请求
	$username = $_POST['username'];  //用于接收post请求
	if($username==='tom'){
		$ret = array('sex'=>'男','age'=>'18');
	}else if($username==='lucy'){
		$ret = array('sex'=>'女','age'=>'20');
	}else{
		$ret = array('sex'=>'男','age'=>'25');
	}
	echo json_encode($ret);
?>