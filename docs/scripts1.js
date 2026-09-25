sub.on("publication", function (ctx) {
    container.innerHTML = ctx.data.value;
    document.title = ctx.data.value;
})
    .on("subscribing", function (ctx) {
        console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
    })
    .on("subscribed", function (ctx) {
        console.log("subscribed", ctx);
    })
    .on("unsubscribed", function (ctx) {
        console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
    })
    .subscribe();

async function sendText(parametrs = "") {
    data = $("#sendTextarea")[0].value;

    if (parametrs != "") {
        data = JSON.stringify(parametrs);
    }

    data = JSON.parse(data);

    data.idempotency_key = "123455";

    data = JSON.stringify(data);

    data;

    try {
        // 3. Отправляем данные и ждем ответ

        const response = await centrifuge.rpc("data", data);
        // const response = await centrifuge.rpc('data', JSON.stringify(parametrs));

        message = response.data.message;

        if (message.length === 0) {
            return;
        }

        if (parametrs.actionApi == "testerAPI/savePattern") {
            getListPatterns(response);
            $("#receivedTextArea").val(JSON.stringify(response));
        } else if (parametrs.actionApi == "testerAPI/getPatterns") {
            getListPatterns(response);
            $("#receivedTextArea").val(JSON.stringify(response));
        } else {
            $("#receivedTextArea").val(JSON.stringify(response));

            $("#beatyJson").html(JSON.stringify(response, null, 2));
        }

        console.log("Ответ от сервера:", response);
    } catch (err) {
        console.error("Ошибка при отправке RPC:", err);

        sendText();
    }
}

$(document).ready(function () {
    // Добавление нового поля
    $("#add-field").click(function () {
        var newField =
            '<div class="field-row"><input type="text" name="parametr" placeholder="parametr">|<textarea type="text" name="valuem" placeholder="value">' +
            '<br></textarea> <button type="button" class="remove-field">Удалить</button></div>';
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
