document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    // Шаг 1: Строго блокируем стандартную отправку формы и перезагрузку страницы
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");

    // Проверяем, выбрал ли пользователь файл
    if (!fileInput.files.length) {
        alert("Пожалуйста, выберите файл перед отправкой!");
        return;
    }

    list = {};

    $(".field-row").each(function (index, element) {
        parametrEl = element.querySelector('[name="parametr"]');
        valueEl = element.querySelector('[name="valuem"]');

        list[parametrEl.value] = valueEl.value;
    });

    list;

    // Шаг 2: Создаем объект FormData и добавляем туда файл
    const formData = new FormData();
    // Ключ 'file' должен совпадать с тем, что ожидает PHP: $uploadedFiles['file']
    formData.append("file", fileInput.files[0]);
    formData.append("actionApi", "uploadFiles");

    Object.entries(list).forEach(([key, value]) => {
        //console.log(`Ключ: ${key}, Значение: ${value}`);

        // Например, добавляем в FormData в виде list: "22"
        formData.append(key, value);
    });

    //l = littleTroll();

    formData.append("littleTroll", littleTroll());

    try {
        // Шаг 3: Асинхронно отправляем файл на ваш сервер RoadRunner
        // Вручную указывать заголовок Content-Type НЕ НАДО, браузер сделает это сам
        const response = await fetch(httData, {
            method: "POST",
            body: formData,
        });

        // Шаг 4: Читаем JSON-ответ от сервера
        const result = await response.json();

        if (response.ok && result.success) {
            // Файл успешно загружен, страница НЕ обновилась!
            alert(`Успех! Файл "${result.filename}" загружен.`);
            console.log("Ответ сервера:", result);

            // По желанию: сбрасываем форму после успешной загрузки
            document.getElementById("uploadForm").reset();
            document.getElementById("file-name-preview").textContent = "Файл не выбран";
        } else {
            // receivedTextArea
            $("#sendTextarea").val(JSON.stringify(result));
            // Сервер вернул ошибку (например, запрещенный формат файла в .rr.yaml)
            // alert(`Ошибка сервера: ${result.error || "Что-то пошло не так"}`);
        }
    } catch (error) {
        // Ошибка сети или сервер выключен
        console.error("Ошибка при отправке запроса:", error);
        alert("Не удалось связаться с сервером. Проверьте сеть.");
    }
});
