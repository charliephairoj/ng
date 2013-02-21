'use strict';

/* Filters */

angular.module('EmployeeCenter.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).filter('beautify', function(){
      return function(input){
        //declare vars
        var newStrArray = [],
            newStr,
            upperLetter,
            newWord,
            //split the words into array
            words = input.split(/\s+/);
        //loops through the words and uppercase first letter
        angular.forEach(words, function(word){
            //Capitalize first lteer
            upperLetter = word.charAt(0).toUpperCase();
            //get remainder of word
            newWord = word.slice(1);
            //create new formatted word
            newWord = upperLetter+newWord;
            //add to new string array
            newStrArray.push(newWord);
            
        });
        //join new string array
        newStr = newStrArray.join(' ');
        //return string
        return newStr;
      };
  }).
  
  /* 
   * Filter into proper telephone
   */
  filter('telephone', function(){
     return function($input){
         var clean = $input.replace(/ /g, '').replace(/\-/g, '');
         return clean; 
     }
     
     
     
     
      
  }).
  
  
  
  filter('exclude', function(){
      //function to compare
      return function(array, targetArray) {
        if (!(array instanceof Array)) {return []};
        if (!(targetArray instanceof Array)) {targetArray = [targetArray]}
       
        var filtered = [],
            i;
        angular.forEach(array, function(item){
            for(i=0; i<targetArray.length; i++){
                if(!angular.equals(item, targetArray[i]) && i===targetArray.length-1){
                    filtered.push(item);
                    break;
                }  
            }
        });
        return filtered;
      };
  });
