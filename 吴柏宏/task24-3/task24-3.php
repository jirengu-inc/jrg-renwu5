<?php
  $name = $_POST['username'];
  if($name === 'hunger'){
    $ret = 1;
  }else{
    $ret = 0;
  }
  echo json_encode($ret);
?>
