$('.nav-item').click(function () {

    if (this.id.substr(0, 2) != 'my') {
        $(curactive).removeClass("active");
        $(this).addClass("active");
        curactive = $(this);
        if (cursubactive != null) {
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
    parentNode = this.id.substr(0, 8);
    $(curactive).removeClass("active");
    $(parentNode).addClass("active");
    curactive = $(parentNode);

});


function loadNavData(loadURL) {
    $.getJSON(loadURL).done(function (data) {


        for (var i = 0; i < data.summary.length; i++) {
            if (data.summary[i].value > 0) {
                $('#' + data.summary[i].stat).html(data.summary[i].value);
                $('#' + data.summary[i].stat).show();

            } else {
                $('#' + data.summary[i].stat).html("");
                $('#' + data.summary[i].stat).hide();

            }
        };

    });

};

function assignPortalAccess() {
    //    admin
    if (urole == 1) {
        accessctr = {
            "maindashdrill": 1,
            "submitinvestigate": 1,
            "submitcasereview": 1,
            "submitrevokerequest": 1,
            "submitreactivaterequest": 1,
            "submitreactivatereview": 1,
            "submitactiondone": 1,
            "revokestaff": "all",
            "reactivatestaff": "all",
            "searchstaff": "all",


            "menusshow": [
                {
                    "menuname": "masterDash",
                    "menuvis": 1
                },
                {
                    "menuname": "userDash",
                    "menuvis": 0
                },
                {
                    "menuname": "myInvest",
                    "menuvis": 1
                },
                {
                    "menuname": "myMonito",
                    "menuvis": 1
                },
                {
                    "menuname": "searchStaff",
                    "menuvis": 1
                },
                {
                    "menuname": "myRevoke",
                    "menuvis": 1
                },
                {
                    "menuname": "myReview",
                    "menuvis": 1
                },
                {
                    "menuname": "myAction",
                    "menuvis": 1
                },
                 {
                    "menuname": "supportCenter",
                    "menuvis": 1
                }       
      
        ]
        };
    };
    //    investigator
    if (urole == 2) {
        accessctr = {
            "maindashdrill": 0,
            "submitinvestigate": 1,
            "submitcasereview": 1,
            "submitrevokerequest": 1,
            "submitreactivaterequest": 1,
            "submitreactivatereview": 1,
            "submitactiondone": 1,
            "revokestaff": "team",
            "reactivatestaff": "team",
            "searchstaff": "team",


            "menusshow": [
                {
                    "menuname": "masterDash",
                    "menuvis": 1
                },
                {
                    "menuname": "userDash",
                    "menuvis": 1
                },
                {
                    "menuname": "myInvest",
                    "menuvis": 1
                },
                {
                    "menuname": "myMonito",
                    "menuvis": 1
                },
                {
                    "menuname": "searchStaff",
                    "menuvis": 1
                },
                {
                    "menuname": "myRevoke",
                    "menuvis": 1
                },
                {
                    "menuname": "myReview",
                    "menuvis": 0
                },
                {
                    "menuname": "myAction",
                    "menuvis": 0
                },
                 {
                    "menuname": "supportCenter",
                    "menuvis": 1
                }   
        ]
        };
    };

    //    BM
    if (urole == 3) {
        accessctr = {
            "maindashdrill": 1,
            "submitinvestigate": 1,
            "submitcasereview": 1,
            "submitrevokerequest": 1,
            "submitreactivaterequest": 1,
            "submitreactivatereview": 1,
            "submitactiondone": 1,
            "revokestaff": "all",
            "reactivatestaff": "all",
            "searchstaff": "all",


            "menusshow": [
                {
                    "menuname": "masterDash",
                    "menuvis": 1
                },
                {
                    "menuname": "userDash",
                    "menuvis": 0
                },
                {
                    "menuname": "myInvest",
                    "menuvis": 1
                },
                {
                    "menuname": "myMonito",
                    "menuvis": 1
                },
                {
                    "menuname": "searchStaff",
                    "menuvis": 1
                },
                {
                    "menuname": "myRevoke",
                    "menuvis": 1
                },
                {
                    "menuname": "myReview",
                    "menuvis": 1
                },
                {
                    "menuname": "myAction",
                    "menuvis": 1
                },
                 {
                    "menuname": "supportCenter",
                    "menuvis": 1
                }   
        ]
        };
    };

    //    cao, reactivate approver
    if (urole == 5) {
        accessctr = {
            "maindashdrill": 1,
            "submitinvestigate": 0,
            "submitcasereview": 0,
            "submitrevokerequest": 0,
            "submitreactivaterequest": 0,
            "submitreactivatereview": 0,
            "submitactiondone": 0,
            "revokestaff": "none",
            "reactivatestaff": "none",
            "searchstaff": "all",
            "menusshow": [
                {
                    "menuname": "masterDash",
                    "menuvis": 1
                },
                {
                    "menuname": "userDash",
                    "menuvis": 0
                },
                {
                    "menuname": "myInvest",
                    "menuvis": 0
                },
                {
                    "menuname": "myMonito",
                    "menuvis": 1
                },
                {
                    "menuname": "searchStaff",
                    "menuvis": 1
                },
                {
                    "menuname": "myRevoke",
                    "menuvis": 0
                },
                {
                    "menuname": "myReview",
                    "menuvis": 1
                },
                {
                    "menuname": "myAction",
                    "menuvis": 0
                },
                 {
                    "menuname": "supportCenter",
                    "menuvis": 1
                }   
        ]
        };
    };
    //    physical security, revoke & reactivate executor
    if (urole == 6) {
        accessctr = {
            "maindashdrill": 1,
            "submitinvestigate": 0,
            "submitcasereview": 0,
            "submitrevokerequest": 0,
            "submitreactivaterequest": 0,
            "submitreactivatereview": 0,
            "submitactiondone": 1,
            "revokestaff": "none",
            "reactivatestaff": "none",
            "searchstaff": "all",
            "menusshow": [
                {
                    "menuname": "masterDash",
                    "menuvis": 1
                },
                {
                    "menuname": "userDash",
                    "menuvis": 0
                },
                {
                    "menuname": "myInvest",
                    "menuvis": 0
                },
                {
                    "menuname": "myMonito",
                    "menuvis": 0
                },
                {
                    "menuname": "searchStaff",
                    "menuvis": 1
                },
                {
                    "menuname": "myRevoke",
                    "menuvis": 0
                },
                {
                    "menuname": "myReview",
                    "menuvis": 0
                },
                {
                    "menuname": "myAction",
                    "menuvis": 1
                },
                 {
                    "menuname": "supportCenter",
                    "menuvis": 1
                }   
        ]
        };
    };
};
var uid = null;
var urole = null;
var uname = null;

var curactive = null;
var cursubactive = null;

var totcase = null;
var nonresp = null;
var healthcase = null;
var closecontact = null;
var hadcontact = null;
var curinhubei = null;
var beenhubei = null;
var backhubei = null;
var totreview = null;
var reviewlist = null;
var totaction = null;
var actionlist = null;



var assignAccess = null;

var maindashdrill = null;
var submitinvestigate = null;
var submitcasereview = null;
var submitrevokerequest = null;
var submitreactivaterequest = null;
var submitreactivatereview = null;
var submitactiondone = null;
var revokestaff = null;
var reactivatestaff = null;
var searchstaff = null;
var menusshow = null;

var navdatalink = null;


$(function () {

    uid = window.parent.userid;
    urole = window.parent.userrole;
    uname = window.parent.username;
    curactive = $("#masterDash");

    if (uname != null) {
        $('#usrnm').html(uname);
    }

    assignPortalAccess();
    maindashdrill = accessctr.maindashdrill;
    submitinvestigate = accessctr.submitinvestigate;
    submitcasereview = accessctr.submitcasereview;
    submitrevokerequest = accessctr.submitrevokerequest;
    submitreactivaterequest = accessctr.submitreactivaterequest;
    submitreactivatereview = accessctr.submitreactivatereview;
    submitactiondone = accessctr.submitactiondone;
    revokestaff = accessctr.revokestaff;
    reactivatestaff = accessctr.reactivatestaff;
    searchstaff = accessctr.searchstaff;
    menusshow = accessctr.menusshow;


    for (var i = 0; i < accessctr.menusshow.length; i++) {
        if (accessctr.menusshow[i].menuvis == 1) {
            $('#' + accessctr.menusshow[i].menuname).show();
        } else {
            $('#' + accessctr.menusshow[i].menuname).hide();
        }
    };

    navdatalink = '../json/nav.json';
    //    navdatalink = 'http://serverlink?userid=' + uid;
    //    only uid required for parameter
    loadNavData(navdatalink);

});
