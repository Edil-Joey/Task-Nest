const day_name=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months_name=["January","February","March","April","May","June","July","August","September","October","November","December"];
let date=new Date();
let day=day_name[date.getDay()];
let currentdate=date.getDate();
let year=date.getFullYear();
let month=months_name[date.getMonth()];

document.getElementById("date").innerHTML=(day +", "+ currentdate +" "+month+" "+year );
//Saturday, 11 July 2026

const pages=['tasks','tracker','progress','settings'];
//Immediate invoke funtion to load when the page load
(()=>{
 pages.forEach(page=>document.querySelector("."+page).style.display='none');
})();


function task_checked(val){
  if(val.classList.contains("recent_task_checkbox")){
    group_name=".recent_tasks_group";
    task_name=".recent_task_name";
  }
  else{
    group_name=".tasks_group";
    task_name=".task_name";
  }
    let recent_task_checkbox=val.closest(group_name).querySelector(task_name);
    if(val.checked){
        recent_task_checkbox.classList.add("dash");
    }
    else{
        recent_task_checkbox.classList.remove("dash");
    }
}

function filter(filter,where,type){
  document.querySelectorAll(filter).forEach(val=>val.classList.remove("slt"));
  type.classList.add("slt");

  let group=document.querySelectorAll(".tasks_group");
  group.forEach(task=>{
    console.log(where);
  let dashed=task.querySelector(".task_name").classList.contains("dash");

  switch(where){
    case "all":task.style.display="flex";break;
    case "active":task.style.display=dashed?"none":"flex";break;
    case "completed":task.style.display=dashed?"flex":"none";break;}
} )
}


// page display will remove the select class(in navigation bar to show as selected).
//make the selected page to display and other page to display none.
function page_display(page,el){

    document.querySelectorAll(".nav").forEach(nav=>nav.classList.remove("select"));
    el.classList.add("select");
   
    document.querySelectorAll(".page").forEach(page=>page.style.display='none');
    document.getElementsByClassName(page)[0].style.display='block';
   
}


function add_task(){

  let task_name=document.getElementById("task_ip").value;
  if(task_name.trim()){
  let task_type=document.getElementById("type_option").value;
  let task;
  if(task_type=="Work"){
    task= "w";
  }
  else{
    task= "p";
  }
  var adding_task=`<div class="tasks_group">
                    <input class="task_checkbox" onclick=task_checked(this) type="checkbox">
                    <span class="task_name">${task_name}</span>
                    <span class="task_type ${task}">${task_type}</span>
                </div>`;

   let append_container=document.querySelector(".task_container");

   append_container.insertAdjacentHTML('beforeend',adding_task);

document.getElementById("task_ip").value=" ";task="";task_type="";

  }
}