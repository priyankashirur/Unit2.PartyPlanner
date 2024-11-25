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

async function render() {
  await getParties();
  renderParties();
}

render();
