<?php
	$start=$_GET["start"];
	$len=$_GET["len"];
	$con=array();
	for($i=0;$i<$len;$i++){
		array_push($con,"内容".($start+$i+1));
	}
	$stu;
	if($con){
		$stu=0;
	}else{
		$stu=1;
	}
	echo json_encode(array('stu'=>$stu,'con'=>$con));
?>