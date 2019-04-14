// Run this command: $node demo2.js
// to return the queries found in the async function demo.
  
// For more details on simulated data please reference the API Documentation Appendix A (https://ie-cities-docs.run.aws-usw02-pr.ice.predix.io/#r_intelligent_cities_appendix_a.html)
// Your municipality will provide the necessary urls, username, password and predix zone ids
'use strict';

var fs = require('fs');
// cityiq.js sets up the requests
const cityiq = require("./cityiq.js")
// cityCredentials.js contains all the necessary credentials for reference
const credentials = require("./cityCredentials")

const rows =[]

// this function is where queries can be specified.  
async function demo2 (){
    console.log('obtaining traffic data ')
    // specifies the credentials and begins authentication - see cityiq.js
    let ciq = await cityiq(credentials)
    
    /* To Learn more about how the ciq.assets, ciq.locations and ciq.events functions work, 
    please reference cityiq.js*/

    //obtaining traffic data by eventTypes
    let assets = await ciq.assets(credentials.traffic,'TFEVT')
    // console.log("TFEVT")
    // console.log(assets[0]) // returns the first asset found

    // return all traffic events in last 12 hours related to the assetUid found above
    // let events = await ciq.events(credentials.traffic, assets[0].assetUid,'assetUid','TFEVT',ciq.timecalc(12))
    // console.log("12 hours")
    // console.log(events[0]) 

    // console.log("location "+location[0])
    let location = await ciq.locations(credentials.traffic,'TRAFFIC_LANE')

    console.log("pulling data from "+assets.length+"assets")

    rows.push(["timestamp", "speed: METERS_PER_SEC", "lat", "long"])
    for (var j = assets.length-1; j >= 0; j--) {
        let events = await ciq.events(credentials.traffic, assets[j].assetUid,'assetUid','TFEVT',ciq.timecalc(3))

        // const arr = []
        var speed
        for (var i = events.length - 1; i >= 0; i--) {
        // console.log(events[i])
            const arr = []
            try {
                var timestamp = events[i]['timestamp']
                speed = events[i]['measures']['speed']
            } catch(e) {
                console.log(e)
            }

            var coor = assets[j].coordinates.split(":")
            var lat = coor[0]
            var long = coor[1]
            
            // console.log("time: "+timestamp+" speed: "+speed+" METERS_PER_SEC "+" coordinates lat "+lat+" long "+long)
            arr.push(timestamp)
            arr.push(speed)
            arr.push(lat)
            arr.push(long)
            // if (speed != 0) {
                rows.push(arr)
            // }
        }
        
        
    }
    // console.log(rows)
    stringify(rows)
    var file = fs.createWriteStream('array0.txt');
    file.on('error', function(err) { /* error handling */ });
    rows.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    file.end();
    // let csvContent = "data:text/csv;charset=utf-8," + rows.map(e=>e.join(",")).join("\n");
}


const path = require('path');
const os = require('os');

// output file in the same folder
const filename = path.join(__dirname, 'output.csv');


// instantiates demo function to run queries
demo2()
// fs.writeFileSync(filename, rows.map(e=>e.join(",")).join("\n"));


// choose another string to temporally replace commas if necessary


'use strict';

var stringify = require('csv-stringify');
console.log("rows"+rows)


// // 2. Another way - if you don't need the double quotes in the generated csv and you don't have comas in rows' values
// let csv = myObj.rows.join('\n')

stringify(rows, function(err, output) {
  fs.writeFile('name.csv', output, 'utf8', function(err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });
});


