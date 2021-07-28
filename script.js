const Peer = window.Peer;

(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  // const localText = document.getElementById('js-local-text');
  // const sendTrigger = document.getElementById('js-send-trigger');
  // const messages = document.getElementById('js-messages');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');
  const toggleMicrophone = document.getElementById('js-toggle-microphone');
  const toggleCamera = document.getElementById('js-toggle-camera');
  const newSpan = document.getElementById('remote-span');
  const urlshare = document.getElementById('js-url-share');
  const leave = document.getElementById('leave');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const getRoomModeByHash = () => (location.hash === '#mesh' ? 'sfu' : 'mesh');

  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => {roomMode.textContent = getRoomModeByHash()
    joinTrigger.click();}
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);
    console.log(localStream);
  // Render local stream
  // localStreamをdiv(localVideo)に挿入
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
  const audioTrack = audioStream.getAudioTracks()[0]
  
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

    // ボタン押した時のマイク関係の動作
    toggleMicrophone.addEventListener('click', () => {
      const audioTracks = audioStream.getAudioTracks()[0];
      const localTracks = localStream.getAudioTracks()[0];
      localTracks.enabled = !localTracks.enabled;
      audioTrack.enabled = !audioTrack.enabled;
      console.log("microphone = "+audioTracks.enabled);
      toggleMicrophone.id = `${audioTracks.enabled ? 'js-toggle-microphone' : 'js-toggle-microphone_OFF'}`;
    });

    const streamvideo = localStream;
    //ボタン押した時のカメラ関係の動作
    toggleCamera.addEventListener('click', () => {
      const videoTracks = videoStream.getVideoTracks()[0];
      const localTracks = localStream.getVideoTracks()[0];
      // const videoOFFcanvas = document.createElement('canvas');
      // videoOFFcanvas.setAttribute('class',"videoOFFcanvas");
      localTracks.enabled = !localTracks.enabled;
      videoTracks.enabled = !videoTracks.enabled;
      console.log(localStream.getVideoTracks()[0]);
      // streamvideo = `${videoTracks.enabled ? localStream:videoOFFcanvas}`;
      toggleCamera.id = `${videoTracks.enabled ? 'js-toggle-camera' : 'js-toggle-camera_OFF'}`;
  
    });

    //退出ボタン
    leaveTrigger.addEventListener('click', () => {
      var leaveResult = window.confirm("退出しますか？");
      if(leaveResult == true){
        window.location.href='./meetinghome.php';
      }
      });
    
      window.addEventListener('beforeunload', function(e){
        /** 更新される直前の処理 */
        room.close();
      });

  // eslint-disable-next-line require-atomic-updates
  //  var string_email = String(email);
  const peer = new Peer(post_id,{
    key: '89e695ed-372d-437f-8248-d0c63f9c5e23',
    debug: 3,
  });

  // Register join handler
  joinTrigger.addEventListener('click', () => {
    joinTrigger.id = "js-join-trigger_OFF";
    joinTrigger.enabled = false;
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }
    
    //入力されたルームIDに入室
    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: streamvideo,
    });

    // room.once('open', () => {
    //   messages.textContent += '=== You joined ===\n';
    // });
    // room.on('peerJoin', peerId => {
    //   messages.textContent += `=== ${peerId} joined ===\n`;
    // });

    // 入ってきた人がいる時に新しくビデオ画面を追加
    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      const Video_div = document.createElement('button');
      const nametext = document.createElement('textarea');
      nametext.id = "name";
      // nametext.value
      Video_div.id = "remote_div";
      newVideo.id = "remote";
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // mark peerId to find it later at peerLeave event
      Video_div.setAttribute('data-peer-id', stream.peerId);
      Video_div.setAttribute('onclick',"openprofileForm()");
      newVideo.setAttribute('data-peer-id',stream.peerId);
      //名前取得
      $.ajax({
        type: "POST", //　GETでも可
        url: "serch_profile.php", //　送り先
        data: { 'post_id': stream.peerId }, //　渡したいデータをオブジェクトで渡す
        dataType : "json", //　データ形式を指定
        scriptCharset: 'utf-8' //　文字コードを指定
    })
    .then(
        function(param){　 //　paramに処理後のデータが入って戻ってくる
            console.log(param); //　帰ってきたら実行する処理
            nametext.value = param[0].nickname;
        },
        function(XMLHttpRequest, textStatus, errorThrown){ //　エラーが起きた時はこちらが実行される
            console.log(XMLHttpRequest); //　エラー内容表示
    });
      await newVideo.play().catch(console.error);
      newSpan.append(Video_div);
      Video_div.append(nametext);
      Video_div.append(newVideo);
      //ポップアップ生成
      Video_div.addEventListener('click',() => {
        console.log("test_start");
        const post_id = stream.peerId; // 渡したいデータ
 
        $.ajax({
            type: "POST", //　GETでも可
            url: "serch_profile.php", //　送り先
            data: { 'post_id': post_id }, //　渡したいデータをオブジェクトで渡す
            dataType : "json", //　データ形式を指定
            scriptCharset: 'utf-8' //　文字コードを指定
        })
        .then(
            function(param){　 //　paramに処理後のデータが入って戻ってくる
                console.log(param); //　帰ってきたら実行する処理
                const profile_nickname = document.getElementById('profile_nickname');
                const profile_shikaku = document.getElementById('profile_shikaku');
                const profile_hobby = document.getElementById('profile_hobby');
                const profile_skill = document.getElementById('profile_skill');
                const profile_strength = document.getElementById('profile_strength');
                const profile_comment = document.getElementById('profile_comment');
                profile_nickname.textContent = param[0].nickname;
                console.log(param[0].nickname);
                profile_shikaku.textContent = param[0].shikaku;
                profile_hobby.textContent = param[0].hobby;
                profile_skill.textContent = param[0].skill;
                profile_strength.textContent = param[0].strengths;
                profile_comment.textContent = param[0].comment;
            },
            function(XMLHttpRequest, textStatus, errorThrown){ //　エラーが起きた時はこちらが実行される
                console.log(XMLHttpRequest); //　エラー内容表示
        });
              });
    });

    //相手の画面のボタン
    // const Video_div = document.getElementById('remote_div');
    

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      messages.textContent += `${src}: ${data}\n`;
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteDiv = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      const remoteVideo = remoteDiv.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();
      remoteDiv.remove();
      messages.textContent += `=== ${peerId} left ===\n`;
    });

    // for closing myself
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      messages.textContent += '== You left ===\n';
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    sendTrigger.addEventListener('click', onClickSend);
    leave.addEventListener('click', () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);

      messages.textContent += `${peer.id}: ${localText.value}\n`;
      localText.value = '';
    }
  });

  //反響をキャンセル
  localStream.getAudioTracks().forEach(track => {
    let constraints = track.getConstraints();
    constraints.echoCancellation = true;
    track.applyConstraints(constraints);
});

  peer.on('error', console.error);
})();

function closelogoutForm(){
  document.body.classList.remove("showopenlogoutForm");
}

function openprofileForm(){
  document.body.classList.add("showopenprofileForm");
  console.log("test1");
}
function closeprofileForm(){
  document.body.classList.remove("showopenprofileForm");
  console.log("test2");
}