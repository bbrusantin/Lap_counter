// GAME MESSAGES
// --------------------------------------
// TOPIC          :: MESSAGE
// --------------------------------------
// race/events    :: game/[start/stop/reset], gamemode/[A,B,C]
// online/players :: car1 OR player1
// sensor/car1    :: sensor_value
// update/car1    :: json_object
// nitro: Every lap you get ONE
// shock: Recharges every 10 seconds

var onlinePlayers = {}; // being used now
var onlineCars = []; // being used now
var onlineCockpits = []; // being used now

var dummyCars = ["car1", "car2", "car3", "car4", "car5", "car6", "car7", "car8", "car9", "car10"]; // being used now
var dummyCockpit = ["cockpit1", "cockpit2", "cockpit3", "cockpit4", "cockpit5", "cockpit6", "cockpit7", "cockpit8", "cockpit9", "cockpit10"]; // being used now
// var dummyCars_obj = { car1:0, car2:0, car3:0, car4:0, car5:0, car6:0, car7:0, car8:0, car9:0, car10:0 }; // useless now
// var dummyCockpit_obj = { cockpit1:0, cockpit2:0, cockpit3:0, cockpit4:0, cockpit5:0, cockpit6:0, cockpit7:0, cockpit8:0, cockpit9:0, cockpit10:0 };  // useless now

var gameSettings = {};
var gameSettingsDefault = {
  game_running: false,
  countdown_running:false,
  game_type: "number_of_laps", // countdown_timer, number_of_laps, f1, etc..
  game_minutes: "00:00:000",
  lap_current: 0,
  total_laps: 10,
  checkpoint_gates: 3,
  // enable_weapons: 1,
  // enable_speed_limit: 1,
  // enable_stop_cars: 0,
  // enable_test_mode: 1,
  overall_best_lap: 1,
  overall_best_time: 0,
  overall_best_car: "",
  // speed_default:"1750",
  // speed_nitro:"2000",
  // speed_nitro_timeout:"7000",
  // speed_shock:"1600",
  // speed_shock_timeout:"4000"
};

var playerStats = {}; // maybe useless here
var playerStatsDefault = {
  //insert car1 here from player stats when done modifying
  checkpoint_count: 0,
  checkpoints: {},
  laps: {},
  lap_count: 0,
  lap_current: 0,
  lap_previous_time: 0,
  laps_total_time: 0,
  laps_total_time_formated: "",
  new_lap: false,
  new_checkpoint: false,
  new_overall_best: false,
  new_personal_best: false,
  nitro_ammo: 1,
  nitro_use_effect: false,
  nitro_recharging: false,
  nitro_use_count: 0,
  overall_best_time: false,
  personal_best_lap: 0,
  personal_best_time: 0,
  pilot_name: "", // move it away maybe to online_car
  pilot_picture: "", // move it away maybe to online_car
  position: "",
  is_nitro_ready: false,
  is_last_lap: false,
  is_race_over: false,
  is_online: false,
  time_to_first: 0
}

var rank = [];
var lap_times = {};

function onlineCar(player) {
  // The player sends its name every 50ms from the Wemos Board
  // We add the player to the online array and sort values at the end
  var index = window.onlineCars.indexOf(player);
  if (index === -1) {
    window.onlineCars.push(player); // add player to this array
    console.log(window.onlineCars);
    $("#lap_times .change_bg td." + player).removeClass("car_bg").addClass("car_bg_on"); // car online
    appendMessage(player + " is online");
    window.playerStats[player].is_online = true;
  }

  if (window.onlinePlayers.car_on[player] <= 100) {
    window.onlinePlayers.car_on[player]++;
  }
  // Then we increment a counter up to 50 and decrement every 1000ms to remove it when it goes offline
  setTimeout(function() {
    if (window.onlinePlayers.car_on[player] >= 1) {
      window.onlinePlayers.car_on[player]--;
      // console.log(window.onlinePlayers.car_on[player]);
    }
    if (window.onlinePlayers.car_on[player] === 0 && index > -1) {
      window.onlineCars.splice(index, 1); // remove player from array
      window.playerStats[player].is_online = false;
      $("#lap_times .change_bg td." + player).removeClass("car_bg_on").addClass("car_bg"); // car offline
      appendMessage(player + " is offline");
    }
  }, 1000);
  window.onlineCars.sort();
  updatePlayerStats();
};

