<?php
if(isset($_GET['laps'])) {
    $laps = $_GET['laps'];
} else {
    $laps = 10;
}
if(isset($_GET['players'])) {
    $players = $_GET['players'];
} else {
    $players = 10;
}
?>
<!doctype html>
<head>
  <title>Race Game</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1920, user-scalable=yes, initial-scale=1, maximum-scale=1">
  <link rel="shortcut icon" type="image/png" href="img/skull.png" />
  <link rel="stylesheet" type="text/css" href="css/css-server.css" />

</head>
<body>
<br>
<br>
  <table id="gameSettings">
    <tr>
        <th>Video Preview</th>
        <th>Game Settings </th>
        <th>Game Messages</th>
      </tr>
    <tr>
      <td class="videoPreview">
        <div class="camera">
            <video id="video">Video stream not available.</video>
        </div>
        <canvas id="canvas"></canvas>
      </td>
      <td class="gameConfig">
        <label>Number of Laps: </label>
        <input type="number" id="number_of_laps_value" name="number_of_laps_value" value="10" maxlength="3" onChange="updateGameSettings(this.name);">
        <br><br>
        <label>Checkpoint Gates: </label>
        <input type="number" id="checkpoint_gates" name="checkpoint_gates" value="3" maxlength="3" onChange="updateGameSettings(this.name);">
        <br><br>

        <br><br>
        <!-- <input type="checkbox" id="enable_test_mode" class="css-checkbox" value=1 checked="checked" />
        <label for="enable_test_mode" name="enable_test_mode" class="css-label dark-check-orange">🚥 Enable Test Buttons</label> -->
        <button id="raceStart">Start new Race</button>
        <button id="raceStop">Stop Race</button>
        <br><br>
        <button id="raceReset">Reset Race</button>
        <button id="testMode">Test Mode</button>
      </td>
      <td class="gameMessages">
        <textarea id="messageArea" rows="16" cols="40" readonly style="width:95%; overflow-y: scroll;"></textarea>
      </td>
    </tr>
  </table>




    <div id="stopWatch">00:00:000 </div>

    <table id="playerData">
        <thead>
          <tr>
              <td>
                <!-- <ul class="captions">
                  <li class=""><span>Who's Online ⇾</span></li>
                  <li class="personal_best"><span>Personal Best</span></li>
                  <li class="overall_best"><span>Overall Best</span></li>
                  <li class="race_over"><span>Race Over</span></li>
               </ul> -->
              </td>
              <?php for ($x=1; $x<=10; $x++) { ?>
              <td class="td_img cockpit<?= $x; ?>">
                <div class="overlay">📷</div>
                <img id="cockpit<?= $x; ?>" onclick="takepicture('cockpit<?= $x; ?>');  $('.default_picture<?= $x; ?>').show();" class="grayscale image" src="img/players/car<?= $x; ?>.png" />
                <!-- <span class="position_value">0</span> -->
                <a class="default_picture<?= $x; ?>" href="#" onload="$('.default_picture<?= $x; ?>').hide();" onclick="$('#cockpit<?= $x; ?>').attr('src','img/players/car<?= $x; ?>.png'); $('.default_picture<?= $x; ?>').hide();"> X </a>
                <span class="position_value"> - </span>
                <br>
                <input type="text" id="playerName<?= $x; ?>" name="playerName" value="" >
                <br>
                [Car] [Pilot]  [Lap]
<!-- <img src="img/on_car2.png" style="width:33%;" alt="Kiwi standing on oval">
<img src="img/on_wemos.svg" style="width:33%;" alt="Kiwi standing on oval"> -->
              </td>
              <?php } ?>
          </tr>
        </thead>
        </table>
        <br>
        <table id="player_stats">
          <tr>
            <th class="table_title">Simulate Event</th>
            <?php for ($x=1; $x<=10; $x++) { ?>
              <th class="car<?= $x; ?>">
                <a href="https://racegame.free.nf/game-client/rrr/index.php?car=<?= $x; ?>&cockpit=<?= $x; ?>" target="_blank">
                  Car <?= $x; ?>
                </a>
              </th>
            <?php } ?>
          </tr>
          <tr>
            <td>Laps</td>
            <?php for ($x=1; $x<=10; $x++) { ?>
              <td class="car<?= $x; ?> laps">
                <button class="buttonEvent" title="lap('car<?= $x; ?>');" onclick="lap('car<?= $x; ?>');">+</button>
              </td>
            <?php } ?>
          </tr>
          <tr>
            <td>Checkpoints</td>
            <?php for ($x=1; $x<=10; $x++) { ?>
              <td class="car<?= $x; ?> checkpoints">
                <button class="buttonEvent" title="checkpoint('car<?= $x; ?>');" onclick="checkpoint('car<?= $x; ?>');">+</button>
              </td>
            <?php } ?>
        </tr>
          <tr>
            <td>Nitro</td>
            <?php for ($x=1; $x<=10; $x++) { ?>
              <td class="car<?= $x; ?> nitro_use_count">
                <button class="buttonEvent" title="nitro('car<?= $x; ?>');" onclick="nitro('car<?= $x; ?>');">+</button>
              </td>
            <?php } ?>
          </tr>
            <tr>
              <td>Online</td>
              <?php for ($x=1; $x<=10; $x++) { ?>
                <td class="car<?= $x; ?> onlineCar">
                  <button class="" title="onlineCar('car<?= $x; ?>');" onclick="onlineCar('car<?= $x; ?>');">car<?= $x; ?></button>
                </td>
              <?php } ?>
            </tr>
        </table>

          <div id="player_stats_help" class="credits"><br>
            Use these <button >+</button> buttons to simulate a new lap, checkpoint or nitro use.
            <!-- <br> -->
            You can test this Lap Counter without any eletronics.<br><br>
          </div>

      <table id="lap_times">
          <thead>
              <tr class"change_bg">
                <th class="table_title">
                  <span class="icon_laps">🏁</span> <span class="lap_current"> 0</span> / <span class="total_laps">10</span>
                </th>
                <?php for ($x=1; $x<=10; $x++) { ?>
                <th class="car_bg car<?= $x; ?>">
                    <span class="position_valueb"> - </span>
                </th>
                <?php } ?>
            </tr>
         </thead>
         <tbody>
         <?php for ($y=1; $y<=10; $y++) { ?>
           <tr class="lap<?= $x; ?>">
               <td>Lap <?= $y; ?></td>
               <?php for ($x=1; $x<=10; $x++) { ?>
                 <td class="car<?= $x; ?>">-
               <?php } ?>
             </td>
           </tr>
           <?php } ?>
         </tbody>
         <tfoot>
            <tr>
            <td class="">Total Time</td>
            <?php for ($x=1; $x<=10; $x++) { ?>
            <td class="car<?= $x; ?> laps_total">-</td>
            <?php } ?>
           </tr>
           <tr>
             <td>Time diff to 1st</td>
             <?php for ($x=1; $x<=10; $x++) { ?> <td class="car<?= $x; ?> time_to_first"> </td> <?php } ?>
           </tr>
        </tfoot>
      </table>

        <div class="credits">
          <br>
          <ul class="colorMeaning">
            <li class=""><span>Color meanings: </span></li>
            <li class="personal_best"><span>Personal Best</span></li>
            <li class="overall_best">Overall Best</li>
            <li class="race_over">Race Over</li>
            <!-- <li class="race_over"><button class="" title="nitro('car<?= $x; ?>');" onclick="nitro('car<?= $x; ?>');">Save results as PDF</button></li> -->
          </ul>
       </div>

  <div class="credits">
    <!-- <a href="https://github.com/bbrusantin" target="_blank">github</a> |
    <a href="https://racegame.free.nf/" target="_blank">racegame.free.nf</a> --><br><br>
    <br>
