$(document).ready(function(){
    $('#submit_button').on('click', function(){
        var d = new Date($('#twitter_date').val());
        var chosen_date = (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear();
        document.getElementById("searching_msg").innerText = "Searching for most popular hashtags on " + chosen_date + "...";
        document.getElementById("top_hashtags").innerText = "Top Hashtags:";
    });
});