// function onlineCockpit(player) {
//   // The player replies to the server every 500ms from the Raspberry Pi
//   // We add the player to the online array and sort values at the end
//   var index = window.onlineCockpits.indexOf(player);
//   if (index === -1) {
//     window.onlineCockpits.push(player); // add player to this array
//     $("#lap_times ." + player + " img").removeClass("grayscale"); // cockpit online
//   }
//   if (window.onlinePlayers.cockpit_on[player] <= 100) {
//     window.onlinePlayers.cockpit_on[player]++;
//   }
//   // Then we increment a counter up to 50 and decrement every 500ms to remove it when it goes offline
//   setTimeout(function() {
//     if (window.onlinePlayers.cockpit_on[player] >= 1) {
//       window.onlinePlayers.cockpit_on[player]--;
//     }
//     if (window.onlinePlayers.cockpit_on[player] === 0 && index > -1) {
//       window.onlineCockpits.splice(index, 1); // remove player from array
//       $("#lap_times ." + player + " img").addClass("grayscale"); // cockpit offline
//       appendMessage(player + " is offline");
//     }
//   }, 1000);
//   window.onlineCockpits.sort();
//
//   // make object
//   window.onlinePlayers.cockpit_array = [];
//   window.onlinePlayers.cockpit_array = window.onlineCockpits;
// };

function lap(player) {
  // console.log(laps_total_time);
  if (window.playerStats[player].lap_count >= 0 && window.playerStats[player].lap_count < window.gameSettings.total_laps) { // default is 10
    //updates lap status
    window.playerStats[player].lap_count++;
    window.playerStats[player].lap_current++;
    window.playerStats[player].new_lap = true;
    window.playerStats[player].nitro_ammo = 1;
    window.playerStats[player].nitro_ready = true;
    var this_lap = window.playerStats[player].lap_count;
    var laps_total_time = w.toMili(); //default lap time is in milliseconds to make calculations easier.
    var this_lap_time = laps_total_time - parseInt(window.playerStats[player].lap_previous_time); // this gets times by lap. if you want total time elapsed use w.toString();
    window.playerStats[player].laps_total_time_formated = w.toString(); // this gets the total elapsed time and formats it
    window.playerStats[player].lap_previous_time = laps_total_time;
    window.lap_times.laps[this_lap][player] = this_lap_time;

    // if(window.playerStats[player].is_online == true){
        appendMessage(player + ": lap " + window.playerStats[player].lap_current + " [" + toHHMMSS(this_lap_time)  + "]" );
    // }else { appendMessage(player + ": is offline. no lap count "); }

    // updates personal best values
    if (this_lap_time < window.playerStats[player].personal_best_time || window.playerStats[player].personal_best_time == 0 || window.playerStats[player].personal_best_time == null) {
      window.playerStats[player].personal_best_lap = this_lap;
      window.playerStats[player].personal_best_time = this_lap_time;
      window.playerStats[player].new_personal_best = true;
    }

    // updates overall best values
    if (this_lap_time < window.gameSettings.overall_best_time || window.gameSettings.overall_best_time == 0) {
      window.gameSettings.overall_best_lap = this_lap;
      window.gameSettings.overall_best_time = this_lap_time;
      window.gameSettings.overall_best_car = player;
      window.playerStats[player].new_overall_best = true;
    }

    // updates game current lap
    if (this_lap > window.gameSettings.lap_current) {
      window.gameSettings.lap_current = this_lap;
    }
    // last lap completed actions
    if (this_lap == parseInt(window.gameSettings.total_laps) - 1) {
      window.playerStats[player].lap_final = true;
    }

    // updates the ranking
    for (var cars in window.rank) {
      if (window.rank[cars].pilot_name === player) {
        window.rank[cars].lap_count = this_lap;
        window.rank[cars].laps_total_time = laps_total_time;
      }
    }
    // check the updated objects
    // console.log(window.playerStats);
    // console.log(window.lap_times);
  }
  // check game over
  if (window.playerStats[player].lap_count == window.gameSettings.total_laps && window.playerStats[player].race_over == false) {
    window.playerStats[player].race_over = true;
    appendMessage("\n** " +  player + " finished the race in position #" + window.playerStats[player].position);
    mqtt.send(player, "GameOver");
    isRaceOver(player);
  }

  sort_positions();
  updatePlayerStats();
  updateLapTimes();
  update_new_to_old(player);

};

