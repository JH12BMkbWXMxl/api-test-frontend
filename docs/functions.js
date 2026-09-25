function getListPatterns(response) {
    //listPattern = JSON.parse(response.data.message.text);

    html = "<table><tbody>";
    $("#pattern-list").append(html);

    for (const [key, value] of Object.entries(response.data.message)) {
        value;

        var newField =
            '<tr class="pattern-row" id="pattern-id-' +
            value.id +
            '"><td><div  onclick="pastePattern(' +
            value.id +
            ", '" +
            value.titleName +
            '\')" class="field-row1">' +
            value.id +
            "|" +
            value.title +
            '<input type="hidden" id="text_pattern_' +
            value.id +
            '" value="' +
            encodeURIComponent(value.text) +
            '">' +
            '</td><td><button type="button" onclick="deletePattern(' +
            value.id +
            ')">Удалить</button></div></div></td></tr>';
        $("#pattern-list").append(newField);
    }

    html = "</tbody></table>";
    $("#pattern-list").append(html);
}

function pastePattern(id, title) {
    pattern = $("#text_pattern_" + id)[0].value;

    pattern = decodeURIComponent(pattern);
    patternList = JSON.parse(pattern);

    pattern;

    $(".field-row").remove();

    $("#endpoint-name-value")[0].value = patternList.actionApi;
    $("#endpoint-save-name")[0].value = title;

    for (const [key, value] of Object.entries(patternList)) {
        var newField =
            '<div class="field-row"><input type="text" name="parametr" value="' +
            key +
            '">|<textarea type="text" name="valuem">' +
            value +
            '</textarea> <button type="button" class="remove-field">Удалить</button></div>';

        var newField = `                    
        <div style="margin-bottom: 10px;" class="field-row pure-g margins-block">
            <input name="parametr" class="pure-u-1-4" id="endpoint-name1" placeholder="parametr" value="${key}"  type="text"  />
            <textarea name="valuem" style="margin-left: 5px;" class="pure-u-1-2">${value}</textarea>

            <button style="margin-left: 5px;" class="pure-u-1-5 pure-button pure-button-primary remove-field"  type="submit">Удалить</button>
        </div>`;
        $("#fields-container").append(newField);
    }

    // Вставить в топ лист
    isPaste = true;
    $("#pattern-top-list .pattern-row").each(function (index, element) {
        // 'index' — это порядковый номер элемента (начиная с 0)
        // 'element' (или 'this') — это текущий DOM-элемент в цикле

        // Пример: получить HTML-содержимое каждого ряда
        var content = $(this).html();
        var elementId = $(this).attr("id");

        idPattern = elementId.replace("pattern-id-", "");

        if (idPattern == id) {
            isPaste = false;
        }
    });

    if (isPaste === true) {
        paternId = $(`#pattern-id-${id}`).prop("outerHTML");
        $("#pattern-top-list").append(paternId);

        localStorage.setItem("pattern", "Иван");
    }
}

function deletePattern(id) {
    parametrs = {
        actionApi: "testerAPI/deletePattern",
        id: id,
        password: $("#testerKeyCode").val(),
    };
    sendText(parametrs);
}

function getApiPattern() {
    list = {};

    $(".field-row").each(function (index, element) {
        parametrEl = element.querySelector('[name="parametr"]');
        valueEl = element.querySelector('[name="valuem"]');

        list[parametrEl.value] = valueEl.value;
    });

    list["actionApi"] = $("#endpoint-name-value")[0].value;
    $("#sendTextarea").val(JSON.stringify(list));

    return list;
}

async function getPatternList() {
    parametrs = {
        actionApi: "testerAPI/getPatterns",
    };
    sendText(parametrs);
}
