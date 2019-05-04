
const rp = require('request-promise');
const url = 'http://xivinvestment.com/?fbclid=IwAR3cJwy7Q3-N6WVwYrT9RmC_Qv6DERD9HnLo6P4v1cYhtqWP52RoQtyc_cY#analytic-chart';

rp(url)
  .then(function(html){
    //success!
    console.log(html);
  })
  .catch(function(err){
    //handle error
  });