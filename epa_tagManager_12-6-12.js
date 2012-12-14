<script type="text/javascript">

 /* 

   * Get Root Domain- Used for Google Analytics _setDomainName & _addIgnoredRef

	 * 

	 */



var epaGA_hostName= window.location.hostname;

var epaGA_hostArray= epaGA_hostName.split('.').slice(-2);

var epaGA_hostDomain= epaGA_hostArray.join('.').toLowerCase();





 /* 

	 * Get Google Analytics Visitor Cookie

	 * 

	 */

	

	function getCookie(c_name)

	{

	var i,x,y,ARRcookies=document.cookie.split(";");

	for (i=0;i<ARRcookies.length;i++)

	  {

	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));

	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);

	  x=x.replace(/^\s+|\s+$/g,"");

	  if (x==c_name)

	    {

	    return unescape(y);

	    }

	  }

	}

	

var epaGA_visitorIdCookie=getCookie("__utma");

if (epaGA_visitorIdCookie!=null && epaGA_visitorIdCookie!="")
{
var epaGA_visitorIDCookieSplit= epaGA_visitorIdCookie.split(".");
var epaGA_gaVisitorID= (epaGA_visitorIDCookieSplit[1]);

  }

else 
  {
 epaGA_gaVisitorID="one and done visitor"
   }

	/* START For Cross Domain Tracking Use Visitor ID from __utma query param instead of cookie */

	function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}	

if(window.location.href.indexOf('__utma') > 1){
	epaGA_gaVisitorID = getQuerystring('__utma').split('.')[1];
}//if 
else{
	//nothing
}//else

/* END For Cross Domain Tracking Use Visitor ID from __utma query param instead of cookie  */
	
	
 // Page Level Google Analytics Code
var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-32633028-2']);
 _gaq.push(['_setDomainName', epaGA_hostDomain]);
 _gaq.push(['_addIgnoredRef', epaGA_hostDomain]); 
 _gaq.push(['_setAllowLinker', true]); 
 _gaq.push(['_setCustomVar',1,'visitor id',epaGA_gaVisitorID,1]);
 _gaq.push(['_trackPageview']);
 
 _gaq.push(['GSA._setAccount', 'UA-33523145-1']); // Parallel tracking to GSA 
 _gaq.push(['GSA._setDomainName', epaGA_hostDomain]); // Parallel tracking to GSA
 _gaq.push(['GSA._addIgnoredRef', epaGA_hostDomain]);  // Parallel tracking to GSA
 _gaq.push(['GSA._setAllowLinker', true]);  // Parallel tracking to GSA - will use referring site's cookies sent in URL 
 _gaq.push(['GSA._setCustomVar', 3, 'Agency', 'EPA', 3]); // Page level variable sent only to GSA account
 _gaq.push(['GSA._setCustomVar', 4, 'Sub-Agency', 'EPA - ' + epaGA_hostName, 3]); // Page level variable sent only to GSA account
 _gaq.push(['GSA._setCustomVar', 5, 'Code Ver', 'EPA 1.0 121211', 3]); // Page level variable sent only to GSA account
 _gaq.push(['GSA._trackPageview']); // Parallel tracking to GSA

 
 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();


 /************START Google Analytics Download & External Link & Mailto & Cross Domain Tracking******************/


//Helper function to safely attach to a link

var unobtrusiveAddEvent = function (element, event, fn) { 
	try { 
		var old = element[event] ? element[event] : function () {}; 
		element[event] = function () {fn.call(this);return old.call(this);}; 
	} 
	catch (err) { 
	} 
};

