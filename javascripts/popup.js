$(document).ready(function(){
   var currentData;
   var mailList = '',
       googleLoginURL = chrome.extension.getBackgroundPage().googleOauth,
       tree,
       treeSelect;
   // The function for generate tree, please refer to the website: https://code.google.com/p/dynatree/
   tree = function tree(){
      $('#tree').dynatree({
         checkbox: true,
         selectMode: 3,
         children: currentData,
         onSelect: function(select, node){
            // For the example, It don't have group email so set the group mail to "nodeName",
            // In the feature want to select group email, just comment it.
            var rootName = 'nodeName';
            var selNodes = node.tree.getSelectedNodes();
            var selKeys = $.map(selNodes, function(node){
               if(node.data.key !== 'nodeName')
                  return node.data.key;
            });
            mailList = selKeys.join(", ");
            // send mail from popup.html to content javascript
            chrome.tabs.query({active:true, currentWindow:true}, function(tab){
               chrome.tabs.sendMessage(tab[0].id, {stuff: mailList });
            });
         },
         onClick: function(node, event){
            if(node.getEventTargetType(event) === 'title')
               node.toggleSelect();
         },
         onKeydown: function(node, event){
            if(event.which == 32){
               node.toggleSelect();
               return false;
            }
         }
      });
   };
   // select all function
   treeSelect = function treeSelect(key){
      $("#tree").dynatree("getRoot").visit(function(node){
         node.select(key);
      });
      return false;
   };
   $('a').on('click', function(e){
      var linkName = $(this).attr('href');
      switch (linkName){
         case '#selectAll':
            treeSelect(true);
            break;
         case '#cancelAll':
            treeSelect(false);
            break;
         case '#error':
            $('#errorMsg').slideToggle('fast');
            break;
      };
   });
   // init
   var init = function init(){
      chrome.extension.getBackgroundPage().queryUserStatus();
      var connectError = chrome.extension.getBackgroundPage().errorMsg;
      var login = localStorage.userStatus || '';
      if(connectError){
         $('#errorMsg').html(connectError);
         $('#offlineMsg').removeClass('hide');
         chrome.browserAction.setBadgeText({text:'Error'});
      }else{
         chrome.browserAction.setBadgeText({text:''});
      };
      if( login === 'false' || login === ''){
         $('#google-login').removeClass('hide').find('a').attr('href', googleLoginURL);
      }else{
         $('.tree').removeClass('hide');
         if(localStorage.treeData){
            currentData = JSON.parse(localStorage.treeData);
            tree();
         };
      };
   };
   init();
});
