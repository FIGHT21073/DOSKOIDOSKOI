<!DOCTYPE html>
<html lang="ja">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="./URLhashed.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>会議画面</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <?php
        session_start();
        if (isset($_SESSION['email'])) {
            $post_id = $_SESSION['id'];
            $param_json = json_encode( $post_id ); 
        }else{
            header('Location: index.php');
        }
    ?>
    <script type="text/javascript">
        var post_id='<?php echo $post_id; ?>';
    </script>
    <div class="container">
      <div class="room" id="room">
        
        <div>
        <div class="remote-streams" id="js-remote-streams">
            <span id="remote-span"></span>
          </div> <!--相手の顔の場所移動-->
          <div id="local-stream">
            <video id="js-local-stream"></video>
          </div>  
          <div id="button-layout">
            <span id="js-room-mode"></span>
            <input type="text" placeholder="ルームIDを入力" id="js-room-id">
            <button id="js-join-trigger">会議に参加</button>
            <button id="js-leave-trigger"></button>
            <button id="js-toggle-microphone"></button>
            <button id="js-toggle-camera"></button>
          </div>
        </div>
        <div class="popup-overlay"></div>
        <div class="popup">
          <div class="popup-close" onclick="closeprofileForm()">&times;</div>
            <div class="form">
              <h1 id="profile_first">プロフィール</h1>
              <dl><dt>ニックネーム</dt>
                  <dd id="profile_nickname"></dd></dl>
              <dl><dt>保有資格</dt>
                  <dd id="profile_shikaku"></dd></dl>
              <dl><dt>趣味</dt>
                  <dd id="profile_hobby"></dd></dl>
              <dl><dt>特技</dt>
                  <dd id="profile_skill"></dd></dl>
              <dl><dt>強み</dt>
                  <dd id="profile_strength"></dd></dl>
              <dl id="profile_last"><dt>ひとこと</dt>
                  <dd id="profile_comment"></dd></dl>
          </div>
          </div>
        </div>
        </div>
      <p class="meta" id="js-meta"></p>
    <script src="//cdn.webrtc.ecl.ntt.com/skyway-4.4.1.js"></script>
    <script src="./key.js"></script>
<!--    <script src="./script.js"></script>-->
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>