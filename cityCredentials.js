const loginCredentials = {
        name: 'sandiego',
        uaa: 'https://auth.aa.cityiq.io/oauth/token',
        eventservice: 'https://sandiego.cityiq.io/api/v2/event/',
        metadataservice: 'https://sandiego.cityiq.io/api/v2/',
        mediaservice: 'https://sandiego.cityiq.io/api/v2/',
        websocket: 'wss://{yourWebSocketURL}', //Necessary only for websocket.js
        developer: 'PublicAccess:uVeeMuiue4k=',
        parking: 'SD-IE-PARKING',
        environment: 'SD-IE-ENVIRONMENTAL',
        pedestrian: 'SD-IE-PEDESTRIAN',
        traffic: 'SD-IE-TRAFFIC',
        video: 'SD-IE-VIDEO',
        images: 'SD-IE-IMAGE',
        bbox: '33.077762:-117.663817,32.559574:-116.584410'
    }

module.exports = loginCredentials
    