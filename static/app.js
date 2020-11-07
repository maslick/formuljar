// API_URL: %API_URL%
// PUBLIC_KEY: %PUBLIC_KEY%

function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

document.addEventListener('DOMContentLoaded', () => {
  const name = randomName();
  document.getElementById("name").value = name;
  document.getElementById("email").value = randomEmail(name);
  document.getElementById("phone").value = randomPhone();
  document.getElementById("message").value = randomFromArray(DATA.message);
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