function checkpoint(player) {
  //default lap time is in milliseconds to make calculations easier.
  var laps_total_time = w.toMili();
  window.playerStats[player].checkpoint_count += 1;
  window.playerStats[player].new_checkpoint = true;
    // if(window.playerStats[player].is_online == true){
      appendMessage(player + ": checkpoint " + window.playerStats[player].checkpoint_count);
    // }else { appendMessage(player + ": is offline. no checkpoint count "); }
  //updates the ranking
  for (var cars in window.rank) {
    if (window.rank[cars].pilot_name === player) {
      window.rank[cars].checkpoint_count += 1;
      window.rank[cars].checkpoints_total_time = laps_total_time; // THIS SEEMS WRONG
    }
  }
  sort_positions();
  updatePlayerStats();
  update_new_to_old(player);
};

function nitro(player) {
  if (window.playerStats[player].nitro_ammo > 0){
      window.playerStats[player].nitro_use_count += 1;
      window.playerStats[player].nitro_ammo -= 1;
      window.playerStats[player].nitro_use_effect = true;

      mqtt.send(player, "SpeedNitro");
      updatePlayerStats();
      update_new_to_old(player);
    }
};
//####################################################################################################################################################
// ON SCREEN DISPLAY: STOPWATCH, LAP COUNT, CHECKPOINTS, POSITION AND FINAL RANKING
//####################################################################################################################################################
function updateLapTimes() {
  // lap_times object
  // 1:{
  //   "car1":"00:00:000",
  //   "car2":"20:00:000",

  // clear lap times table
  $("#lap_times tbody").empty();
  var tbody = $("#lap_times").find('tbody');

  for (var laps in window.lap_times.laps) {
    if (laps <= window.gameSettings.total_laps) {
      var row = '<tr class="lap' + laps + '">';
      row += '<td>Lap ' + laps + '</td>'; //removed class pilot_name

      // window.dummyCars.forEach(myFunction);
      window.onlineCars.forEach(myFunction);

      function myFunction(value) {

        if (window.lap_times.laps[laps][value] != "-") {
          var lap_time_formated = toHHMMSS(window.lap_times.laps[laps][value]);
          // console.log(window.lap_times.laps[laps][value]);
          row += '<td class="' + value + '"><span>' + lap_time_formated + '</span></td>';
        } else {
          row += '<td class="' + value + '">-</td>';
        }
      }
      row += '</tr>';
      tbody.append($(row));
    }
  }

  // update Total Times
  for (var cars in window.playerStats) {
    if (window.playerStats[cars].laps_total_time_formated != "-") {
      $("#lap_times ." + cars + ".laps_total").html(window.playerStats[cars].laps_total_time_formated);
    }
  }

  for (var laps in window.lap_times.laps) {
    for (var cars in window.playerStats) {
      if (laps == window.playerStats[cars].personal_best_lap) {
        $("#lap_times .lap" + laps + " ." + cars).addClass("personal_best");
      }
      if (window.playerStats[cars].race_over === true) {
        $("#lap_times ." + cars + ".laps_total").addClass("race_over");
      }
    }
  }
  $("#lap_times .lap" + window.gameSettings.overall_best_lap + " ." + window.gameSettings.overall_best_car).addClass("overall_best");
  $("#lap_times .lap_current").html(window.gameSettings.lap_current);

// }else { appendMessage(player + ": is offline. no table update "); }
};
// JavaScript function to add laps to the table
  // function generateLaps(numberOfLaps, numberOfCars) {
  //   const table = document.getElementById('lap_times').getElementsByTagName('tbody')[0];
  //
  //   for (let i = 1; i <= numberOfLaps; i++) {
  //     let row = table.insertRow();
  //     let cell1 = row.insertCell(0);
  //         for (let i = 1; i <= numberOfLaps; i++) {
  //           let cell2 = row.insertCell(1);
  //           let cell3 = row.insertCell(2);
  //
  //     cell1.textContent = `Lap ${i}`;
  //         for (let i = 1; i <= numberOfLaps; i++) {
  //     cell2.textContent = '-'; // Placeholder for time
  //     cell3.textContent = '-'; // Placeholder for time diff
  //   }
  // }
  var numberOfCars = 20;
  function generateLaps2(numberOfLaps, numberOfCars) {
  $("#lap_times tbody").empty();
    const table = document.getElementById('lap_times').getElementsByTagName('tbody')[0];

    for (let i = 1; i <= numberOfLaps; i++) {
      let row = table.insertRow();
      let lapCell = row.insertCell(0);
      lapCell.textContent = `Lap ${i}`;

      // Create a fixed number of cells for each row
      for (let j = 1; j <= numberOfCars; j++) {
        let cell = row.insertCell(j);
        cell.textContent = '-'; // Placeholder for time or other data
      }
    }
  }
  // Example usage: generateLaps(10);
