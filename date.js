
module.exports.getDate = () => {

     var today = new Date();
    
     // console.log(today);
     
     var currentDay = today.getDay();
     
     // console.log(currentDay);
     
     const options = {
        
          // day: 'numeric'
          //  weekday: 'long',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'

     };
     
     return today.toLocaleDateString("en-US", options)
         
     // if(currentDay >= 0){
     //     day = daysWeek[currentDay]
     // }else{
     //     day = "SomeThing Went Wrong"
     // }        



}

module.exports.getDay = () => {

     var today = new Date();
    
     // console.log(today);
     
     var currentDay = today.getDay();
     
     // console.log(currentDay);
     
     const options = {
        
          // day: 'numeric'
          //  weekday: 'long',
          weekday: 'long',
          // year: 'numeric',
          // month: 'long',
          // day: 'numeric'

     };
     
     return today.toLocaleDateString("en-US", options)
         
     // if(currentDay >= 0){
     //     day = daysWeek[currentDay]
     // }else{
     //     day = "SomeThing Went Wrong"
     // }        


}

console.log(module.exports);