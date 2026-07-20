const day_name=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months_name=["January","February","March","April","May","June","July","August","September","October","November","December"];
let date=new Date();
let day=day_name[date.getDay()];
let currentdate=date.getDate();
let year=date.getFullYear();
let month=months_name[date.getMonth()];

document.getElementById("date").innerHTML=(day +", "+ currentdate +" "+month+" "+year );
//Saturday, 11 July 2026


function recent_task_checked(val){
    let recent_task_checkbox=document.querySelector(".recent_task_name");
    if(val.checked){
        recent_task_checkbox.classList.add("dash");
        console.log("dashed")
    }
    else{
           recent_task_checkbox.classList.remove('dash');
console.log("undash");

    }
    
}