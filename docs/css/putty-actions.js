// sendPuttyData

function sendPuttyData() {
    post = {};
    post.action = "send-putty-data";
    post.typeSSHClient = $("#type-ssh-client").val();
    post.puttyData = $("#pattern-code").val();

    ajaxRequest("/api.php", post).done(function (data) {
        arr = toArray(data);
        result = toArray(arr.Result);

        if (result.ack == "true") {
            $("#log_action_area").val(result.result);

            ipwsList = $(".ipwslist");
        } else {
            alert(JSON.stringify(arr));
        }
    });
}

function actionClient(nameAction) {
    post = {};
    post.action = "action-client";
    post.nameAction = nameAction;

    ajaxRequest("/api.php", post).done(function (data) {
        arr = toArray(data);
        result = toArray(arr.Result);

        if (result.ack == "true") {
            $("#log_action_area").val(result.result);

            ipwsList = $(".ipwslist");
        } else {
            alert(JSON.stringify(arr));
        }
    });
}
