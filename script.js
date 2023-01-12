$(function () {
    var playerTrack = $("#player-track"),
      bgArtwork = $("#bg-artwork"),
      bgArtworkUrl,
      albumName = $("#album-name"),
      trackName = $("#track-name"),
      albumArt = $("#album-art"),
      sArea = $("#s-area"),
      seekBar = $("#seek-bar"),
      trackTime = $("#track-time"),
      insTime = $("#ins-time"),
      sHover = $("#s-hover"),
      playPauseButton = $("#play-pause-button"),
      i = playPauseButton.find("i"),
      tProgress = $("#current-time"),
      tTime = $("#track-length"),
      seekT,
      seekLoc,
      seekBarPos,
      cM,
      ctMinutes,
      ctSeconds,
      curMinutes,
      curSeconds,
      durMinutes,
      durSeconds,
      playProgress,
      bTime,
      nTime = 0,
      buffInterval = null,
      tFlag = false,
      albums = [
        "Up 2 më",
        "Up 2 më",
        "Pocket Rocket",
        "Virgo World",
        "Lil Boat 3",
        "Sweet Action",
        "TWOPOINTFIVE",
        "OnePointFive",
        "Limbo",
        "My Everything",
        "Benbow Crescent",
        "Starburst Snippet",
        "SUV's (Black on Black)",
        "Confetti",
        "Confetti",
        "Up 2 më",
        "Trëndi",
        "Drunk When I Made This"
      ],
      trackNames = [
        "Yeat - Turban",
        "Yeat - Ya Ya",
        "Cochise - Pocket Rocket",
        "Lil Tecca ft. Lil Uzi Vert - Dolly",
        "Lil Yachty - Split/Whole Time",
        "Jack Harlow - 2STYLISH",
        "Aminé - Charmander",
        "Aminé - REEL IT IN",
        "Aminé - Woodlawn",
        "B Lovee - My Everything",
        "Cochise - Knicks",
        "Cochise ft. $not - Tell Em",
        "Aminé  ft. Kehlani - Heebiejeebies",
        "Jack Harlow - Starbust Snippet",
        "Jack Harlow ft. Pooh Shiesty - SUV's (Black in Black)",
        "Jack Harlow - ROTTEN",
        "Jack Harlow - WALK IN THE PARK",
        "Yeat - Gët Busy",
        "Yeat - Mad Bout That",
        "YN Jay - Drunk When I Made This"
      ],
      albumArtworks = ["_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8", "_9", "_10", "_11", "_12", "_13", "_14", "_15", "_16", "_17", "_18", "_19", "_20"],
      trackUrl = [
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/(CLEAN)%20YEAT%20-%20Turban.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/(CLEAN)%20YEAT%20-%20Ya%20Ya.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/%5BClean%5D%20Cochise-%20Pocket%20Rocket.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/%5BCLEAN%5D%20Lil%20Tecca%20-%20Dolly%20(with%20Lil%20Uzi%20Vert).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/%5BCLEAN%5D%20Lil%20Yachty%20-%20Split_Whole%20Time.mp3 ",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/2STYLISH.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Amin%C3%A9%20-%20Charmander%20clean.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Amin%C3%A9%20-%20REEL%20IT%20IN%20(CLEAN).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Amin%C3%A9-Woodlawn%20(Clean).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/B%20Lovee%20-%20My%20Everything%20(Lyrics)%20she%20acting%20naughty%20tiktok%20song.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Cochise%20-%20Knicks%20(Clean).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/cochise%20&%20$not%20-%20tell%20em%20(clean_radio%20edit).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Heebiejeebies%20(Clean%20Lyrics)%20-%20Amine%20ft.Kehlani.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/JACK%20HARLOW%20INSTAGRAM%20SNIPPET%209_23_20.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Jack%20Harlow,%20Pooh%20Shiesty%20-%20SUV's%20(Black%20on%20Black)%20(LYRICS)%20(CLEAN).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/ROTTEN%20(feat.%20EST%20Gee).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/WALK%20IN%20THE%20PARK.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/Yeat%20-%20Get%20Busy%20(Clean).mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/YEAT%20-%20MAD%20BOUT%20THAT%20(%20Official%20Music%20Video%20)%20%5B%20Created%20by%20@MOSHPXT%20&%20@Jack%20Rottier%20%5D.mp3",
        "https://github.com/TechSavvyFaSho/Music-Playlist-/blob/9bcda6de8743cea0a99df36702fa90b8acec36f2/music/YN%20Jay%20-%20Drunk%20When%20I%20Made%20This%20(Official%20Audio).mp3"
      ],
      playPreviousTrackButton = $("#play-previous"),
      playNextTrackButton = $("#play-next"),
      currIndex = -1;
  
    function playPause() {
      setTimeout(function () {
        if (audio.paused) {
          playerTrack.addClass("active");
          albumArt.addClass("active");
          checkBuffering();
          i.attr("class", "fas fa-pause");
          audio.play();
        } else {
          playerTrack.removeClass("active");
          albumArt.removeClass("active");
          clearInterval(buffInterval);
          albumArt.removeClass("buffering");
          i.attr("class", "fas fa-play");
          audio.pause();
        }
      }, 300);
    }
  
    function showHover(event) {
      seekBarPos = sArea.offset();
      seekT = event.clientX - seekBarPos.left;
      seekLoc = audio.duration * (seekT / sArea.outerWidth());
  
      sHover.width(seekT);
  
      cM = seekLoc / 60;
  
      ctMinutes = Math.floor(cM);
      ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
  
      if (ctMinutes < 0 || ctSeconds < 0) return;
  
      if (ctMinutes < 0 || ctSeconds < 0) return;
  
      if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
      if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;
  
      if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
      else insTime.text(ctMinutes + ":" + ctSeconds);
  
      insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
    }
  
    function hideHover() {
      sHover.width(0);
      insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
    }
  
    function playFromClickedPos() {
      audio.currentTime = seekLoc;
      seekBar.width(seekT);
      hideHover();
    }
  
    function updateCurrTime() {
      nTime = new Date();
      nTime = nTime.getTime();
  
      if (!tFlag) {
        tFlag = true;
        trackTime.addClass("active");
      }
  
      curMinutes = Math.floor(audio.currentTime / 60);
      curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
  
      durMinutes = Math.floor(audio.duration / 60);
      durSeconds = Math.floor(audio.duration - durMinutes * 60);
  
      playProgress = (audio.currentTime / audio.duration) * 100;
  
      if (curMinutes < 10) curMinutes = "0" + curMinutes;
      if (curSeconds < 10) curSeconds = "0" + curSeconds;
  
      if (durMinutes < 10) durMinutes = "0" + durMinutes;
      if (durSeconds < 10) durSeconds = "0" + durSeconds;
  
      if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
      else tProgress.text(curMinutes + ":" + curSeconds);
  
      if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
      else tTime.text(durMinutes + ":" + durSeconds);
  
      if (
        isNaN(curMinutes) ||
        isNaN(curSeconds) ||
        isNaN(durMinutes) ||
        isNaN(durSeconds)
      )
        trackTime.removeClass("active");
      else trackTime.addClass("active");
  
      seekBar.width(playProgress + "%");
  
      if (playProgress == 100) {
        i.attr("class", "fa fa-play");
        seekBar.width(0);
        tProgress.text("00:00");
        albumArt.removeClass("buffering").removeClass("active");
        clearInterval(buffInterval);
      }
    }
  
    function checkBuffering() {
      clearInterval(buffInterval);
      buffInterval = setInterval(function () {
        if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
        else albumArt.removeClass("buffering");
  
        bTime = new Date();
        bTime = bTime.getTime();
      }, 100);
    }
  
    function selectTrack(flag) {
      if (flag == 0 || flag == 1) ++currIndex;
      else --currIndex;
  
      if (currIndex > -1 && currIndex < albumArtworks.length) {
        if (flag == 0) i.attr("class", "fa fa-play");
        else {
          albumArt.removeClass("buffering");
          i.attr("class", "fa fa-pause");
        }
  
        seekBar.width(0);
        trackTime.removeClass("active");
        tProgress.text("00:00");
        tTime.text("00:00");
  
        currAlbum = albums[currIndex];
        currTrackName = trackNames[currIndex];
        currArtwork = albumArtworks[currIndex];
  
        audio.src = trackUrl[currIndex];
  
        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();
  
        if (flag != 0) {
          audio.play();
          playerTrack.addClass("active");
          albumArt.addClass("active");
  
          clearInterval(buffInterval);
          checkBuffering();
        }
  
        albumName.text(currAlbum);
        trackName.text(currTrackName);
        albumArt.find("img.active").removeClass("active");
        $("#" + currArtwork).addClass("active");
  
        bgArtworkUrl = $("#" + currArtwork).attr("src");
  
        bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
      } else {
        if (flag == 0 || flag == 1) --currIndex;
        else ++currIndex;
      }
    }
  
    function initPlayer() {
      audio = new Audio();
  
      selectTrack(0);
  
      audio.loop = false;
  
      playPauseButton.on("click", playPause);
  
      sArea.mousemove(function (event) {
        showHover(event);
      });
  
      sArea.mouseout(hideHover);
  
      sArea.on("click", playFromClickedPos);
  
      $(audio).on("timeupdate", updateCurrTime);
  
      playPreviousTrackButton.on("click", function () {
        selectTrack(-1);
      });
      playNextTrackButton.on("click", function () {
        selectTrack(1);
      });
    }
  
    initPlayer();
  });
  
