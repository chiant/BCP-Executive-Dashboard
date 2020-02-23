var uid = null;
var urole = null;
var uname = null;

var curactive = null;
var cursubactive = null;


$('.nav-item').click(function () {

    if (this.id.substr(0, 2) != 'my') {
        $(curactive).removeClass("active");
        $(this).addClass("active");
        curactive = $(this);
        if (cursubactive != null){
            $(cursubactive).removeClass("active");
            cursubactive = null;
        }

    } 

});


$('.collapse-item').click(function () {

        if (cursubactive != null) {
          $(cursubactive).removeClass("active");          
        }
        $(this).addClass("active");
        cursubactive = $(this);
        
        var parentNode = null;
        parentNode=this.id.substr(0,8);
        $(curactive).removeClass("active");
        $(parentNode).addClass("active");
        curactive = $(parentNode);

});


$(function () {

    uid = window.parent.userid;
    urole = window.parent.userrole;
    uname = window.parent.username;
    curactive = $("#masterDash");
    
    if (uname != null) {
        $('#usrnm').html(uname);
    }

    if (urole == "admin") {
        $('#userDash').hide();
    }

    if (urole == "investigator") {
        $('#myReview').hide();
    }
    
    if (urole == "cao") {
        $('#userDash').hide();
        $('#myInvest').hide();
        $('#myRevoke').hide();
   }    
    
    
});
