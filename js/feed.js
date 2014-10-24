var count = 0;
var feeds;
var feed = { _id:undefined, _type:undefined, _time:undefined};

function showMyImage(fileInput) {
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            var img=document.getElementById("thumbnil");
            img.file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
     }
}

function Feed(id, type, time) {
    this._id = id;
    this._type = type;
    this._time = time;
}

Feed.protype = {
    getId: function() { return this._id;},
    getType: function() { return this._type;}
};
function addFeed() {

    count ++;
    var feedValue = document.getElementById("feedArea").value;
    if(feedValue == null || feedValue == "") {
        alert("Feed Should not be empty!!!");
        return;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var date = currentTime.getDate();
    var time = format(currentTime);
    var dateAndTime = month+"/"+date+"/"+year+" "+time;

    var detailFeed = undefined;
    if (validUrl(feedValue)) {
        // URL FEED
        var feed = new Feed(count, "url", dateAndTime)
        detailFeed = Object.create(feed);
    } else {
        // Text Feed
        var feed = new Feed(count, "text", dateAndTime);
        detailFeed = Object.create(feed);
    }
    detailFeed.content = feedValue;
    createFeed(detailFeed);
}

function createFeed(feed) {
    feeds = feeds || [];
    feeds.push(feed);
    document.getElementById("feedArea").value = "";
    showFeed();
}

function getFeeds() {
    feeds = feeds || [];
}
function showFeed() {

    var listStr = "";
    if(feeds.length==0) {
        document.getElementById("feedList").innerHTML = listStr;
        return;
    }
    for (var i = 0; i < feeds.length; i++) {
            var currentFeed = feeds[i];
            var listStartTag = "<li id=\"listofpost\" style=\"margin-bottom: 10px;\">";
            var divStartTag = (currentFeed._type == "text") ? "<div id=\"text\">" : "<div id=\"url\">" ;
            var userImageTag = "<img src=\"images\/profile_default.jpg\" id=\"userImage\" align=\"center\">";
            var feedValuesTag = (currentFeed._type == "text") ? "<label id=\"feedValues\">"
            +currentFeed.content+"</label>": "<label id=\"feedValues\" onClick=\"redirectUrl("+i+")\">"+currentFeed.content+"</label>" ;
            var closeBtmTag = "<img src=\"images\/delete.png\" id=\"closeBtn\" onClick=\"deleteFeed("+ i +")\">";
            var timeTag = "<label id=\"feedTime\">"+currentFeed._time+"</label>";
            var divEndTag = "</div>";
            var listEndTag = "</li>";
            var listItem = listStartTag + divStartTag + userImageTag + feedValuesTag + closeBtmTag + timeTag + divEndTag + listEndTag;
            listStr += listItem;
            document.getElementById("feedList").innerHTML = listStr;
    }
}
function validUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+ '(\\#[-a-z\\d_]*)?$','i');
    return (!pattern.test(str) ? false : true);
}

function storeProfile() {
    var name = document.getElementById("name").value, age = document.getElementById("age").value,
        phoneno = document.getElementById("phoneno").value, email = document.getElementById("email").value,
        description = document.getElementById("description").value, imagefile = document.getElementById("imagefile").value;

    localStorage.setItem('user', JSON.stringify({
        name: name,
        age: age,
        phoneno: phoneno,
        email: email,
        description: description,
        imagefile: imagefile }));
       var user = JSON.parse(localStorage.getItem('user'));
        alert("Profile saved...");
}

function format(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function deleteFeed(id) {
    feeds.splice(id, 1);
    showFeed();
}
function redirectUrl(url) {
    var selectedUrl = feeds[url];
    window.open("http://"+selectedUrl.content);
}
function logout() {
    var isLogout = confirm("Do you want to log out?");
    if(isLogout) window.location="index.html";
}
