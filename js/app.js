'use strict';

class countTime{
     constructor(userTime, userMeal){
        this.userTime = userTime;
        this.userMeal = userMeal;
         this.time = new Date();
         this.hours = this.time.getHours();
         this.minutes = this.time.getMinutes();
         this.seconds = this.time.getSeconds();
         this.timeInput = document.querySelector('.card-header h4');
         this.images = document.querySelector('.card-img img');
         this.cardFooter = document.querySelector('.card-footer h4');
         this.am_pm = 'AM';
     }

    //  display time on UI
     showTime(){
        this.covertTo_12Hr_Time();
        this.validateMeals();

         this.hours = (this.hours < 10) ? `0${this.hours}` : this.hours;
         this.minutes = (this.minutes < 10) ? `0${this.minutes}` : this.minutes;
         this.seconds = (this.seconds < 10) ? `0${this.seconds}` : this.seconds

         let output = `${this.hours} : ${this.minutes} : ${this.seconds} ${this.am_pm}`
         this.timeInput.innerHTML = output;
         setTimeout(this.timeTick, 1000);
         
     }

    //  make time tick
     timeTick(){
        const ui = new countTime();
        ui.showTime(); 
     }

    //  convert time from 24hrs format to 12hrs.
     covertTo_12Hr_Time(){
        if(this.hours >= 12){
            this.hours -= 12;
            this.am_pm = 'PM';
        }
        if(this.hours === 0){
            this.hours = 12;
        }
     }

    //  match meals with specific time
     validateMeals(){
         if(this.hours === 10 && this.am_pm === 'AM'){
            this.images.attributes.src.value = `./img/breakfast.jpg`
            this.cardFooter.textContent = 'breakfast time';
         }else if(this.hours === 1 && this.am_pm === 'PM'){
            this.images.attributes.src.value = `./img/lunchtime.jpg`
            this.cardFooter.textContent = 'lunch time';
         }else if(this.hours === 8 && this.am_pm === 'PM'){
            this.images.attributes.src.value = `./img/dinner.jpg`
            this.cardFooter.textContent = 'dinner time';
         }else{
            this.images.attributes.src.value = `./img/codingtime.jpg`
            this.cardFooter.textContent = 'just coding time';
         }
     }


}

const ui = new countTime();
ui.showTime();

document.querySelector('.form-card').addEventListener('submit', (e) => {
   const userTimeInput = document.getElementById('time').value,
         userMealInput = document.getElementById('text').value;
   const ui = new countTime(userTimeInput, userMealInput);
   console.log(ui);
   e.preventDefault();
})