const COHORT = "2410-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//need to create a state to hold the parties data:

const state = {
  parties: [],
};

//Step 1: Get party data from the API using fetch.
// - create an async function

async function getParties(params) {
  try {
    const response = await fetch(API_URL); //grab API database
    const parties = await response.json(); //turn it into json because everything is a string initially
    console.log("API Response:", parties); // Log the response
    state.parties = parties; // store parties data in the state object
  } catch (error) {
    console.log(error);
  }
}

function renderParties() {
  // TODO
  const partyList = document.querySelector("#parties");

  if (!state.parties.length) {
    partyList.innerHTML = "<li>No events.</li>";
    return;
  }

  const eventCards = state.parties.map((party) => {
    const card = document.createElement("li");
    card.innerHTML = `
       <h2>${party.name}</h2>
       <img src="${party.imageUrl}" alt="${party.name}" />
       <p>${party.description}</p>
     `;
    return card;
  });

  partyList.replaceChildren(...eventCards);
}

async function addParty(event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get form values
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  const newParty = { name, date, time, location, description };

  try {
    // Send the new party to the API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParty),
    });

    if (!response.ok) {
      throw new Error(`Failed to add party: ${response.statusText}`);
    }

    const addedParty = await response.json();
    console.log("Party added:", addedParty);

    // Update the state and re-render
    state.parties.push(addedParty);
    renderParties();

    // Reset the form
    event.target.reset();
  } catch (error) {
    console.error("Error adding party:", error);
  }
}

async function render() {
  await getParties();
  renderParties();
}

const partyForm = document.getElementById("party-form");
partyForm.addEventListener("submit", addParty);

render();
