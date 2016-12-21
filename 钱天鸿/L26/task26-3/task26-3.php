<?php
	//后端php测试接口文件
	$start=$_GET['start'];
	$len=$_GET['leng'];
	$items=array();

	for($i=0;$i<$len;$i++){
		array_push($items,'内容'.($start+$i+1));
	}
	$ret=array('status'=>1,'data'=>$items);
	//{status:1,data:['内容1','内容2','内容3']}
	sleep(2);//延迟2秒响应数据

	echo json_encode($ret);
?>