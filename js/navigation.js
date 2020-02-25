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
        

        if (totcase>0 ) {$('#totcase').html(totcase)}
        if (nonresp>0 ) {$('#nonresp').html(nonresp)};
        if (healthcase>0 ) {$('#healthcase').html(healthcase)};
        if (closecontact>0 ) {$('#closecontact').html(closecontact)};
        if (hadcontact>0 ) {$('#hadcontact').html(hadcontact)};
        if (curinhubei>0 ) {$('#curinhubei').html(curinhubei)};
        if (beenhubei>0 ) {$('#beenhubei').html(beenhubei)};
        if (backhubei>0 ) {$('#backhubei').html(backhubei)};
        if (totreview>0 ) {$('#totreview').html(totreview)};
        if (reviewlist>0 ) {$('#reviewlist').html(reviewlist)};
        if (totaction>0 ) {$('#totaction').html(totaction)};
        if (actionlist>0 ) {$('#actionlist').html(actionlist)};
    });

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
    
    navdatalink = '../json/nav.json';
//    navdatalink = 'http://serverlink?userid=' + uid;
//    only uid required for parameter
    loadNavData(navdatalink);

});
