// API_URL: %API_URL%
// PUBLIC_KEY: %PUBLIC_KEY%

document.addEventListener('DOMContentLoaded', () => {
  randomizeForm();
  document.getElementById("reset").onclick = ev => {
    onReset(ev);
    randomizeForm();
    clearStatus();
  }
}, false);

const DATA = {
  names: [
    "Sponge Bob", "Bugs Bunny", "Scooby Doo", "Tom Cat", "Jerry Mouse", "Daffy Duck", "Mickey Mouse",
    "Donald Duck", "Homer Simpson", "Spider Man", "Woody Woodpecker", "Fred Flinstone", "Bart Simpson",
    "Bat Man", "Pink Panther", "Stewie Griffin", "Porky Pig", "Patrick Star", "Yogi Bear", "Squidwart Tentacles",
    "Buzz Lightyear", "Scrooge McDuck", "Chip Dale", "Peter Griffin", "Garfield Cat", "Brian Griffin",
    "Lisa Simpson", "Barney Rubble", "Maggie Simpson", "Pluto Dog", "Kermit Frog", "Papa Smurf", "Marge Simpson",
    "Tommy Pickles", "Optimus Prime", "Casper Ghost", "Super Man", "Mr Krabs", "Bullwinkle Moose", "Iron Man",
    "Lola Bunny", "Kenny McCormick", "Sandy Cheeks", "Alvin Seville", "Lilo Pelekai", "Johnny Bravo",
    "Captain Hook", "Inspector Gadget", "Butters Stotch", "Mighty Mouse", "Darkwing Duck", "Felix Cat",
    "Kim Possible", "Snow White", "Rocky Squirrel", "Droopy Dog", "George Jetson", "Minnie Mouse"
  ],
  message: [
    "Hello there, I found your contact info on google.com and wanted to reconnect.",
    "Hi there. Count me in!",
    "Hey, didn't mean to bother you, but I really love what you guyz are doing! Thank you!",
    "Looking forward to our cooperation!",
    "Sorry, do you have any space left?",
    "Do you ship to Slovenia?",
    "Where is your office located?",
    "Do you accept VISA/Mastercard?",
    "When does the next course start? Can't wait to join you!",
    "Hello, is there a way I can get my money back? Regards."
  ]
};

function onSubmit(e) {
  e.preventDefault();
  clearStatus();
  grecaptcha.ready(async () => {
    const token = await grecaptcha.execute('%PUBLIC_KEY%', {action: 'submit'});
    console.log(`token: ${token}`);
    const parsed = parseForm();

    try {
      hideForm();
      showSpinner();
      let payload = {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        message: parsed.message,
        "g-recaptcha-response": token
      };
      let response = await fetch('%API_URL%/form', {
        method: 'POST',
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json"
        },
        body: JSON.stringify(payload)
      });

      let js = await response.json();
      let status = response.status;
      hideSpinner();
      if (status === 200){
        document.getElementById("status_text").innerHTML = `
          <div style="padding: 20px 0">
            Hi <b>${js.name}!</b><br>Thank you for your request,<br>we will contact you shortly...
          </div>
          <p>
            <a href='/' class="button">Back to main page</a>
          </p>
        `;
      } else {
        document.getElementById("status_text").innerHTML = `
          <div style="padding: 20px 0">
            ${js.message}
          </div>
          <p>
            <a href='/' class="button">Try again</a>
          </p>`;
      }
    } catch (e) {
      document.getElementById("status_text").innerHTML = e.toString();
      hideSpinner();
    }
  });
}

function onReset(e) {
  e.preventDefault();
  randomizeForm();
}

function randomizeForm() {
  const name = randomName();
  document.getElementById("name").value = name;
  document.getElementById("email").value = randomEmail(name);
  document.getElementById("phone").value = randomPhone();
  document.getElementById("message").value = randomFromArray(DATA.message);
}

function parseForm() {
  const name = document.getElementById("name").value || "Jacky Chan";
  const email = document.getElementById("email").value || "jacky.chan@gmail.com";
  const phone = document.getElementById("phone").value || "+1234567890";
  const message = document.getElementById("message").value || "hello world!";
  return {name, email, phone, message};
}

function clearStatus() {
  document.getElementById("status_text").innerText = "";
}

function showSpinner() {
  document.getElementById("loader").style.display = "block";
}

function hideSpinner() {
  document.getElementById("loader").style.display = "none";
}

function randomFromArray(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomName() {
  return randomFromArray(DATA.names);
}

function randomEmail(name) {
  name = name.toLowerCase();
  name = name.replace(" ", ".")
  return `${name}@disney.com`;
}

function randomPhone() {
  return `+386${Math.floor(Math.random() * 1000000000)}`.substring(0,12);
}

function hideForm() {
  document.getElementById("demo-form").hidden = true;
}