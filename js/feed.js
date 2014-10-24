use 'restrict';
var feed = [];
var filePath = document.getElementById('selected_image').value;
document.getElementById("imgtest").src = filePath;
function showHide(obj) {
    if (1 == obj) {
            document.getElementById('q'+i).style.display = 'block';
        } else {
            document.getElementById('q'+i).style.display = 'none';
        }
}
function addNewItem() {
    var textBox = document.getElementById('feedArea').value;
        feed.push(textBox);
        for(var i=0;i<feed.length;i++) {
            console.log(feed[i]);
        }
}

