const Peer = window.Peer;

(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  const localText = document.getElementById('js-local-text');
  const sendTrigger = document.getElementById('js-send-trigger');
  const messages = document.getElementById('js-messages');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');
  const toggleMicrophone = document.getElementById('js-toggle-microphone');
  const toggleCamera = document.getElementById('js-toggle-camera');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const getRoomModeByHash = () => (location.hash === '#mesh' ? 'sfu' : 'mesh');

  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => (roomMode.textContent = getRoomModeByHash())
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  // Render local stream
  // localStreamをdiv(localVideo)に挿入 const audioStreamが不明
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
      console.log("microphone = "+audioTracks.enabled)
      toggleMicrophone.id = `${audioTracks.enabled ? 'js-toggle-microphone' : 'js-toggle-microphone_OFF'}`;
    });

    //ボタン押した時のカメラ関係の動作
    toggleCamera.addEventListener('click', () => {
      const videoTracks = videoStream.getVideoTracks()[0];
      const localTracks = localStream.getVideoTracks()[0];
      localTracks.enabled = !localTracks.enabled;
      videoTracks.enabled = !videoTracks.enabled;
      console.log(videoTracks.enabled)
  
      toggleCamera.id = `${videoTracks.enabled ? 'js-toggle-camera' : 'js-toggle-camera_OFF'}`;
  
    });

  // eslint-disable-next-line require-atomic-updates
  const peer = (window.peer = new Peer({
    key: '89e695ed-372d-437f-8248-d0c63f9c5e23',
    debug: 3,
  }));

  // Register join handler
  joinTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once('open', () => {
      messages.textContent += '=== You joined ===\n';
    });
    room.on('peerJoin', peerId => {
      messages.textContent += `=== ${peerId} joined ===\n`;
    });

    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      newVideo.id = "remote";
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute('data-peer-id', stream.peerId);
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      messages.textContent += `${src}: ${data}\n`;
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

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
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

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