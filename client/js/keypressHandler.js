
$('body').on('keydown', (event) => {
  // an array based on RegEx of Arrow presses is created based on keystroke
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  // console.log(arrowPress);
  if (arrowPress) {
    // the item at [0] is "ArrowDirection", [1] is "Direction"
    var direction = arrowPress[1];
    //console.log('tester:' + direction);
    SwimTeam.move(direction.toLowerCase()); // lower case for SwimTeam to work
  }
});

console.log('Client is running in the browser!');
