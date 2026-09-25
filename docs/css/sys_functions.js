/**
* Системные функции JS
*/

/**
* Формирование RPC json в пост данные
* 
* @param string method    Имя вызываемого метода на сервере
* @param object post_data Набор POST данных
* @param int    id        Номер потока
*
* @return string - Строка подготоваленных POST данных с параметром [json_rpc] 
*/
function jsonRpcToPost(method, post_data, id)
{
    list_rpc = new Object;  
    
    list_rpc.jsonrpc = '2.0'; 
    list_rpc.method = method;
    
    list_rpc.params = post_data;
    list_rpc.id = id;
    
    s = JSON.stringify(list_rpc);
    
    return 'json_rpc='+ encodeURIComponent(s);    
}

/**
* Вывод assert утверждений  бэкэнда через ajax
* 
*/
function checkAssertBackendByAjax(json)
{
    if (json.Status == 'assert_false' || json.Status == 'error_excecute') {
        
        alert(json.Result);
        throw('assert_false');    
    }
}


/**
* Отправка ajax
* 
* @param url
* @param post
*/
function ajaxRequest (url, post) { 
  
    json = jsonRpcToPost('Ajax.php', post, 1)

    post = $.post('/api.php?', json);
    
    post.done( function(data){
        
        data = IsJsonString(data);
        
        checkAssertBackendByAjax(data)   
    })
    
    return post 
}
  
/**
* Проверка json и преобразование в json
* 
* @param str
*/
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }        
    return true;
}

/**
* Преобразование данных в массив
* 
*/
function toArray(data)
{
    isJson = IsJsonString(data);
    
    if (isJson === true) {
                            
        return JSON.parse(data);
    } else {
        
        array = {}
        array.Result = data;
        
        return array;
    }  
}

//
function isJson1(str) 
{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}