<?php
  $name = $_GET["usename"];
  if($name === 'hunger'){
    $ret = 1;
  }else{
    $ret = 0;
  }
  echo json_encode($ret);
  echo json_encode($name);
?>
