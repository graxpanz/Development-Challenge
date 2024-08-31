window.onload = function() {
    setupWashingMachine('1');
    setupWashingMachine('2');
    setupWashingMachine('3');
    setupWashingMachine('4');
    setupWashingMachine('5');
};

function setupWashingMachine(machineNumber) {
    let totalCoins = 0;
    const pricePerWash = 30;
    const washTime = 5 * 60;
    const coinButton = document.getElementById(`insert-coin${machineNumber}`);
    const startButton = document.getElementById(`start-button${machineNumber}`);
    const coinsDisplay = document.getElementById(`coins${machineNumber}`);
    const statusDisplay = document.getElementById(`status${machineNumber}`);

    let countdownInterval;
    let notificationSent = false;

    statusDisplay.innerText = 'สถานะ: รอการหยอดเหรียญ';
    statusDisplay.style.color = 'gray';

    coinButton.addEventListener('click', () => {
        totalCoins += 10;
        coinsDisplay.innerText = `จำนวนเงินที่หยอด: ${totalCoins} บาท`;

        if (totalCoins >= pricePerWash) {
            startButton.disabled = false;
            statusDisplay.innerText = 'สถานะ: พร้อมเริ่มซักผ้า';
            statusDisplay.style.color = 'blue';
        }
    });

    startButton.addEventListener('click', () => {
        if (totalCoins >= pricePerWash) {
            startWashCycle();
        }
    });

    function startWashCycle() {
        let remainingTime = washTime;

        statusDisplay.innerText = `สถานะ: กำลังซักผ้า... เหลือเวลา: ${formatTime(remainingTime)}`;
        statusDisplay.style.color = 'orange';
        startButton.disabled = true;
        coinButton.disabled = true;
        notificationSent = false;

        countdownInterval = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                statusDisplay.innerText = 'สถานะ: ซักผ้าเสร็จแล้ว! ขอบคุณที่ใช้บริการ';
                statusDisplay.style.color = 'green';
                totalCoins = 0;
                coinsDisplay.innerText = `จำนวนเงินที่หยอด: ${totalCoins} บาท`;
                coinButton.disabled = false;
            } else {
                statusDisplay.innerText = `สถานะ: กำลังซักผ้า... เหลือเวลา: ${formatTime(remainingTime)}`;

                if (remainingTime <= 60 && !notificationSent) {
                    notifyServer('เครื่องซักผ้า ' + machineNumber + ' กำลังจะเสร็จใน 1 นาที');
                    notificationSent = true; 
                }
            }
        }, 1000); 
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} นาที ${secs} วินาที`;
    }

    function notifyServer(message) {
        fetch('http://localhost:3000/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

