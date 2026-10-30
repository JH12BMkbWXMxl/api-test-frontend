httpEndpointList = {
    1: {
        id: 1,
        name: "Загрузка файлов",
        parametrs: {
            token: "3adf3bf91fe38b4369518538ec837e36f7ef2689844ed9bd25d3f5ee3c6c37fe",
            actionType: "checkValidPattern",
            value: "ssn",
            pattern:
                "ssn|fullName|country|address|city|state|zip|email|dobFull|phoneNumber|driverLicenseNumber|creditScore|employment|price",
        },
    },
    2: {
        id: 2,
        name: "Получение токена websocket",
        parametrs: {
            little: "token",
        },
    },
};

function getListPatterns(httpEndpointList) {
    //listPattern = JSON.parse(response.data.message.text);

    for (const [key, value] of Object.entries(httpEndpointList)) {
        value;

        var newField = `<div onclick="pastePattern(${key})" class="field-row1">
                        (${value.id})(${value.name})
                        <input type="hidden" id="text_pattern_105" value="%7B%22actionApi%22%3A%22items%2Fadd%2FbyMass%2FdataBase%22%2C%22pattern%22%3A%22price%7CnameBase%7Cquantity%7CvalidOrNotValid%22%2C%22massObject%22%3A%2222%7CnameBase%7Cquantity%7CvalidOrNotValid%5Cn22.33%7CnameBase%7Cquantity%7CvalidOrNotValid%22%2C%22token%22%3A%223adf3bf91fe38b4369518538ec837e36f7ef2689844ed9bd25d3f5ee3c6c37fe%22%7D">
                        <input type="hidden" id="text_description_pattern_105" value="null">
                        <input type="hidden" id="text_result_pattern_105" value="null">
                    </div>`;
        $("#pattern-list").append(newField);
    }
}

function pastePattern(keyD) {
    valueList = httpEndpointList[keyD];

    $(".field-row").remove();

    //$("#endpoint-name-value")[0].value = patternList.actionApi;
    //$("#endpoint-save-name")[0].value = title;

    for (const [key, value] of Object.entries(valueList.parametrs)) {
        value;
        var newField =
            '<div class="field-row"><input type="text" name="parametr" value="' +
            key +
            '">|<textarea type="text" name="valuem">' +
            value +
            '</textarea> <button type="button" class="remove-field">Удалить</button></div><hr>';
        $("#fields-container").append(newField);
    }
}

getListPatterns(httpEndpointList);
