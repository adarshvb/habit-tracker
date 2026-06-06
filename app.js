// JavaScript for the Habit Tracker app.
// This file lets the user add habits and shows the current list on the page.

// This message in the browser console confirms app.js loaded successfully.
console.log("Habit Tracker app loaded.");

// Our list of habits lives here, in memory, for as long as the page is open.
// Each habit is an object shaped like { id, name, completedDates: [] }.
// We only show "name" for now, but later tickets will use "completedDates"
// to track which days a habit was done, so we set up the shape now.
// We start with an empty array so the page begins with no habits.
let habits = [];

// Find the elements in index.html that we need to work with.
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

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

  // Clear the input so it's ready for the next habit.
  habitInput.value = "";

  // Redraw the list so the new habit appears.
  renderHabits();
});

// Draw the list once when the page first loads (shows the empty-state message).
renderHabits();
