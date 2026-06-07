// JavaScript for the Habit Tracker app.
// This file lets the user add habits and shows the current list on the page.

// This message in the browser console confirms app.js loaded successfully.
console.log("Habit Tracker app loaded.");

// Our list of habits lives here, in memory, for as long as the page is open.
// Each habit is an object shaped like { id, name, completedDates: [] }.
// We only show "name" for now, but later tickets will use "completedDates"
// to track which days a habit was done, so we set up the shape now.
// We start with an empty array, but loadHabits() below fills it from
// localStorage so habits added in a previous visit come back after a reload.
let habits = [];

// Find the elements in index.html that we need to work with.
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

// Save the current habits array to the browser's localStorage.
// localStorage can only store text, so we turn the array into a JSON string.
// We use the key "habits" so loadHabits() can find it again later.
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Read the saved habits back out of localStorage and return them as an array.
// If nothing has been saved yet, or if the saved value is somehow broken,
// we return an empty array so the app still starts cleanly instead of crashing.
// The try/catch protects us in case JSON.parse chokes on a corrupt value.
function loadHabits() {
  const stored = localStorage.getItem("habits");

  // Nothing saved yet (first ever visit): just start with no habits.
  if (stored === null) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    // The saved text wasn't valid JSON, so ignore it and start fresh.
    return [];
  }
}

// Rebuild the whole list on the page from our "habits" array.
// Rebuilding everything from scratch is simple and keeps the page in sync
// with the array: whatever is in the array is exactly what gets shown.
function renderHabits() {
  // Clear out whatever is currently shown so we can draw the latest list.
  habitList.innerHTML = "";

  // If there are no habits yet, show a friendly message instead of a blank space.
  if (habits.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No habits yet. Add one above to get started!";
    habitList.appendChild(emptyMessage);
    return;
  }

  // Otherwise, make one list item for each habit and show its name.
  for (const habit of habits) {
    const item = document.createElement("li");
    item.textContent = habit.name;
    habitList.appendChild(item);
  }
}

// Run when the user submits the form (by clicking "Add" or pressing Enter).
habitForm.addEventListener("submit", function (event) {
  // Stop the browser's default behaviour of reloading the page on submit.
  event.preventDefault();

  // Read what the user typed and remove spaces from the start and end.
  const name = habitInput.value.trim();

  // Reject empty or whitespace-only names so we never add a blank habit.
  if (name === "") {
    return;
  }

  // Build a new habit object and add it to our array.
  // crypto.randomUUID() gives each habit a unique id we can rely on later.
  const newHabit = {
    id: crypto.randomUUID(),
    name: name,
    completedDates: [],
  };
  habits.push(newHabit);

  // Save the updated list so this habit survives a page reload.
  saveHabits();

  // Clear the input so it's ready for the next habit.
  habitInput.value = "";

  // Redraw the list so the new habit appears.
  renderHabits();
});

// When the page first loads, fill the habits array from localStorage
// (so previously added habits come back), then draw the list.
habits = loadHabits();
renderHabits();
