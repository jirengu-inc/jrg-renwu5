<?php
	$user=$_GET["user"];
	if($user==='hunger'){
		$stu=0;
	}else{
		$stu=1;
	}
	echo json_encode($stu);
?>