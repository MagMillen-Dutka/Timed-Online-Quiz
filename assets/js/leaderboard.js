var scoresBtn = document.querySelector("#viewLeaderboard");

// Rank previous scores in order by retrieving scores from localStorage

function printLeaderboard() {
    var leaderboard = JSON.parse(window.localStorage.getItem("leaderboard")) || [];
    leaderboard.sort(function(a, b) {
      return b.score - a.score;
    });
    leaderboard.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("leaderboard");
      olEl.appendChild(liTag);
    });
}

// Clear previous scores when users click clear 
  function clearLeaderboard() {
    window.localStorage.removeItem("leaderboard");
    window.location.reload();
  } document.getElementById("clear").onclick = clearLeaderboard;
  
printLeaderboard();