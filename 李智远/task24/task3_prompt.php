<?php
	$user=$_GET["user"];
	$pw=$_GET["pw"];
	if($user && $pw){
		$stu=0;
	}else{
		$stu=1;
	}
	echo json_encode($stu);
?>
