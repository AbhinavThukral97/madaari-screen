var avatars = [
  "Expression",
  "Stick Figure",
  "AstroKitty",
  "C and H",
  "Jess and Jack",
  "Penguin"
];
var actions = [
  ["Happy", "Sad", "Surprised", "Angry"],
  ["Walk", "Run", "Jump"],
  [
    "Celebration",
    "Cool",
    "Crying",
    "Hungry",
    "Laughing",
    "Quiet",
    "Relaxed",
    "Scared",
    "Shocked",
    "Sick",
    "Singing",
    "Sleeping",
    "Upset",
    "Wink"
  ],
  [
    "Angry",
    "Confused",
    "Crying",
    "Disbelief",
    "Happy",
    "High Five",
    "Proud",
    "Scared",
    "Sleepy",
    "Straight Face",
    "Stressed",
    "Thinking"
  ],
  [
    "Angry",
    "Confused",
    "Cautious",
    "Depressed",
    "Happy",
    "Cunning",
    "Laughing",
    "Mad",
    "Playing",
    "Please"
  ],
  [
    "Chilling",
    "Crying",
    "Dancing",
    "Dizzy",
    "In Love",
    "Money",
    "Relaxing",
    "Scared",
    "Thinking",
    "Waving",
    "Wink"
  ]
];

var stickers = ["AstroKitty", "C and H", "Jess and Jack", "Penguin"];

/* Expression */
var mouth = Snap("#mouth");
var mouthPath = mouth.path("M 0 0 q 30 00 60 0");
mouthPath.attr({
  fill: "#FFF",
  stroke: "#FFF",
  strokeWidth: 0
});

function expressionHappy() {
  mouthPath.animate({ d: "M 0 0 q 30 40 60 0" }, 500);
  $(".brow-left").css("top", "8%");
  $(".brow-left").css("transform", "rotate(-10deg)");
  $(".brow-right").css("top", "8%");
  $(".brow-right").css("transform", "rotate(10deg)");
}

function expressionSad() {
  mouthPath.animate({ d: "M 0 20 q 30 -40 60 0" }, 500);
  $(".brow-left").css("top", "10%");
  $(".brow-left").css("transform", "rotate(-10deg)");
  $(".brow-right").css("top", "10%");
  $(".brow-right").css("transform", "rotate(10deg)");
}

function expressionSurprise() {
  mouthPath.animate({ d: "M 10 0 q 20 60 40 0" }, 500);
  $(".brow-left").css("top", "1%");
  $(".brow-left").css("transform", "rotate(-20deg)");
  $(".brow-right").css("top", "1%");
  $(".brow-right").css("transform", "rotate(20deg)");
}

function expressionAngry() {
  mouthPath.animate({ d: "M 0 20 q 30 -40 60 0" }, 500);
  $(".brow-left").css("top", "15%");
  $(".brow-left").css("transform", "rotate(15deg)");
  $(".brow-right").css("top", "15%");
  $(".brow-right").css("transform", "rotate(-15deg)");
}

function stickFigureWalk() {
  $(".stick-figure").css("display", "none");
  $(".walking").css("display", "block");
}

function stickFigureRun() {
  $(".stick-figure").css("display", "none");
  $(".running").css("display", "block");
}

function stickFigureJump() {
  $(".stick-figure").css("display", "none");
  $(".jumping").css("display", "block");
}

function selectSticker(pack, sticker) {
  $("img.stickers").attr("src", `/madaari-screen/img/${pack}/${sticker}.jpeg`);
}

function selectAvatar(name) {
  let index = avatars.indexOf(name);
  if (index > -1) {
    if (name == "Expression") {
      $(".animation-avatar").css("display", "none");
      $(".animation-expression").css("display", "block");
      expressionHappy();
    } else if (name == "Stick Figure") {
      $(".animation-avatar").css("display", "none");
      $(".animation-stick-figure").css("display", "block");
      stickFigureWalk();
    } else if (stickers.indexOf(name) > -1) {
      $(".animation-avatar").css("display", "none");
      $(".stickers").css("display", "block");
      selectSticker(name, actions[index][0]);
    }
  }
}

function selectAction(avatar, action) {
  let index = avatars.indexOf(avatar);
  if (index > -1) {
    let actionInd = actions[index].indexOf(action);
    if (actionInd > -1) {
      selectAvatar(avatar);
      let projectionScreen = [avatar, action];
      ref.child("projection").set(projectionScreen);
      if (avatar == "Expression") {
        if (action == "Happy") {
          expressionHappy();
        } else if (action == "Sad") {
          expressionSad();
        } else if (action == "Surprised") {
          expressionSurprise();
        } else if (action == "Angry") {
          expressionAngry();
        }
      } else if (avatar == "Stick Figure") {
        if (action == "Walk") {
          stickFigureWalk();
        } else if (action == "Run") {
          stickFigureRun();
        } else if (action == "Jump") {
          stickFigureJump();
        } else if (stickers.indexOf(avatar) > -1) {
          selectSticker(avatar, action);
        }
      }
    }
  }
}

$(document).ready(function() {
  $(".run button").click(function() {
    $(".run").css("display", "none");
  });
});
