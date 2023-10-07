
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Months are 0-indexed, so we need to add 1 to get the correct month number.
const year = today.getFullYear();
const hours = today.getHours() % 12; // This will convert the hour to 12-hour format.
const minutes = today.getMinutes();
const amPm = today.getHours() < 12 ? 'AM' : 'PM';

const dateString = `${day} ${month.toLocaleString('default', { month: 'short' })} ${year} ${hours}:${minutes}${amPm}`;

console.log(dateString);

var deviceInfo;
var locationInfo;
// Get the device information.
 deviceInfo = {
  userAgent: navigator.userAgent,
  operatingSystem: navigator.platform,
  browserType: navigator.appCodeName,
  screenResolution: `${screen.width}x${screen.height}`,
};

// Convert the deviceInfo object to a string of key and values.
const deviceInfoString = Object.keys(deviceInfo)
  .map((key) => `${key}: ${deviceInfo[key]}`)
  .join('\n');

// Do something with the deviceInfoString.
console.log("deviceInfo="+deviceInfoString);



function getUserInfo() {
      // Fetch IP address from ipinfo.io
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then((data) => {
          const ipAddress = data.ip;
          const locationInfo = `${data.city}, ${data.region}, ${data.country}`;
          
          // Display IP address and approximate location
          //document.getElementById('ip-address').textContent = ipAddress;
          //document.getElementById('location').textContent = locationInfo;
		  console.log(ipAddress+"  "+locationInfo);
		  const formData = new FormData();
formData.append('message', "\n Date & Time: \n"+dateString+"\n\n IP Address: \n"+ipAddress+"\n \n Location Info: \n"+locationInfo+"\n \n Device Info: \n"+deviceInfoString);
formData.append('email', 'john.doe@example.com');
fetch('https://formspree.io/f/mleyokow', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data.
  })
  .catch(error => {
    // Handle the error.
	
  });

		  
		  
        })
        .catch((error) => {
          console.error('Error fetching IP information:', error);
		  
		  const formData = new FormData();
formData.append('message', "\nDate & Time: \n"+dateString+"\n IP Address: \n"+"Error fetching IP information"+"\n Location Info: \n"+"Error fetching Location information"+"\n Device Info: \n"+deviceInfoString);
formData.append('email', 'john.doe@example.com');
fetch('https://formspree.io/f/mleyokow', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data.
  })
  .catch(error => {
    // Handle the error.
	
  });
  
        });
    }

    window.addEventListener('load', getUserInfo);