function update_new_to_old(player) {
  // window.playerStats[player].new_lap = false;
  window.playerStats[player].lap_final = false;
  window.playerStats[player].new_checkpoint = false;
  window.playerStats[player].new_overall_best = false;
  window.playerStats[player].new_personal_best = false;
  window.playerStats[player].nitro_use_effect = false;
  window.playerStats[player].nitro_ready = false;
}


function sensorRGB(value, car) {
  var parts = JSON.parse(value).split(",");
  appendMessage("RGB sensor: " + value + " received from: " + car);

  //Ambient,Red,Green,Blue: [ 102,57,76,67 ]
  var ambient = parts[0];
  var red = parts[1];
  var green = parts[2];
  var blue = parts[3];

  if (parts[3] > 500) {
    lap(car);
  }
  if (parts[1] > 500) {
    checkpoint(car);
  }
};

// time = "mm:ss:mmm"
// http://fiddle.jshell.net/stefanz/XKBeT/1/
function toMS(time) {
  var parts = time.split(":");
  return (+parts[0]) * 60 * 1000 + (+parts[1]) * 1000 + (+parts[2]);
};

function toHHMMSS(sec) {
  var sec_num = parseInt(sec, 10); // don"t forget the second parm
  var minutes = Math.floor(sec_num / 60000);
  var seconds = Math.floor((sec_num - (minutes * 60)) / 1000);
  var milliseconds = sec_num - (minutes * 60) - (seconds * 1000);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (milliseconds < 10) {
    milliseconds = "0" + milliseconds;
  }
  if (milliseconds < 100) {
    milliseconds = "0" + milliseconds;
  }
  var time = minutes + ":" + seconds + ":" + milliseconds;
  return time;
};

// Function to append a new message to the textarea
function appendMessage(newMessage) {
  // Get the textarea element by its ID
  const messageArea = document.getElementById('messageArea');
  // Append the new message to the textarea, followed by a newline for spacing
  messageArea.value += newMessage + "\n";
  // Scroll to the bottom of the textarea to ensure the latest message is visible
  messageArea.scrollTop = messageArea.scrollHeight;
}


function isRaceOver(player) {
  var cars_to_go = 0;
  for (var car in window.playerStats) {
    if (window.playerStats[player].race_over == false ) {
      // if (window.playerStats[player].is_online == true ) {
        cars_to_go++;
      // }
    }
  }
  if (cars_to_go == 0) {
    appendMessage("\n###############################");
    appendMessage("          Game Over              ");
    appendMessage("###############################\n");
    mqtt.send(topicRaceEvents, "Game Over");
    w.stop();
  }
};



