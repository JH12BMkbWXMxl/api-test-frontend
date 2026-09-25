function savePatternData() {
    post = {};
    post.action = "save-pattern-data";
    post.typeSSHClient = $("#type-ssh-client").val();
    post.patternName = $("#pattern-name").val();
    post.patternData = $("#pattern-code").val();

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

function removePattern(id) {
    $(`#chunk-druggable-${id}`).remove();
}

function addPatternToChunk(param, id) {
    if (param.checked === false) {
        $(`#chunk-druggable-${id}`).remove();

        return;
    }

    name1 = $(`#pattern-name-${id}`).html();

    chunk = getChunk(id, name1);

    $("#list").append(chunk);
}

function getChunk(id, name1) {
    chunk = `        
        <div onclick="actionPattern('update', ${id})" id="chunk-druggable-${id}" class="email-item email-item-unread pure-g block patterns" draggable="true">
            <div class="pure-u-1">
                <h5 class="email-name">${id}</h5>
                <h4 class="email-subject">${name1}</h4>
                <p class="email-desc">
                    Описание 

                    <a onclick="removePattern(${id})">Удалить</a>
                </p>
            </div>
        </div>`;

    return chunk;
}

function actionPattern(action, id) {
    post = {};
    post.action = "action-pattern";
    post.typeAction = action;
    post.id = id;

    ajaxRequest("/api.php", post).done(function (data) {
        arr = toArray(data);
        result = toArray(arr.Result);

        if (arr.status == "update") {
            $(`#pattern-name`).val(arr.name);
            $(`#pattern-code`).html(arr.code);
        } else {
            alert(JSON.stringify(arr));
        }
    });
}

function saveBat() {
    let idList = [];
    // Перебираем все элементы с классом .my-class
    $(".patterns").each(function () {
        // Получаем ID текущего div (два способа на выбор):
        const elementId = this.id; // Способ 1: Чистый JS (работает быстрее всего)

        id = elementId.replaceAll("chunk-druggable-", "");
        // const elementId = \$(this).attr('id'); // Способ 2: Через jQuery

        idList.push(id);
    });

    post = {};
    post.action = "save-bat";
    post.nameBat = $("#name-bat").val();
    post.listPatternIds = idList;

    ajaxRequest("/api.php", post).done(function (data) {
        arr = toArray(data);
        result = toArray(arr.Result);

        $(`#pattern-code`).html(arr.code);

        if (result.ack == "true") {
            $("#log_action_area").val(result.result);

            ipwsList = $(".ipwslist");
        } else {
            alert(JSON.stringify(arr));
        }
    });
}

function actionBats(action, id) {
    post = {};
    post.action = "action-bats";
    post.typeAction = action;
    post.id = id;

    ajaxRequest("/api.php", post).done(function (data) {
        arr = toArray(data);
        result = toArray(arr.Result);

        if (arr.status == "update") {
            $(`#name-bat`).val(arr.nameBat);

            $(".patterns").each(function () {
                // Получаем ID текущего div (два способа на выбор):
                const elementId = this.id; // Способ 1: Чистый JS (работает быстрее всего)

                $(`#${elementId}`).remove();
            });

            arr.patternList.forEach(function (item, index) {
                chunk = getChunk(item.id, item.name);
                $("#list").append(chunk);
            });
        } else {
            alert(JSON.stringify(arr));
        }
    });
}
