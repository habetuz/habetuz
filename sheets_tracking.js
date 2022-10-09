var SHEETS_TRACKING = {
    sheetsURL: '',
    sheetName: '',

    _country: 'N/A',
    _region: 'N/A',
    _city: 'N/A',
    _ip: 'N/A',

    _activeTime: 0,
    _lastTimeUpdate: new Date().getTime(),
    _timeUpdatePaused: false,
    _idleTime: new Date().getTime(),
    _wasHidden: false,

    _id: '',

    start: async () => {
        // Handle time updates
        setInterval(() => {
            if (SHEETS_TRACKING._timeUpdatePaused) {
                return
            }

            fetch(SHEETS_TRACKING.sheetsURL, {
                method: 'POST',
                redirect: 'follow',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'time': Math.floor(SHEETS_TRACKING._activeTime),
    
                    'sheetName': SHEETS_TRACKING.sheetName,
                    'id': SHEETS_TRACKING._id,
                    'type': 'time_update',
                })
            })
        }, 5000)

        setInterval(() => {
            // Visibility changed
            if (SHEETS_TRACKING._wasHidden != document.hidden) {
                SHEETS_TRACKING._idleTime = new Date().getTime()
            }

            let idling = new Date().getTime() - SHEETS_TRACKING._idleTime > 10000

            SHEETS_TRACKING._timeUpdatePaused = idling || document.hidden

            if (!SHEETS_TRACKING._timeUpdatePaused) {
                console.log('active');

                // Update time
                let currentTime = new Date().getTime()
                let elapsedTime = currentTime - SHEETS_TRACKING._lastTimeUpdate
                SHEETS_TRACKING._lastTimeUpdate = currentTime
                SHEETS_TRACKING._activeTime += elapsedTime / 1000
            } else {
                console.log('inactive');
            }          
        }, 500)

        // Reset idle counter
        let events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(function(name) {
            document.addEventListener(name, () => {
                SHEETS_TRACKING._idleTime = new Date().getTime()
            }, true);
        });

        // Get location and ip
        try {
            await fetch('https://geolocation-db.com/json/')
            .then(response => response.json())
            .then(data => {
                SHEETS_TRACKING._country = data.country_name
                SHEETS_TRACKING._region = data.state
                SHEETS_TRACKING._city = data.city
                SHEETS_TRACKING._ip = data.IPv4
            })
        } catch {

        }
        
        // Get uuid for connection
        try {
            await fetch('https://www.uuidtools.com/api/generate/timestamp-first')
                .then(response => response.json())
                .then(data => {
                    SHEETS_TRACKING._id = data[0]
                })
        } catch {

        }

        fetch(SHEETS_TRACKING.sheetsURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'country': SHEETS_TRACKING._country,
                'region': SHEETS_TRACKING._region,
                'city': SHEETS_TRACKING._city,
                'ip': SHEETS_TRACKING._ip,

                'sheetName': SHEETS_TRACKING.sheetName,
                'id': SHEETS_TRACKING._id,
                'type': 'register',
            })})
    },

    _updateTime() {
        let currentTime = new Date().getTime()
        let elapsedTime = currentTime - SHEETS_TRACKING._lastTimeUpdate
        SHEETS_TRACKING._lastTimeUpdate = currentTime
        SHEETS_TRACKING._activeTime += elapsedTime / 1000
    }
}