<!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"> <input type="hidden" name="cmd" value="_donations"> <input type="hidden" name="business" value="JP2REDXHE35AE"> <input type="hidden" name="currency_code" value="USD"> <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button"> <noscript><img loading="lazy" loading="lazy"   alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" /></noscript><img class=" lazyloaded" loading="lazy" alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" data-src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1"></form> -->
<br>
<p> Consider buying me a beer 🍺 if you liked my <a href="https://github.com/bbrusantin" target="_blank"> lap counter </a></p><br><br><br>
  </div>

</body>
<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="js/mqttws31.min.js"></script>
<script type="text/javascript" src="js/capture.js"></script> <!-- // video feed -->
<script type="text/javascript" src="js/serverfunctions.js"></script>
<script type="text/javascript">

topicRaceEvents = 'race/events';
topicLapCounter = 'lap/counter';
topicOnlineCars = 'online/cars';
topicOnlineCockpits = 'online/cockpits';
topicOnlinePlayers = 'online/players';
topicUpdateCockpits = 'update/cockpits';
topicUpdateCars = 'update/cars';
topicUpdateGame = 'update/game';
topicCar1 = 'sensor/car1';
topicCar2 = 'sensor/car2';
topicCar3 = 'sensor/car3';
topicCar4 = 'sensor/car4';
topicCar5 = 'sensor/car5';
topicCar6 = 'sensor/car6';
topicCar7 = 'sensor/car7';
topicCar8 = 'sensor/car8';
topicCar9 = 'sensor/car9';
topicCar10 = 'sensor/car10';