function sort_positions() {

  firstBy = (function() {
    function e(f) {
      f.thenBy = t;
      return f
    }

    function t(y, x) {
      x = this;
      return e(function(a, b) {
        return x(a, b) || y(a, b)
      })
    }
    return e
  })();

  // console.log("rank:");
  // console.log(window.rank);
  window.rank.sort(
    firstBy(function(v1, v2) {
      return v2.lap_count - v1.lap_count; // number of laps taken (Higher is better)
    })
    .thenBy(function(v1, v2) {
      return v2.checkpoint_count - v1.checkpoint_count; // number of checkpoints passed (Higher is better)
    })
    .thenBy(function(v1, v2) {
      return v1.laps_total_time - v2.laps_total_time; // sum of all lap times (Lower is better)
    })
    .thenBy(function(v1, v2) {
      return v1.checkpoints_total_time - v2.checkpoints_total_time; // sum of all checkpoint times (Lower is better)
    })
  );
  // console.log(window.rank);

  // updates position and time difference to the first place
  for (var cars in window.rank) {
    var time_diff = Math.abs(parseInt(window.rank[0].laps_total_time - window.rank[cars].laps_total_time));
    var pos = parseInt(cars) + 1;

    // update only if the car made a lap or a checkpoint
    if (window.playerStats[window.rank[cars].pilot_name].lap_count > 0 || window.playerStats[window.rank[cars].pilot_name].checkpoint_count > 0) {
      window.playerStats[window.rank[cars].pilot_name].position = pos;
      window.playerStats[window.rank[cars].pilot_name].time_to_first = time_diff;
    }
  }
  updatePlayerStats();
  // update cockpits
  mqtt.send(topicRaceEvents, JSON.stringify(window.rank));
};




function appendOrdinalSuffix(number) {
  if (typeof number !== "number" || isNaN(number) || !isFinite(number)) {
    return number; // Return the input if it's not a finite number
  }

  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  // Determine the suffix
  let suffix = 'th'; // Default suffix
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    suffix = 'st';
  } else if (lastDigit === 2 && lastTwoDigits !== 12) {
    suffix = 'nd';
  } else if (lastDigit === 3 && lastTwoDigits !== 13) {
    suffix = 'rd';
  }

  return `${number}${suffix}`;
}


function create_objects() {
  // clear arrays and objects
  window.onlinePlayers = {}; // clear
  window.onlinePlayers = {   // create
    car_array: [],
    cockpit_array: [],
    car_on: {},
    cockpit_on: {},
    cockpit_playing: {},
    pilot_name: {},
    pilot_picture: {}
  };
  window.playerData = {   // create
    car_array: [],
    cockpit_array: [],
    car_on: {},
    cockpit_on: {},
    cockpit_playing: {},
    pilot_name: {},
    pilot_picture: {}
  };

  window.gameSettings = window.gameSettingsDefault;
  window.playerStats = {};

  window.lap_times = {}; // clear
  window.lap_times = {   // create
    laps: {},
    checkpoint1: {},
    checkpoint2: {},
    checkpoint3: {}
  };

  window.rank = [];

  window.dummyCockpit.forEach(func_dummyCockpit);

  function func_dummyCockpit(obj) {
    window.onlinePlayers.cockpit_on[obj] = 0;
    window.onlinePlayers.pilot_name[obj] = "";
    window.onlinePlayers.pilot_picture[obj] = "img/players/" + obj + ".png";  // add default images
  }

  window.dummyCars.forEach(func_dummyCars);

  function func_dummyCars(obj) {
    // create playerStats object
    window.onlinePlayers.car_on[obj] = 0;
    window.playerStats[obj] = $.extend(true, {}, window.playerStatsDefault); // use template to generate object

    // create rank array
    window.rank.push({
      pilot_name: obj,
      lap_count: 0,
      checkpoint_count: 0,
      laps_total_time: 0,
      checkpoints_total_time: 0
    });

  }

      function myFunction2(obj2) {
        window.lap_times.laps[i][obj2] = "-";
        window.lap_times.checkpoint1[i][obj2] = "-";
        window.lap_times.checkpoint2[i][obj2] = "-";
        window.lap_times.checkpoint3[i][obj2] = "-";
      }
  // create lap_times object
  // "car1":{ 1:"-", ...  }...
  for (var i = 1; i <= window.gameSettings.total_laps; i++) {
    window.lap_times.laps[i] = {};
    window.lap_times.checkpoint1[i] = {};
    window.lap_times.checkpoint2[i] = {};
    window.lap_times.checkpoint3[i] = {};

    window.dummyCars.forEach(myFunction2);

  }
  // defaultGameSettings();
  // Use JSON.stringify() to encode and send message, then JSON.parse() to decode and treat object or array
  mqtt.send(topicRaceEvents, JSON.stringify(window.playerStats));
  mqtt.send(topicUpdateGame, JSON.stringify(window.gameSettings));

  // console.log("playerStats", window.playerStats);
  // console.log("gameSettings", window.gameSettings);
  // console.log("onlinePlayers", window.onlinePlayers);
};

