$(document).ready(function () {
    // Добавление нового поля
    $("#add-field").click(function () {
        var newField = `                    
        <div style="margin-bottom: 10px;" class="field-row pure-g margins-block">
            <input name="parametr" class="pure-u-1-4" id="endpoint-name1" placeholder="parametr"  type="text"  />
            <textarea name="valuem" style="margin-left: 5px;" class="pure-u-1-2" placeholder="value" id="endpoint-name-value1"  type="text" /></textarea>

            <button style="margin-left: 5px;" class="pure-u-1-5 pure-button pure-button-primary remove-field"  type="submit">Удалить</button>
        </div>`;
        $("#fields-container").append(newField);
    });

    $("#save-endpoint").click(function () {
        nameEndPoint = $("#endpoint-save-name")[0];
        if (nameEndPoint.value == "") {
            alert("empty name endpoint");
            return;
        }

        apiConfig = $("#api-config")[0].innerHTML;

        apiPattern = getApiPattern();

        parametrs = {
            actionApi: "testerAPI/savePattern",
            patternTitle: nameEndPoint.value,
            patternText: JSON.stringify(apiPattern),
            password: $("#testerKeyCode").val(),
        };

        sendText(parametrs);
    });

    $("#set-query").click(function () {
        list = {};

        $(".field-row").each(function (index, element) {
            parametrEl = element.querySelector('[name="parametr"]');
            valueEl = element.querySelector('[name="valuem"]');

            list[parametrEl.value] = valueEl.value;
        });

        list["actionApi"] = $("#endpoint-name-value")[0].value;
        $("#sendTextarea").val(JSON.stringify(list));
    });

    // Удаление поля (используем делегирование событий, так как кнопка создана динамически)
    $("#fields-container").on("click", ".remove-field", function () {
        $(this).parent(".field-row").remove();
    });
});

function sendT() {
    const isLocal =
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "[::1]" ||
        location.protocol === "file:";

    if (isLocal) {
        wsData = "ws://localhost/connection/websocket";
        httData = "/http";
    } else {
        wsData = "wss://" + getIP() + "/connection/websocket";
        httData = "https://" + getIP() + "/http";
    }
    // endpoint-name-value
    endPoint = $("#endpoint-name-value").val();
    postData = $("#sendTextarea").val();

    // Данные, которые хотим отправить
    let dataToSend = {
        id: "pattern-123",
        text: "Привет, сервер!",
    };
    postData = JSON.parse(postData);

    // Отправка POST-запроса
    $.post(httData + "?actionApi=" + endPoint, postData, function (response) {
        // Этот код выполнится при успешном ответе от сервера
        console.log("Ответ сервера:", response);
        $("#receivedTextArea").val(response);
        // receivedTextArea
    }).fail(function (error) {
        // Если произошла ошибка
        console.error("Ошибка отправки:", error);
    });
}
