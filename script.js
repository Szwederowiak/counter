class Timer {
    constructor() {
        this.targetTime = new Date('12-28-2024 14:17');
        this.startTime = new Date('12-9-2024 18:00');
        this.performanceStart = performance.now();
        this.remainingTime = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            fullDays: 0,
            fullHours: 0,
            fullMinutes: 0,
            fullSeconds: 0,
            fullMiliseconds: 0,
            fromStartDays: 0,
            fromStartHours: 0,
            fromStartMinutes: 0,
            fromStartSeconds: 0,
            fromStartMiliseconds: 0,
        };


        this.headerTimer = document.getElementById('header-timer');
        this.clockTimer = document.getElementById('clock-timer');


        this.init();
    }

    init = () => {
        this.setTimeFromStart();
        // this.setupClockTimer();
        this.requestAnimationFrame();
    }

    setTimeFromStart = () => {
        const diff = this.targetTime - this.startTime;

        this.remainingTime.fromStartMiliseconds = diff;
        this.remainingTime.fromStartSeconds = Math.floor(diff / 1000);
        this.remainingTime.fromStartMinutes = Math.floor(diff / 1000 / 60);
        this.remainingTime.fromStartHours = Math.floor(diff / 1000 / 60 / 60);
        this.remainingTime.fromStartDays = Math.floor(diff / 1000 / 60 / 60 / 24);
    }
    remainingTimeUpdate = () => {
        const currentTime = new Date();
        const diff = this.targetTime - currentTime;

        this.remainingTime.miliseconds = diff;
        this.remainingTime.seconds = Math.floor(diff / 1000);
        this.remainingTime.minutes = Math.floor(diff / 1000 / 60);
        this.remainingTime.hours = Math.floor(diff / 1000 / 60 / 60);
        this.remainingTime.days = Math.floor(diff / 1000 / 60 / 60 / 24);

        this.remainingTime.fullMiliseconds = diff % 1000;
        this.remainingTime.fullSeconds = Math.floor((diff / 1000) % 60);
        this.remainingTime.fullMinutes = Math.floor((diff / (1000 * 60)) % 60);
        this.remainingTime.fullHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.remainingTime.fullDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    requestAnimationFrame = () => {
        const performanceNow = performance.now();
        const elapsed = performanceNow - this.performanceStart;

        if (elapsed >= 10) {
            this.remainingTimeUpdate();
            this.headerTimerCountdown();
        }

        if (elapsed >= 1000) {
            // this.updateClockTimer();
            this.performanceStart = performanceNow;
        }

        requestAnimationFrame(this.requestAnimationFrame);
    }

    // Header timer
    headerTimerCountdown = () => {
        this.headerTimer.querySelector(".header-timer__unit-value--days").textContent = this.remainingTime.fullDays;
        this.headerTimer.querySelector(".header-timer__unit-value--hours").textContent = this.remainingTime.fullHours;
        this.headerTimer.querySelector(".header-timer__unit-value--minutes").textContent = this.remainingTime.fullMinutes;
        this.headerTimer.querySelector(".header-timer__unit-value--seconds").textContent = this.remainingTime.fullSeconds;
        this.headerTimer.querySelector(".header-timer__unit-value--miliseconds").textContent = this.remainingTime.fullMiliseconds;
    }

    // Clock timer
    setupClockTimer = () => {
        for (let i = 0; i < 60; i++) {
            const point = document.createElement('div');
            point.classList.add('clock-timer__point');
            this.clockTimer.insertAdjacentElement('beforeend', point);
        }
        
        const daysPointer = document.createElement('div');
        daysPointer.classList.add('clock-timer__pointer', 'clock-timer__pointer--days');
        
        const hoursPointer = document.createElement('div');
        hoursPointer.classList.add('clock-timer__pointer', 'clock-timer__pointer--hours');
        
        const minutesPointer = document.createElement('div');
        minutesPointer.classList.add('clock-timer__pointer', 'clock-timer__pointer--minutes');
        
        const secondsPointer = document.createElement('div');
        secondsPointer.classList.add('clock-timer__pointer', 'clock-timer__pointer--seconds');
        
        this.clockTimer.insertAdjacentElement('beforeend', daysPointer);
        this.clockTimer.insertAdjacentElement('beforeend', hoursPointer);
        this.clockTimer.insertAdjacentElement('beforeend', minutesPointer);
        this.clockTimer.insertAdjacentElement('beforeend', secondsPointer);
    }

    updateClockTimer = () => {
        const daysPointer = this.clockTimer.querySelector('.clock-timer__pointer--days');
        const hoursPointer = this.clockTimer.querySelector('.clock-timer__pointer--hours');
        const minutesPointer = this.clockTimer.querySelector('.clock-timer__pointer--minutes');
        const secondsPointer = this.clockTimer.querySelector('.clock-timer__pointer--seconds');

        // console.log(this.remainingTime.fromStartDays, this.remainingTime.days);
        // console.log(this.remainingTime.fromStartHours, this.remainingTime.hours);
        // console.log(this.remainingTime.fromStartMinutes, this.remainingTime.minutes);
        // console.log(this.remainingTime.fromStartSeconds, this.remainingTime.seconds);
        const daysAngle = (360 / this.remainingTime.fromStartDays) * (this.remainingTime.fromStartDays - this.remainingTime.days);
        const hoursAngle = (360 / this.remainingTime.fromStartHours) * (this.remainingTime.fromStartHours - this.remainingTime.hours);
        const minutesAngle = (360 / this.remainingTime.fromStartMinutes) * (this.remainingTime.fromStartMinutes - this.remainingTime.minutes);
        const secondsAngle = (360 / this.remainingTime.fromStartSeconds) * (this.remainingTime.fromStartSeconds - this.remainingTime.seconds);


        daysPointer.style.setProperty('--days-angle', `${daysAngle.toFixed(3)}deg`)
        hoursPointer.style.setProperty('--hours-angle', `${hoursAngle.toFixed(3)}deg`)
        minutesPointer.style.setProperty('--minutes-angle', `${minutesAngle.toFixed(3)}deg`)
        secondsPointer.style.setProperty('--seconds-angle', `${secondsAngle.toFixed(3)}deg`)

    }
}

new Timer();

1397702890 / 1000 / 60 
