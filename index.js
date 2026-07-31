const day_name = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let day = day_name[date.getDay()];
let currentdate = date.getDate();
let year = date.getFullYear();
let month = months_name[date.getMonth()];

document.getElementById("date").innerHTML =
  day + ", " + currentdate + " " + month + " " + year;
//Saturday, 11 July 2026

const pages = ["tasks", "tracker", "progress", "settings"];
//Immediate invoke funtion to load when the page load
(() => {
  pages.forEach(
    (page) => (document.querySelector("." + page).style.display = "none"),
  );
})();

function task_checked(val) {
  if (val.classList.contains("recent_task_checkbox")) {
    group_name = ".recent_tasks_group";
    task_name = ".recent_task_name";
  } else {
    group_name = ".tasks_group";
    task_name = ".task_name";
  }
  let recent_task_checkbox = val.closest(group_name).querySelector(task_name);
  if (val.checked) {
    recent_task_checkbox.classList.add("dash");
  } else {
    recent_task_checkbox.classList.remove("dash");
  }
}

function filter(filter, where, type) {
  
   document.querySelectorAll(filter).forEach((val) => val.classList.remove("slt"));
  type.classList.add("slt");

  if (filter == ".job_tr_filter") {
    let group = document.querySelectorAll(".job_tr_group");

    group.forEach((job) => {
      let type_val = job.querySelector(".job_status").innerHTML;
      job.style.display="none";
      console.log(type_val);
       if (where == "All" || type_val == where) {
      job.style.display = "flex";
    } else {
      job.style.display = "none";
    }
    }
 
);
    
  }
  else if(filter==".task_filter"){

  let group = document.querySelectorAll(".tasks_group");
  group.forEach((task) => {
    let dashed = task.querySelector(".task_name").classList.contains("dash");

    switch (where) {
      case "all":
        task.style.display = "flex";
        break;
      case "active":
        task.style.display = dashed ? "none" : "flex";
        break;
      case "completed":
        task.style.display = dashed ? "flex" : "none";
        break;
    }
  });
}}

// page display will remove the select class(in navigation bar to show as selected).
//make the selected page to display and other page to display none.
function page_display(page, el) {
  document
    .querySelectorAll(".nav")
    .forEach((nav) => nav.classList.remove("select"));
  el.classList.add("select");

  document
    .querySelectorAll(".page")
    .forEach((page) => (page.style.display = "none"));
  document.getElementsByClassName(page)[0].style.display = "block";
}

function add_task() {
  let task_name = document.getElementById("task_ip").value;
  if (task_name.trim()) {
    let task_type = document.getElementById("type_option").value;
    let task;
    if (task_type == "Work") {
      task = "w";
    } else {
      task = "p";
    }
    var adding_task = `<div class="tasks_group">
                    <input class="task_checkbox" onclick=task_checked(this) type="checkbox">
                    <span class="task_name">${task_name}</span>
                    <span class="task_type ${task}">${task_type}</span>
                </div>`;

    let append_container = document.querySelector(".task_container");

    append_container.insertAdjacentHTML("beforeend", adding_task);

    document.getElementById("task_ip").value = " ";
    task = "";
    task_type = "";
  }
}

// in job tracker section, while adding the job to track
function add_job_tracker() {
  let job_title = document.getElementById("job_title_ip").value;
  let company_name = document.getElementById("company_name_ip").value;
  let applied_on_val = document.getElementById("applied_date_ip").value;
  let applied_date=applied_on_val.slice(9, 10);
  let applied_month=months_name[Number(applied_on_val.slice(5, 7))];
  if (!(job_title && company_name && applied_on_val)) {
    return console.error("no val");
  }
  let job_status = document.getElementById("status_option").value;
  let val_classname;
   switch (job_status) {
    case "Applied":
      val_classname = "a";
      break;
    case "Interview":
      val_classname = "i";
      break;
    case "Offer":
      val_classname = "o";
      break;
    case "Rejected":
      val_classname = "r";
      break;
  }
let job_sts
  let row = ` <div class="job_tr_group">
                <div style="flex: 1;">
                    <div>${job_title}</div>
                    <div class="author_name">${company_name} . Applied ${applied_date + " "+ applied_month}</div>
                </div>
                 <select class="job_tr_option" onchange="changeStatus(this)">
                    <option id="work" ${job_status=="Applied"?'selected':''}>Applied</option>
                     <option id="interview" ${job_status=="Interview"?'selected':''}>Interview</option>
                      <option id="offer" ${job_status=="Offer"?'selected':''}>Offer</option>
                       <option id="rejected" ${job_status=="Rejected"?'selected':''}>Rejected</option>
                </select>
                 <span class="job_status ${val_classname}">${job_status}</span>
                 <span class="del" onclick="delJob(this)">Trash</span>
              </div>`;
  let job_tr_container = document.querySelector(".job_tracker_container");
  job_tr_container.insertAdjacentHTML("beforeend", row);
  val_classname="";
  document.getElementById("job_title_ip").value = "";
  document.getElementById("company_name_ip").value = "";
  document.getElementById("applied_date_ip").value = "";
  document.getElementById("status_option").value="Applied";
}

function changeStatus(stats) {
  let status = stats.value;
  let job_status_class = stats
    .closest(".job_tr_group")
    .querySelector(".job_status");
  job_status_class.innerHTML = status;
  let val;
  switch (status) {
    case "Applied":
      val = "a";
      break;
    case "Interview":
      val = "i";
      break;
    case "Offer":
      val = "o";
      break;
    case "Rejected":
      val = "r";
      break;
  }
  job_status_class.classList.remove("a", "i", "o", "r");
  job_status_class.classList.add(val);
  console.log(stats.value);
}

function delJob(val) {
  val.parentElement.remove();
}
