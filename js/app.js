
// use strict;

// =================================================================================
            // UI CLASS
// ===========================================================================

class countTime {
   constructor(userTime, userHour, userMeal) {
      this.userHour = userHour;
      this.userTime = userTime;
      this.userMeal = userMeal;
      this.time = new Date();
      this.hours = this.time.getHours();
      this.minutes = this.time.getMinutes();
      this.seconds = this.time.getSeconds();
      this.timeInput = document.querySelector('.card-header h4');
      this.images = document.querySelector('.card-img img');
      this.card = document.querySelector('.card');
      this.actionText = document.querySelector('.card-text p');
      this.timeAction = document.querySelector('.time');
      this.am_pm = 'AM';

   }

   addlistToUi(item){
      let row = document.createElement('tr');
      row.innerHTML =  `<td>${item.userTime}</td>
                        <td>${item.userMeal}</td>
                        <td>${item.userHour}:00</td>`;
      
         
      document.querySelector('tbody').appendChild(row);
   }
  
   validateMeal(){
      const LIST = storage.getItems();
      LIST.forEach(list => {
         if(list.userHour < 10){
            list.userHour = `0${list.userHour}`;
         }
         if(this.hours === list.userHour && list.userTime === 'breakfast' && this.am_pm === 'AM'){
            this.images.attributes.src.value = `./img/breakfast.jpg`
            this.actionText.textContent = `i am eating ${list.userMeal} for ${list.userTime}`;
            this.timeAction.textContent = `${list.userHour}:00 ${this.am_pm}`;
         }else if(this.hours === list.userHour && list.userTime === 'lunch' && this.am_pm === 'PM'){
            this.images.attributes.src.value = `./img/lunchtime.jpg`;
            this.actionText.textContent = `i am eating ${list.userMeal} for ${list.userTime}`;
            this.timeAction.textContent = `${list.userHour}:00 ${this.am_pm}`;
         }
         else if(this.hours === list.userHour && list.userTime === 'dinner' && this.am_pm === 'PM'){
            this.images.attributes.src.value = `./img/dinner.jpg`;
            this.actionText.textContent = `i am eating ${list.userMeal} for ${list.userTime}`;
            this.timeAction.textContent = `${list.userHour}:00 ${this.am_pm}`;
         }else{
            this.images.attributes.src.value = `./img/codingtime.jpg`;
            this.actionText.textContent = `i'm coding for now, will set eating time later`;
            this.timeAction.textContent = `${this.hours}:${this.minutes} ${this.am_pm}`;
         }
      })
     
   }

   //  display time on UI
   showTime() {
      this.covertTo_12Hr_Time();

      ui.validateMeal();
      this.hours = (this.hours < 10) ? `0${this.hours}` : this.hours;
      this.minutes = (this.minutes < 10) ? `0${this.minutes}` : this.minutes;
      this.seconds = (this.seconds < 10) ? `0${this.seconds}` : this.seconds
      let output = `${this.hours} : ${this.minutes} : ${this.seconds} ${this.am_pm}`
      this.timeInput.innerHTML = output;
      setTimeout(this.timeTick, 1000);
   }

   //  make time tick
   timeTick() {
      const ui = new countTime();
      ui.showTime();
   }

   //  convert time from 24hrs format to 12hrs.
   covertTo_12Hr_Time() {
      if (this.hours >= 12) {
         this.hours -= 12;
         this.am_pm = 'PM';
      }
      if (this.hours === 0) {
         this.hours = 12;
      }
   }

   showAlert(message, className){
      this.clearAlert();
      let alert = document.createElement('div');
      alert.className = className;
      alert.appendChild(document.createTextNode(message));
      let parent = document.querySelector('.form-card');
      let child = document.querySelector('.form-card h4');
      parent.insertBefore(alert, child);
      setTimeout(this.clearAlert, 3000);  
   }

   clearAllInput(){
      document.getElementById('hour').value = '';
      document.getElementById('meal-time').value = '';
      document.getElementById('food').value = '';
   }

   clearAlert(){
      const currentAlert = document.querySelector('.success') ||document.querySelector('.danger');
      if(currentAlert){
         currentAlert.remove();
      }
   }
}







// =================================================================================
                      // LOCAL STORAGE CLASS
// ================================================================================

class storage{

   static displayOnLoad(){
      const LIST = storage.getItems()
      const ui = new countTime();
      LIST.forEach(list => {
         ui.addlistToUi(list);
      })
   }

   static addToLs(item){
      let LIST = storage.getItems();
      const ui = new countTime();
      let filterdList = LIST.find(e => e.userTime === item.userTime);
     
      if(!filterdList){
         ui.addlistToUi(item);
         LIST.push(item);
         ui.showAlert('successfully added meal to DB', 'success');
      }else{
         ui.showAlert(`${item.userTime} has been fixed already`, 'danger');

      }
      
      localStorage.setItem('list', JSON.stringify(LIST));
   }  
      

   static getItems(){
      let LIST;
      if(localStorage.getItem('list') === null){
         LIST = [];
      }else{
         LIST = JSON.parse(localStorage.getItem('list'));
      }
      return LIST;
   }

   static clearLs(){
      localStorage.clear();
      location.reload();
   }
}










// =======================================================================================
            // EVENTS
// =====================================================================================
const ui = new countTime();
ui.showTime();


document.querySelector('.form-card').addEventListener('submit', (e) => {
   document.querySelector('.loader').style.display = 'block';
   setTimeout(onSubmit, 1500);
   e.preventDefault();
})

function onSubmit(){
   const userMealTimeInput = document.getElementById('meal-time').value,
         userMealHour = document.getElementById('hour').value,
         userMealInput = document.getElementById('food').value;
   const data = new countTime(userMealTimeInput, userMealHour, userMealInput);
   if (userMealTimeInput && userMealHour && userMealInput) {
      storage.addToLs(data);
      ui.clearAllInput();
      document.querySelector('.loader').style.display = 'none';
      
      
   }else{
      ui.showAlert('please fill all input fields before submit', 'danger');
      document.querySelector('.loader').style.display = 'none';

   }
}


document.getElementById('clear').addEventListener('click', ( ) => {
   storage.clearLs();
})

document.addEventListener('DOMContentLoaded', () => {
   storage.displayOnLoad();
})
