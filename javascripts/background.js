/*
 * @method Query user status, tree version, and tree data
 * @param {Function} errorFn, queryFunction, queryUserStatus,
 *                   queryTreeVersion, updateTreeData.
 * @return {Object}
 *
 */
      // Route
var   serverURL = 'https://your.service.position', // your back end service
      queryUserStatusURL = serverURL + '/login',   // checkout login route
      googleOauth = serverURL + '/oauth',          // google oauth route
      queryTreeDataURL = serverURL + '/gettree',   // get tree data
      queryTreeID = serverURL + '/gettreeid',      // get tree version
      // Parameter
      userStatus = '',
      localUserStatus = localStorage.userStatus || '',
      treeVersion = '',
      localTreeVersion = localStorage.treeVersion || '',
      treeData,
      localTreeData = localStorage.treeData || '',
      errorMsg,
      Help = 'Please connect someone who can handle this message.',
      // Function
      queryFunction,
      queryUserStatus,
      queryTreeVersion,
      updateTreeData,
      scheduleRequest,
      startRequest,
      errorFn;
// Error message
errorFn = function errorFn(e){
   errorMsg = Help + '<hr>It is offline, because：<hr>' + e ;
};
// Query data from coress domain
queryFunction = function queryFunction(url_link, callback){
   errorMsg = '';
   var xhr = new XMLHttpRequest(),
       tmp;
   xhr.open("GET", url_link, false);
   xhr.onreadystatechange = function(e) {
      if( xhr.readyState === 4 && xhr.status === 200 ){
            tmp = xhr.responseText;
            callback(tmp);
      }else{
         errorFn(xhr.statusText);
      };
   };
   // error handle
   try{
      xhr.send(null);
   }catch(e){
      errorFn(e);
   };
};
// Query server for user login status
queryUserStatus = function queryUserStatus(){
   if( localUserStatus &&  localUserStatus === 'true' ){
      queryTreeVersion();
   }else{
      queryFunction(queryUserStatusURL, function(data){
         data = JSON.parse(data);
         if(data.account){
            userStatus = data.account;
            // Save user status to local storage
            localStorage.userStatus = userStatus;
         };
      });
      if(userStatus === 'true'){
         queryTreeVersion();
      };
   };
};
// Query tree version function
queryTreeVersion = function queryTreeVersion(){
   queryFunction(queryTreeID, function(data){
      data = JSON.parse(data);
      if(data.account && data.account === 'false')
         localStorage.userStatus = 'false';
      if(data.fileID){
         treeVersion = data.fileID;
         if(localTreeVersion){
            if(treeVersion === localTreeVersion){
               if(!localTreeData){
                  updateTreeData();
               };
            }else{
               updateTreeData();
            };
         }else{
            // Save tree version to local storage
            localStorage.treeVersion = treeVersion;
            updateTreeData();
         };
      };
   });
};
// Query tree data function
updateTreeData = function updateTreeData(){
   queryFunction(queryTreeDataURL, function(data){
      treeData = data;
   });
   // Save tree data to local storage
   localStorage.treeData = treeData;
};
init = function init(){
   if( typeof(Storage) === "undefined" )
      errorFn('Your browser is not support localStorage!');
};
init();
