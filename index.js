// const images = ['fox1','fox2','fox3','fox4'];
// const imgElem = document.querySelector('img');

// function randomValueFromArray(array) {
//   let randomNo =  Math.floor(Math.random() * array.length);
//   return array[randomNo];
// }

// setInterval(function() {
//   let randomChoice = randomValueFromArray(images);
//   imgElem.src = 'images/' + randomChoice + '.jpg';
// }, 2000)

// Register service worker to control making site work offline


var template = "<article>\n\
	// <img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
	<h3>#POS. NAME</h3>\n\
	<ul>\n\
	<li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
	<li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
	<li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
	<li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
	<li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
	</ul>\n\
</article>";

var content = '';
for (var i = 0; i < games.length; i++) {
  var entry = template.replace(/SLUG/g, games[i].slug)
  // .replace(/POS/g, (i + 1))
		.replace(/NAME/g, games[i].name)
		.replace(/AUTHOR/g, games[i].author)
		// .replace(/TWITTER/g, games[i].twitter)
		// .replace(/WEBSITE/g, games[i].website)
		// .replace(/GITHUB/g, games[i].github);
	entry = entry.replace('<a href=\'http:///\'></a>', '-');
	content += entry;
};
document.getElementById('content').innerHTML = content;

// // Registering Service Worker
// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('sw.js');
// };

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function (e) {
	Notification.requestPermission().then(function (result) {
		if (result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random() * games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = 'Created by ' + games[randomItem].author + '.';
	var notifImg = 'data/img/' + games[randomItem].slug + '.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 60000);
};









if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'block';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  e.prompt();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'block';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