function trackDownloads(){

var myLinks = document.links;

//Specify Filetypes Tracked
var fileTypes = ['zip','exe','pdf','doc','xls','ppt','mp3','csv','docx','xlsx','pptx'];

//Specify Cross Domains Tracked
var crossDomains = ['epa.gov','epa-otis.gov','epa-echo.gov','energystar.gov','enviroflash.info','airnow.gov','urbanwaters.gov','relocatefeds.gov','lab21century.gov','supportportal.gov'];

var theLink ='';
var theValue = '';
var theType = '';
var theTarget = '';

function track(type, theLink, val1, target){
	if(target == ""){
	  target = "_self";
	}
	try{
		if(type == "Email"){
			setTimeout("window.open('"+theLink.href+"','"+ target+"')", 200);
			_gaq.push(['_trackEvent', type, "Link Click", val1]);	
			_gaq.push(['GSA._trackEvent', type, "Link Click", val1]);  // Parallel tracking to GSA	
		}
		else if(type == "Download"){
			setTimeout("window.open('"+theLink.href+"','"+ target+"')", 200);
			_gaq.push(['_trackEvent', type, val1 + ' Click', theLink.href]);	
			_gaq.push(['GSA._trackEvent', type, val1 + ' Click', theLink.href]);  // Parallel tracking to GSA
		}
		else if(type == "External" && document.location.hostname != theLink.hostname){
			setTimeout("window.open('"+theLink.href+"','"+ target+"')", 200);
			_gaq.push(['_trackEvent', type, val1, theLink.href]);
			_gaq.push(['GSA._trackEvent', type, val1, theLink.href]);// Parallel tracking to GSA	

		}//close firstIf
		else
			window.open(theLink.href, target);
	}catch(e){}
};//close track



	for(var i=0;i < myLinks.length;i++) {
		if(myLinks[i].onclick != null || myLinks[i].href.indexOf("javascript:") > -1){
			continue;
		}
		var download = false;
		for(var k=0;k < fileTypes.length; k++) {
			if(myLinks[i].href.indexOf("." + fileTypes[k]) > -1){					
				theLink = myLinks[i]
				theValue = fileTypes[k];
				theTarget = myLinks[i].target;
				theType = "Download";
				theTarget = myLinks[i].target;
				var f =function(theType, theLink, theValue, theTarget){return function(){track(theType, theLink, theValue, theTarget); return false;};}(theType, theLink, theValue, theTarget);
				myLinks[i].onclick = f;
				download = true;
				break;
			}//close ifDownload
		}//close fileTypesLoop		
		if(download == false){
			if(myLinks[i].href.indexOf("mailto:") > -1){
				theLink = myLinks[i]
				theTarget = null;
				theValue = myLinks[i].href.slice(7);
				theType = "Email";
				var g = function(theType, theLink, theValue, theTarget){return function(){track(theType, theLink, theValue, theTarget); return false;};}(theType, theLink, theValue, theTarget)
				myLinks[i].onclick = g;
			}//close ifMail
			else{
			
				//Cross Domain
				var crossDomain = false;
				for(c=0;c < crossDomains.length; c++){
					if((myLinks[i].href.indexOf(crossDomains[c])) > -1 && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)){
						_gaq.push(['_setAllowLinker', true]);
							myLinks[i].onclick = function(){
									_gaq.push(['_trackEvent', 'crossDomain', 'Link Click', this.href]);
									_gaq.push(['GSA._trackEvent', 'crossDomain', 'Link Click', this.href]);  // Parallel tracking to GSA
							       if (this.target == '_self' || this.target == '') {
										_gaq.push(['_link', this.href]);
									} else {
										window.open(_gat._getTrackers()[0]._getLinkerUrl(this.href), this.target);
									}
								return false;
							};
						crossDomain = true;
						break;
					}	
				}
				
				//External
				if((crossDomain == false) && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)){
					theLink = myLinks[i]
					theTarget = myLinks[i].target;
					theValue = "Link Click";
					theType = "External";
					var h = function(theType, theLink, theValue, theTarget){return function(){track(theType, theLink, theValue, theTarget);  return false;};}(theType, theLink, theValue, theTarget)
					myLinks[i].onclick = h;
				}
			}//close elseExternalLink
		}
	}//close myLinksLoop
}//close trackDownloads
unobtrusiveAddEvent(window, 'onload', trackDownloads);


 /************END Google Analytics Download & External Link & Mailto & Cross Domain Tracking******************/

// End Google Analytics
 </script>
