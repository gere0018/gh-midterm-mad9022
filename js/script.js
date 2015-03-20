//TODO:add hammer.js instead of handle touch and handle nav and get it functional in spite of event .current target.
//TODO:js create UL with max 12 li and loop through contacts and display them in it.
//TODO: add all contacts to local storage. save contact info as object use JSON.
//TODO: add a dynamic map, register and get key.
//TODO:create modal window that will display contact info.
//TODO: double tap list view goes to map view, markers, contacts lat and long
//TODO: create back button functionality.
var app1_gere0018 = {
    pages:[],
    numPages:0,
    lists:[],
    numLists:0,
    initialize: function() {
      app1_gere0018.bindEvents();
    },
    bindEvents: function() {
      //document.addEventListener('deviceready', app1_gere0018.onDeviceReady, false);
      document.addEventListener("DOMContentLoaded", app1_gere0018.onDomReady, false);
    },
//    onDeviceReady: function() {
//        //When device is ready read the contacts on the device
//     var options = new ContactFindOptions( );
//        options.filter = "";  //leaving this empty will find return all contacts
//        options.multiple = true;  //return multiple results
//        var filter = ["displayName"];
//        navigator.contacts.find(filter, app1_gere0018.contactsSuccess, app1_gere0018.contactsError, options);
//    },
    // Update DOM on a Received Event
    onDomReady: function(id) {
      app1_gere0018.prepareNavigation();
    },

    prepareNavigation:function(){
        //add hammer Listeners to toggle menu icon
       pages = document.querySelectorAll('[data-role="page"]');
	   numPages = pages.length;
	   lists = document.querySelectorAll(".tab");
	   numLists = lists.length;
        //loop through my lists and add hammer
	   for(var i=0;i<numLists; i++){
           var hammerLists = new Hammer(lists[i]);
           hammerLists.on('tap', app1_gere0018.handleNav);
            //FUTURE:add listener to browser's back button

        }
         //load the first page with url=null
           app1_gere0018.loadPage(null);
         //FUTURE: remove this when testing on device. temp for browser testing.
           app1_gere0018.contactsSuccess;

    },
    handleNav:function (ev){
        ev.preventDefault();// preventing page reload
        var href = ev.target.href;
        var parts = href.split("#");//returns an array with 2 strings, the string before # and the string after the #.
        app1_gere0018.loadPage( parts[1] );
        app1_gere0018.contactsSuccess;
        return false;

    },

    //Deal with history API and switching divs
    loadPage:function ( url ){
        if(url == null){
            //home page first call
            pages[0].className = "activePage";
            history.pushState(null, null, "#contacts");
            setTimeout(function(){
                window.scrollTo(0,0);
            },100);

        }else{
            //loop through pages
            for(var i=0; i < numPages; i++){
                //In Page:for the selected page to become active page
              if(pages[i].id == url){
                  pages[i].className = "activePage pt-page-rotateInNewspaper pt-page-delay500";

                    setTimeout(function(){
                        window.scrollTo(0,0);
                    },100);
//                      if(pages[i].id == "location"){
//                      app1_gere0018.setLocation();
//                      }

                history.pushState(null, null, "#" + url);
                }else{
                    //Out Page:for the other page that was active and will be replaced
                      var classes = pages[i].getAttribute("class");
                      if (classes && (-1 !== classes.indexOf("activePage"))){
                           pages[i].className = "activePage pt-page-rotateOutNewspaper";
                        setTimeout(function(pg){
                           pg.classList.remove("activePage");
                           pg.classList.remove("pt-page-rotateOutNewspaper");
                            }, 1000, pages[i]);
                       }
                    }
            }

        }
        //loop through lists
          for(var t=0; t < numLists; t++){
                lists[t].firstChild.classList.remove("activeTab");
            //location is a property of the window object that returns current location
              //url of the document.
                  if(lists[t].firstChild.href == window.location.href){
                    lists[t].firstChild.classList.add("activeTab");
                  }

            }
            app1_gere0018.contactsSuccess;

    },

    contactsSuccess: function (){
        console.log("success");
        var contactsOutput = document.querySelector("#contactsOutput");
         //for( var i=0; i<contacts.length; i++){
           // contactsOutput.innerHTML = "<li [data-ref="i"]>" + deviceContacts[i].displayName
                                        //+ "</li>";
        var listItem = document.querySelectorAll('[data-ref^="li-"]');
         for( var i=0; i<listItem.length; i++){
             var hammerListItem = new Hammer(listItem[i]);
             hammerListItem.on('tap', app1_gere0018.displayContact);
             hammerListItem.on('doubletap', app1_gere0018.displayLocation);
         }



    },
   displayContact: function(){
      console.log("contact display");

   },
    displayLocation: function(){
       alert(this);

   },
    contactsError:function (){
        alert("sorry !! we are not able to load your contact right now!!")

    }

 };

app1_gere0018.initialize();
