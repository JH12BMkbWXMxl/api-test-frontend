<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A layout example that shows off a responsive email layout.">
    <title>Email &ndash; Layout Examples &ndash; Pure</title>
    <link rel="stylesheet" href="html/pure-min.css">
    <link rel="stylesheet" href="html/styles.css">
    <link rel="stylesheet" href="html/drop-blocks.css">


</head>
<body>

<div id="layout" class="content pure-g">
    <div id="nav" class="pure-u">
        <a href="#" id="menuLink" class="nav-menu-button">Menu</a>

        <div class="nav-inner">
            <button class="primary-button pure-button">Compose</button>

            <div style="background: aliceblue; font-size: xx-small;" class="pure-menu">
                <table class="pure-table">
                    <tbody>
                        <? foreach ($LIST_BATS as $list):?>
                        <tr>
                            <td><?=$list['id']?></td>
                            <td id="bat-name-<?=$list['id']?>"><?=$list['name_bat']?></td>
                            <td><button onclick="actionBats('update', <?=$list['id']?>)" type="submit" class="pure-button button-xsmall pure-input-1-2 pure-button-primary">Изм</button></td>
                            <td><button onclick="actionBats('delete', <?=$list['id']?>)" type="submit" class="button-xsmall pure-button">Удл</button></td>
                        </tr>
                        <?endforeach;?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="list" class="pure-u-1">
    
        <fieldset class="pure-form" id="fixed-block-add">
            
            <input id="name-bat" class="" type="text" placeholder="Имя bat">
            <button onclick="saveBat()" type="submit" class="pure-button pure-button-primary">Save</button>
        </fieldset>
    </div>

    <div style="width:870px" id="main" class="pure-u-1">
        <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2">
                    <h1 class="email-content-title">Hello from Toronto</h1>
                    <p class="email-content-subtitle">
                        From <a>Tilo Mitra</a> at <span>3:56pm, April 3, 2021</span>
                    </p>
                </div>

                <div class="email-content-controls pure-u-1-2">
                    <button onclick="actionClient('run-termux')" class="secondary-button pure-button">Run Termux</button>
                    <button class="secondary-button pure-button">Forward</button>
                    <button class="secondary-button pure-button">Move to</button>
                </div>
            </div>

            <div class="email-content-body">
                <span class="pure-form">
                    <fieldset class="pure-group">
                        <select style="width:130px" id="type-ssh-client">
                            <option>termux</option>
                            <option>plink</option>
                            <option>putty</option>
                        </select>
                        <input style="display:inline" id="pattern-name" type="text" class="pure-input-1-2" placeholder="Название">
                        <textarea id="pattern-code" class="pure-input-1-2" placeholder="Putty код" style="height: 334px; width: 755px;"></textarea>
                    </fieldset>
                    <div class="pure-u-1-2">
                        <button style="width:40%" onclick="sendPuttyData()" type="submit" class="pure-button pure-input-1-2 pure-button-primary">Запуск</button>
                        <button style="width:40%" onclick="savePatternData()" type="submit" class="pure-button pure-input-1-2 pure-button-primary">Сохранить</button>
                    </div>
                </span>
            </div>

            <div class="email-content-body pure-g">
                <table class="pure-table pure-u-2-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>client</th>
                            <th>Имя</th>
                            
                            <th>вывести</th>
                            <th>удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        <? foreach ($LIST_PATTERNS as $list):?>
                        <tr>
                            <td><input onclick="addPatternToChunk(this, <?=$list['id']?>)" id="default-remember" type="checkbox"></td>
                            <td id="pattern-name-<?=$list['id']?>"><?=$list['type_ssh_client']?></td>
                            <td id="pattern-name-<?=$list['id']?>"><?=$list['name']?></td>

                            <td><button onclick="actionPattern('update', <?=$list['id']?>)" type="submit" class="pure-button pure-input-1-2 pure-button-primary">Изменить</button></td>
                            <td><button onclick="actionPattern('delete', <?=$list['id']?>)" type="submit" class="pure-button pure-input-1-2 pure-button-error">Удалить</button></td>
                        </tr>
                        <?endforeach;?>
                    </tbody>
                </table>
                <table style="margin-left: 10px;" class="pure-table pure-u-1-4">
                    <thead>
                        <tr>
                            <th>Var</th>
                            <th>Val</th>
                        </tr>
                    </thead>
                    <tbody>
                        <? foreach ($LIST_VARIABLES as $list):?>
                        <tr class="pure-form">
                            <td> <input style="width:150px" value="$<?=$list['variable']?>$"></td>
                            <td><input style="width:150px" value="<?=$list['value']?>"></td>
                        </tr>
                        <?endforeach;?>
                    </tbody>
                </table>

            <div>
        </div>
    </div>
</div>
<!-- Script to make the Menu link work -->
<!-- Just stripped down version of the js/ui.js script for the side-menu layout -->
<script>

</script>
<script src="html/jquery.js"></script>
<script src="html/sys_functions.js"></script>
<script src="html/drop-blocks.js"></script>
<script src="html/putty-actions.js"></script>
<script src="html/pattern-actions.js"></script>
</body>
</html>
