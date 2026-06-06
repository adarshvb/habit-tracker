// JavaScript for the Habit Tracker app.
// This is just the skeleton. For now it only proves the files are wired up
// by logging a message and showing one hardcoded sample habit on the page.

// This message in the browser console confirms app.js loaded successfully.
console.log("Habit Tracker app loaded.");

// A single hardcoded sample habit name. Later tickets will let users add their own.
const sampleHabit = "Drink water";

// Find the empty list in index.html where we want the habit to appear.
const habitList = document.getElementById("habit-list");

// Create a new list item, put the habit name inside it, and add it to the list.
// This makes the sample habit visible on the page.
const item = document.createElement("li");
item.textContent = sampleHabit;
habitList.appendChild(item);
