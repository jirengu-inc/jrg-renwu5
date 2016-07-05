
<?php
  if($method=!Empty($_GET)){
    if($_GET["method"]=="task24-1"){
      $ret= array('name' => "小韩");
      echo json_encode($ret);
    }elseif ($_GET["method"]=="task24-2") {
      $idx=$_GET["idx"];
      $count=$_GET["count"];
      $ret= array();
      for($i=0;$i<$count;$i++){
        $ret[$i]="内容".($idx+$i);
      }
      echo json_encode($ret);
    }
  }else{
    if($_POST["method"]=="checkName"){
       $name=$_POST["name"];
       if($name=="hunger"){
         $status=false;
         $text="用户已存在";
       }else{
         $status=true;
         $text="用户可用";
       }
       $ret= array('status' =>$status,'text'=>$text);
       echo json_encode($ret);
     }elseif ($_POST["method"]=="register") {
       $name=$_POST["username"];
       $password=$_POST["password"];
       $ret= array("status"=>0,"text"=>"注册成功");
       echo json_encode($ret);
     }

  }
?>
