function getListPatterns(response) {
    //listPattern = JSON.parse(response.data.message.text);

    html = "<table><tbody>";
    $("#pattern-list").append(html);

    for (const [key, value] of Object.entries(response.data.message)) {
        var newField = `
            <tr class="pattern-row" id="pattern-id-${value.id}">
                <td>
                    <div onclick="pastePattern(${value.id}, '${value.titleName.replace(/'/g, "\\'")}')" class="field-row1">
                        ${value.id}|${value.title}
                        <input type="hidden" id="text_pattern_${value.id}" value="${encodeURIComponent(value.text)}">
                        <input type="hidden" id="text_description_pattern_${value.id}" value="${encodeURIComponent(value.description_text)}">
                        <input type="hidden" id="text_result_pattern_${value.id}" value="${encodeURIComponent(value.result_text)}">
                    </div>
                </td>
                <td>
                    <button type="button" onclick="deletePattern(${value.id})">Удалить</button>
                </td>
            </tr>
        `;
        $("#pattern-list").append(newField);
    }

    html = "</tbody></table>";
    $("#pattern-list").append(html);
}

function pastePattern(id, title) {
    pattern = $("#text_pattern_" + id)[0].value;
    patternDescription = $("#text_description_pattern_" + id)[0].value;
    patternResult = $("#text_result_pattern_" + id)[0].value;

    pattern = decodeURIComponent(pattern);
    patternList = JSON.parse(pattern);

    patternDescription = decodeURIComponent(patternDescription);
    patternListDescription = JSON.parse(patternDescription);

    patternResult = decodeURIComponent(patternResult);
    //patternListResult = JSON.parse(patternResult);

    pattern;

    $(".field-row").remove();
    $(".field-row-2").remove();

    $("#endpoint-name-value")[0].value = patternList.actionApi;
    $("#endpoint-save-name")[0].value = title;

    $("#resultExampleTextArea").val("-");
    $("#resultText").html("<pre>-<pre>");

    for (const [key, value] of Object.entries(patternList)) {
        var newField = `                    
        <div style="margin-bottom: 10px;" class="field-row pure-g margins-block">
            <input name="parametr" class="pure-u-1-4" id="endpoint-name1" placeholder="parametr" value="${key}"  type="text"  />
            <textarea name="valuem" style="margin-left: 5px;" class="pure-u-1-2">${value}</textarea>

            <button style="margin-left: 5px;" class="pure-u-1-5 pure-button pure-button-primary remove-field"  type="submit">Удалить</button>
        </div>`;
        $("#fields-container").append(newField);

        if (patternListDescription === null) {
            newField = newField.replace("field-row", "field-row-2");
            $("#fields-container-2").append(newField);
        }
    }

    if (patternListDescription !== null) {
        for (const [key, value] of Object.entries(patternListDescription)) {
            var newField = `                    
            <div style="margin-bottom: 10px;" class="field-row-2 pure-g margins-block">
                <input name="parametr" class="pure-u-1-4" id="endpoint-name1" placeholder="parametr" value="${key}"  type="text"  />
                <textarea name="valuem" style="margin-left: 5px;" class="pure-u-1-2">${value}</textarea>

                <button style="margin-left: 5px;" class="pure-u-1-5 pure-button pure-button-primary remove-field-2"  type="submit">Удалить</button>
            </div>`;
            $("#fields-container-2").append(newField);
        }

        //

        resultText;

        $("#resultExampleTextArea").val(patternResult);
        $("#resultText").html("<pre>" + patternResult + "<pre>");
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

function getApiPatternDescription() {
    list = {};

    $(".field-row-2").each(function (index, element) {
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