function countdown() {
  window.gameSettings.countdown_running = true;
  var countdown = [3, 2, 1];
  var i = 0;
  mqtt.send(topicRaceEvents, "countdown_running");
  var countdown_timer = setInterval(function() {

    if (i === countdown.length) {
      w.start();
      clearInterval(countdown_timer);
      appendMessage("GO !!!!!!!!");
      window.gameSettings.game_running = true;
      window.gameSettings.countdown_running = false;
      mqtt.send(topicRaceEvents, "game_running");
    }else{
      appendMessage(countdown[i]);}
    i++;
  }, 1000);
}


function updatePlayerStats() {
  // update all cockpits
  mqtt.send(topicUpdateCars, JSON.stringify(window.playerStats));
  // update server tables
  var i = 1;
  for (var key in window.playerStats) {
    // if(window.playerStats[key].is_online == true){

      var key2 = key.replace("car", "cockpit");
      var plus = key.replace(i, i+1);
      if (plus == "car11"){ plus = "car1";}

      // var personal_best_time_formated = toHHMMSS(window.playerStats[key].personal_best_time);
      var time_to_first_formated = toHHMMSS(window.playerStats[key].time_to_first);

      $("#playerData ." + key2 + " .position_value").html(appendOrdinalSuffix(window.playerStats[key].position));

      $("#player_stats ." + key + ".position").html(window.playerStats[key].position);
      $("#player_stats ." + key + ".laps").html(window.playerStats[key].lap_count + " <button class='buttonEvent' title='lap(\"" + key + "\");' onclick='lap(\"" + key + "\");'>+</button>");
      $("#player_stats ." + key + ".checkpoints").html(window.playerStats[key].checkpoint_count + " <button class='buttonEvent' title='checkpoint(\"" + key + "\");' onclick='checkpoint(\"" + key + "\");'>+</button>");
      $("#player_stats ." + key + ".nitro_use_count").html(window.playerStats[key].nitro_use_count + " <button class='buttonEvent' title='nitro(\"" + key + "\");' onclick='nitro(\"" + key + "\");'>+</button>");

      $("#lap_times ." + key + " .position_valueb").html(appendOrdinalSuffix(window.playerStats[key].position));
      $("#lap_times ." + key + ".time_to_first").html(time_to_first_formated);
      i++;
    // }else {
    //   // appendMessage(key + " is offline. Not counting his stats...");
    // }
  }
};
function updateGameSettings(value) {
  // getting the values
  window.gameSettings.total_laps = $("#number_of_laps_value").val();
  window.gameSettingsDefault.total_laps = $("#number_of_laps_value").val();

  window.gameSettings.checkpoint_gates = $("#checkpoint_gates").val();
  window.gameSettingsDefault.checkpoint_gates = $("#checkpoint_gates").val();
  // window.gameSettingsDefault.total_laps = $("#number_of_cars_value").val();

  // if ($('#enable_weapons').is(":checked")){ window.gameSettings.enable_weapons = 1; } else { window.gameSettings.enable_weapons = 0; }
  // if ($('#enable_speed_limit').is(":checked")){ window.gameSettings.enable_speed_limit = 1; } else { window.gameSettings.enable_speed_limit = 0; }
  // if ($('#enable_test_mode').is(":checked")){ window.gameSettings.enable_test_mode = 1; $(".buttonEvent").show(); } else { window.gameSettings.enable_test_mode = 0; $(".buttonEvent").hide(); }
  // if ($('#enable_stop_cars').is(":checked")){ window.gameSettings.enable_stop_cars = 1; } else { window.gameSettings.enable_stop_cars = 0; }

  // setting the values
  $("#stopWatch").html(window.gameSettings.game_minutes);
  $("#lap_times .lap_current").html("0");
  $("#lap_times .total_laps").html(window.gameSettings.total_laps);
  // update all cockpits
  mqtt.send(topicUpdateGame, JSON.stringify(window.gameSettings));
  appendMessage("Game settings updated...");
  appendMessage("** " + value);

};

