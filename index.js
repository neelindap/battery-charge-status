const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const path = require('path')

const { app, Menu, Tray, BrowserWindow } = require('electron')

let notificationTimer = 10 * 1000

// Default check time - 10 minutes
let timer = 10
// Default battery threshold - 85%
let threshold = 20

let tray = null
app.on('ready', () => {
    const iconPath = path.join(__dirname, `icon.png`);
    tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: function () {
                app.isQuitting = true;
                app.quit();
            }
        }
    ])
    tray.setContextMenu(contextMenu)

    tray.displayBalloon({
        title:'Battery charge status',
        content:'Application started'
    });   

    mainWindow = new BrowserWindow({
        width: 500,
        height: 400,
        icon: (__dirname, 'icon.png'),
        show: false
    })


    initApp()
})

function initApp() {
    clearInterval(notificationTimer)

    notificationTimer = setInterval(function () {
        isCharging().then(result => {

            if (result) {
                batteryLevel().then(level => {
                    if ((level * 100) > threshold) {
                        notify()
                    }
                });
            }
        });
    }, timer * 1000)
}

// Notify
function notify() {
    let eNotify = require('electron-notify');
    eNotify.setConfig({
        appIcon: path.join(__dirname, 'icon.png'),
        displayTime: 6000,
    });

    eNotify.notify({
        title: 'Battery charged',
        text: 'Battery charged to ' + threshold + '%. Unplug to preserve your battery\'s life.',
    });
}