// alert(document.location.hostname);
// if (document.location.hostname == "raceserver.local" || document.location.hostname == "note.local" || document.location.hostname == "win10-pc.local"){
//   host = document.location.hostname;
//   port = 9001;
// } else {
//   host = 'test.mosquitto.org';
//   port = 8081;  // MQTT over WebSockets, unencrypted, unauthenticated
// }

  // host = "raceserver.local";
  // port = 9001;
  host = 'test.mosquitto.org';
  port = 8081;  // MQTT over WebSockets, unencrypted, unauthenticated

username = null;
password = null;

var mqtt;
var reconnectTimeout = 2000;
function MQTTconnect() {
if (typeof path === "undefined") {
path = '/mqtt';
}
mqtt = new Paho.MQTT.Client(  host,  port,  path,  "web_" + parseInt(Math.random() * 100, 10) );
    var options = {
        timeout: 3,
        useSSL: true,
        cleanSession: true,
        onSuccess: onConnect,
        onFailure: function (message) {
            console.log("Connection failed: " + message.errorMessage + "Retrying");
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    if (username != null) {
        options.userName = username;
        options.password = password;
    }
    // console.log("Host="+ host + ", port=" + port + ", path=" + path + " TLS = " + useTLS + " username=" + username + " password=" + password);
    mqtt.connect(options);
}
function onConnect() {
    console.log('Connected to ' + host + ':' + port + path);
    // Connection succeeded; subscribe to our topic

    // MQTT has three QoS (quality of service) options:
    // 0 (at most once delivery),
    // 1 (at least once delivery),
    // 2 (exactly-once delivery).

    mqtt.subscribe(topicLapCounter, {qos: 0});
    mqtt.subscribe(topicRaceEvents, {qos: 0});
    mqtt.subscribe(topicOnlineCars, {qos: 0});
    mqtt.subscribe(topicOnlineCockpits, {qos: 0});
    mqtt.subscribe(topicOnlinePlayers, {qos: 0});
    mqtt.subscribe(topicCar1, {qos: 2});
    mqtt.subscribe(topicCar2, {qos: 2});
    mqtt.subscribe(topicCar3, {qos: 2});
    mqtt.subscribe(topicCar4, {qos: 2});
    mqtt.subscribe(topicCar5, {qos: 2});
    mqtt.subscribe(topicCar6, {qos: 2});
    mqtt.subscribe(topicCar7, {qos: 2});
    mqtt.subscribe(topicCar8, {qos: 2});
    mqtt.subscribe(topicCar9, {qos: 2});
    mqtt.subscribe(topicCar10, {qos: 2});

    //let them know you're online
    var online_cockpit_check = setInterval(function() {
      mqtt.send(topicRaceEvents, "online_check");
    }, 200);
    var online_timer = setInterval(function() {
      mqtt.send(topicUpdateCockpits, JSON.stringify(window.onlinePlayers));
    }, 2000);
    create_objects();

}
function onConnectionLost(responseObject) {
    setTimeout(MQTTconnect, reconnectTimeout);
    console.log("connection lost: " + responseObject.errorMessage + ". Reconnecting");
};

function onMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    if (payload != "online_check" && topic != "online/cockpits" && topic != "lap/counter"){
          // console.log(topic, JSON.parse(payload));
          // console.log(message);
    }
    //
    // //to console log object, we cannot use console.log("Object gandalf: " + gandalf);
    // console.log("Object gandalf: ");
    // //this will show object gandalf ONLY in Google Chrome NOT in IE
    // console.dir(payload);
    // console.log("object: %O", payload);
    // //this will show object gandalf IN ALL BROWSERS! with beautiful indent
    // console.log(JSON.stringify(payload, null, 4));
    // console.log(JSON.parse(bla));
    var topicName = topic.split("/");
    var payloadName = payload.split("/");


    switch (topicName[0]) {
        case "online":
          if (topicName[1] === "cars"){
            onlineCar(payload);
          }
          if (topicName[1] === "cockpits") {
            // onlineCockpit(payload);
          }

        break;
        case "sensor":
          var pl = JSON.stringify(payload);
          sensorRGB(pl, topicName[1]);
        break;
    }
};

$(document).ready(function() {
    MQTTconnect();
});

</script>

<script type="text/javascript" src="js/stopwatch.js"></script>
<script type="text/javascript">
  function updatedisplay(watch){ $("#stopWatch").html(watch.toString()); }
  var w = new Stopwatch(updatedisplay, 1); // 1 millisecond updates
</script>

</html>