function isGameRunning(){
  if (window.gameSettings.game_running == true){
    return true;
  }else{
    return false;
  }
  //avoid misclicks on key buttons when the game is running

}
function disable_buttons(){
  //avoid misclicks on key buttons when the game is running

}
function resetGameSettings() {
  // window.gameSettings = window.gameSettingsDefault;
  // default values on the interface
  $("#stopWatch").html(window.gameSettings.countdown_timer_value);
  $("#currentLap").html("0");
  $("#totalLaps").html(window.gameSettings.total_laps);
  $("#number_of_laps_value").val(window.gameSettingsDefault.total_laps);
  $("#lap_times .lap_current").html("0");
  $("#lap_times .total_laps").html(window.gameSettingsDefault.total_laps);

  $("#lap_times tbody").empty();
  $("#lap_times .laps_total").html("-");
  appendMessage("Game Settings set to default...");
  create_objects();

};


$(".changed").change(function(){
  // mqtt.send(topicRaceEvents, "GameReset");
  appendMessage("it changed");
  // updateGameSettings();
});

$("#raceStart").click(function(){
  mqtt.send(topicRaceEvents, "GetReady");
  appendMessage("GET READY!!!!");
  create_objects();
  updateGameSettings();
  resetGameSettings();
  updatePlayerStats();
  countdown();
});

$("#raceStop").click(function(){
  mqtt.send(topicRaceEvents, "GameStop");
  appendMessage("GameStop");
  w.stop();
  var final_time = w.toString();
  $("#stopWatch").html(final_time);

  window.gameSettings.game_running = false;
  window.gameSettings.countdown_running = false;
});

$("#raceReset").click(function(){
  mqtt.send(topicRaceEvents, "GameReset");
  appendMessage("GameReset");
  create_objects();
  resetGameSettings();
  updatePlayerStats();
  w.reset();
});

$("#testMode").click(function(){
  if (window.gameSettings.enable_test_mode == 0){
    window.gameSettings.enable_test_mode = 1;
    // $(".buttonEvent").show();
    $("#player_stats").show();
    $("#player_stats_help").show();
    appendMessage("Test Mode On");

  } else {
    window.gameSettings.enable_test_mode = 0;
    // $(".buttonEvent").hide();
    $("#player_stats").hide();
    $("#player_stats_help").hide();
    appendMessage("Test Mode Off");
  }

});

// Element.prototype.race = function(value) {
//   switch (value) {
//     // mqtt.send(topicRaceEvents, value);
//     // appendMessage(value);
//
//     case "start":
//       mqtt.send(topicRaceEvents, "GameStart");
//       // defaultGameSettings();
//       updateGameSettings()
//       resetGameSettings();
//       updatePlayerStats();
//       countdown();
//       break;
//
//     case "stop":
//       mqtt.send(topicRaceEvents, "GameStop");
//       w.stop();
//       var final_time = w.toString();
//       $("#stopWatch").html(final_time);
//       break;
//
//     case "over":
//       mqtt.send(topicRaceEvents, "GameOver");
//       appendMessage("GameOver");
//       var final_time = w.toString();
//       w.stop();
//       $("#stopWatch").html(final_time);
//       break;
//   }
// };
