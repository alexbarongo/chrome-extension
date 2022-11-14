
let myLeads = [];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn")
const leads = JSON.parse(localStorage.getItem("myLeads"));//the JSON.parse() converts the string "myLeads" back to an array
const tabBtn = document.getElementById("tab-btn");


if (leads){
	myLeads = leads;
	render(myLeads);
}//re-declaring the value of myLeads array to leads variable

tabBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));// here the array is converted to a string using JSON.stringify()
	 	render(myLeads);
  });//here we are taking the active tab's url intu our app and save it into the DOM
	
})

delBtn.addEventListener("dblclick", function(){
	myLeads = [];
	localStorage.clear();
	render(myLeads);
})// this listens to the double click in the DOM and clears everything

inputBtn.addEventListener("click", function(){
 	myLeads.push(inputEl.value);
 	resetField();
	localStorage.setItem("myLeads", JSON.stringify(myLeads));// here the array is converted to a string using JSON.stringify()
 	render(myLeads);
 	console.log(localStorage.getItem("myLeads"));// just debbing
 })

function render(arg){
let listItems = "";
for (let i = 0; i < arg.length; i++) {
	listItems +=  `<li><a href='${arg[i]}' target='_blank'>${arg[i]}</a></li>`;
}
ulEl.innerHTML = listItems;
}// this function accepts arguments "arg" to list the items to the DOM

function resetField(){
	inputEl.value = "";
}// this function is for clearing the input field when the save button is clicked