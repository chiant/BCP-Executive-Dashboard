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

        totcase = data.totcase;
        nonresp = data.nonresp;
        healthcase = data.healthcase;
        closecontact = data.closecontact;
        hadcontact = data.hadcontact;
        curinhubei = data.curinhubei;
        beenhubei = data.beenhubei;
        backhubei = data.backhubei;
        totreview = data.totreview;
        reviewlist = data.reviewlist;
        totaction = data.totaction;
        actionlist = data.actionlist;


        if (totcase > 0) {
            $('#totcase').show();
            $('#totcase').html(totcase);
        } else {
            $('#totcase').hide();
        };
        if (nonresp > 0) {
            $('#nonresp').show();
            $('#nonresp').html(nonresp);
        } else {
            $('#nonresp').hide();
        };
        if (healthcase > 0) {
            $('#healthcase').show();
            $('#healthcase').html(healthcase);
        } else {
            $('#healthcase').hide();
        };
        if (closecontact > 0) {
            $('#closecontact').show();
            $('#closecontact').html(closecontact);
        } else {
            $('#closecontact').hide();
        };
        if (hadcontact > 0) {
            $('#hadcontact').show();
            $('#hadcontact').html(hadcontact);
        } else {
            $('#hadcontact').hide();
        };
        if (curinhubei > 0) {
            $('#curinhubei').show();
            $('#curinhubei').html(curinhubei);
        } else {
            $('#curinhubei').hide();
        };
        if (beenhubei > 0) {
            $('#beenhubei').show();
            $('#beenhubei').html(beenhubei);
        } else {
            $('#beenhubei').hide();
        };
        if (backhubei > 0) {
            $('#backhubei').show();
            $('#backhubei').html(backhubei);
        } else {
            $('#backhubei').hide();
        };
        if (totreview > 0) {
            $('#totreview').show();
            $('#totreview').html(totreview);
        } else {
            $('#totreview').hide();
        };
        if (reviewlist > 0) {
            $('#reviewlist').show();
            $('#reviewlist').html(reviewlist);
        } else {
            $('#reviewlist').hide();
        };
        if (totaction > 0) {
            $('#totaction').show();
            $('#totaction').html(totaction);
        } else {
            $('#totaction').hide();
        };
        if (actionlist > 0) {
            $('#actionlist').show();
            $('#actionlist').html(actionlist);
        } else {
            $('#actionlist').hide();
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


var navdatalink = null;

var assignAccess = null;


$(function () {

    uid = window.parent.userid;
    urole = window.parent.userrole;
    uname = window.parent.username;
    curactive = $("#masterDash");

    if (uname != null) {
        $('#usrnm').html(uname);
    }
    
    assignPortalAccess();
    
    for (var i=0;i<accessctr.menusshow.length;i++){
        if (accessctr.menusshow[i].menuvis == 1) {
            $('#'+accessctr.menusshow[i].menuname).show();
        } else {
            $('#'+accessctr.menusshow[i].menuname).hide();
        }
    };

    navdatalink = '../json/nav.json';
    //    navdatalink = 'http://serverlink?userid=' + uid;
    //    only uid required for parameter
    loadNavData(navdatalink);

});
