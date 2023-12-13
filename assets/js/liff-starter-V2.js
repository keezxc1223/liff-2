/*
Author :
- https://github.com/crash-override404
update :
- https://github.com/keezxc1223/
*/
var liffId = "2002197923-oyY6wJ68";
var params = location.search.substring(1);
var url = window.location.href;
if (params) {
    try {
        params = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    } catch (err) {
        getParameterByName = getParameterByNameV2;
    }
}

window.onload = function() {
    initVConsole();
    initContent();
    initLiff(liffId);
};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        };
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
};

function initVConsole() {
    window.vConsole = new window.VConsole({
        defaultPlugins: ["system", "network", "element", "storage"],
        maxLogNumber: 1000,
        onReady: function() {
            console.log("vConsole is ready.");
        },
        onClearLog: function() {}
    });
}

function initLiff(liffId) {
    console.log("Going to initialize LIFF to", liffId);
    liff.init({
        liffId: liffId
    }).then(() => {
        if (getParameterByName("type") == "liffToken") getLiffToken();
        if (getParameterByName("auto") == "yes" && getParameterByName("type")) {
            sendLiffMessage();
        }
        initApp();
    }).catch((err) => {
        console.error("LIFF initialization failed", err);
    });
}

function initApp() {
    console.log("LIFF initialized!");
    if (!liff.isLoggedIn()) {
        var button = document.getElementById("liffSendMessage");
        button.innerHTML = "登入";
        button.id = "liffLogin";
    } else {
        if (!liff.isInClient() && getParameterByName("type") !== undefined) {
            var parent = document.getElementById("content");
            var element = document.createElement("a");
            element.href = "#";
            element.id = "liffLogout";
            element.className = "btn btn-lg btn-danger btn-block";
            element.innerHTML = "登出";
            parent.insertBefore(element, parent.childNodes[6]);
        }
        liff.getProfile().then(profile => {
            const userDisplayName = profile.displayName;
            console.info("User name is", userDisplayName);
            document.getElementById("greet").innerHTML = "你好, " + userDisplayName + " ౼ 感謝你的使用";
        }).catch((err) => {
            console.error("LIFF getProfile failed", err);
        });
    }
    registerButtonHandlers();
}

function registerButtonHandlers() {
    sendMessageButton = document.getElementById("liffSendMessage");
    loginButton = document.getElementById("liffLogin");
    logoutButton = document.getElementById("liffLogout");
    if (sendMessageButton && liff.isInClient()) {
        sendMessageButton.addEventListener("click", sendLiffMessage, false);
    } else if (sendMessageButton && !liff.isInClient()) {
        logoutButton.addEventListener("click", logoutLiff, false);
    } else {
        loginButton.addEventListener("click", loginLiff, false);
    }
}

function changeType() {
    var type = document.getElementById("type").value;
    removeElements("form-label-group");
    initContent(type);
}

function initContent(type) {
    var isLoggedIn = true;
    var element = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    var textarea = document.createElement("textarea");
    if (!type) {
        type = getParameterByName("type");
        if (type) document.getElementById("type").value = type;
        if (document.getElementById("type").selectedIndex <= 0) {
            document.getElementById("type").value = "choose";
        }
        isLoggedIn = false;
    }
    if (getParameterByName("share") == "yes") {
        document.getElementById("share").checked = true;
    }
    if (getParameterByName("liffId")) {
        liffId = getParameterByName("liffId");
    }
    var parent = document.getElementById("content");
    if (type == "text") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "text";
        input.className = "form-control";
        input.placeholder = "Text message";
        input.required = true;
        if (getParameterByName("text")) {
            input.value = getParameterByName("text");
        }
        label.htmlFor = "text";
        label.innerHTML = "文字訊息";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "sticker" || type == "stickerimage") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "packageId";
        input.className = "form-control";
        input.placeholder = "Text message";
        input.required = true;
        if (getParameterByName("packageId")) {
            input.value = getParameterByName("packageId");
        }
        label.htmlFor = "packageId";
        label.innerHTML = "Sticker Package ID";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
        element = document.createElement("div");
        input = document.createElement("input");
        label = document.createElement("label");
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "stickerId";
        input.className = "form-control";
        input.placeholder = "Preview image url";
        input.required = true;
        if (getParameterByName("stickerId")) {
            input.value = getParameterByName("stickerId");
        }
        label.htmlFor = "stickerId";
        label.innerHTML = "Sticker ID";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
        element = document.createElement("div");
        checkbox = document.createElement("div");
        input = document.createElement("input");
        label = document.createElement("label");
        checkbox.className = "form-label-group";
        checkbox.id = "data";
        element.className = "custom-control custom-checkbox";
        input.type = "checkbox";
        input.id = "animation";
        input.className = "custom-control-input";
        if (getParameterByName("animation") == "yes") {
            input.checked = true;
        }
        label.htmlFor = "animation";
        label.className = "custom-control-label";
        label.innerHTML = "Animation";
        element.appendChild(input);
        element.appendChild(label);
        checkbox.appendChild(element);
        parent.insertBefore(checkbox, parent.childNodes[4]);
    } else if (type == "image" || type == "video") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "downloadUrl";
        input.className = "form-control";
        input.placeholder = "Original content url";
        input.required = true;
        if (getParameterByName("downloadUrl")) {
            input.value = getParameterByName("downloadUrl");
        }
        label.htmlFor = "downloadUrl";
        label.innerHTML = "Download URL";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
        element = document.createElement("div");
        input = document.createElement("input");
        label = document.createElement("label");
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "previewUrl";
        input.className = "form-control";
        input.placeholder = "Preview image url";
        input.required = true;
        if (getParameterByName("previewUrl")) {
            input.value = getParameterByName("previewUrl");
        }
        label.htmlFor = "previewUrl";
        label.innerHTML = "Preview URL";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "audio") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "downloadUrl";
        input.className = "form-control";
        input.placeholder = "Original content url";
        input.required = true;
        if (getParameterByName("downloadUrl")) {
            input.value = getParameterByName("downloadUrl");
        }
        label.htmlFor = "downloadUrl";
        label.innerHTML = "Download URL";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "messages") {
        element.className = "form-label-group";
        element.id = "data";
        textarea.id = "messages";
        textarea.className = "form-control";
        textarea.placeholder = "Messages json";
        textarea.rows = "5";
        if (getParameterByName("messages")) {
            textarea.value = getParameterByName("messages");
        }
        element.appendChild(textarea);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "messagesUrl") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "messagesUrl";
        input.className = "form-control";
        input.placeholder = "Messages json url";
        input.required = true;
        if (getParameterByName("messagesUrl")) {
            input.value = getParameterByName("messagesUrl");
        }
        label.htmlFor = "messagesUrl";
        label.innerHTML = "Messages JSON URL";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "scanQr") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "qrResult";
        input.className = "form-control";
        input.placeholder = "QR Code Result";
        input.required = true;
        label.htmlFor = "qrResult";
        label.innerHTML = "QR Code Result";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
        scanCodeQr();
    } else if (type == "liffToken") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "liffToken";
        input.className = "form-control";
        input.placeholder = "Liff Auth Token";
        input.required = true;
        label.htmlFor = "liffToken";
        label.innerHTML = "Liff Auth Token";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
        if (isLoggedIn) getLiffToken();
    } else if (type == "genToken") {
        element.className = "form-label-group";
        element.id = "data";
        input.type = "text";
        input.id = "lineAuthKey";
        input.className = "form-control";
        input.placeholder = "Line Auth Key";
        input.required = true;
        if (getParameterByName("lineAuthKey")) {
            input.value = getParameterByName("lineAuthKey");
        }
        label.htmlFor = "lineAuthKey";
        label.innerHTML = "Line Auth Key";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    }
}

function sendLiffMessage() {
    var type = document.getElementById("type").value;
    var client = new HttpClient();
    var userDisplayName = "Unknown";
    var userPictureUrl = "https://i.imgur.com/6DmTQk6.png";
    var userStatusMessage = "";
    liff.getProfile().then(profile => {
        userDisplayName = profile.displayName;
        userPictureUrl = profile.pictureUrl;
        userStatusMessage = profile.statusMessage;
    }).catch((err) => {
        console.error("Error while get profile", err);
    });
    if (type == "profile") {
        sendMessages([{type: "flex", altText: "Profile " + userDisplayName, contents: {type: "bubble", hero: {type: "image", url: userPictureUrl, size: "full", aspectRatio: "1:1", aspectMode: "cover", action: {type: "uri", uri: "line://app/2002197923-oyY6wJ68?auto=yes&type=image&downloadUrl=" + userPictureUrl + "&previewUrl=" + userPictureUrl } }, body: {type: "box", layout: "vertical", contents: [{type: "text", text: userDisplayName, align: "center", weight: "bold", size: "xl"}, {type: "box", layout: "vertical", margin: "lg", spacing: "sm", contents: [{type: "text", text: userStatusMessage, wrap: true, color: "#666666", size: "sm", maxLines: 5, flex: 5 }] } ] }, footer: {type: "box", layout: "horizontal", spacing: "sm", contents: [{type: "button", style: "primary", height: "sm", color: "#02afff", action: {type: "uri", label: "Open Chat", uri: "https://line.me/ti/g2/JGUODBE4RE"}}, {type: "button", style: "primary", height: "sm", action: {type: "uri", label: "Profile", uri: "line://app/2002197923-oyY6wJ68?auto=yes&type=profile"}}, {type: "spacer", size: "sm"}]}}}]); 
    } else if (type == "text") {
        sendMessages([{
            type: "text",
            text: document.getElementById("text").value
        }]);
    } else if (type == "sticker") {
        sendMessages([{
            type: "sticker",
            packageId: document.getElementById("packageId").value,
            stickerId: document.getElementById("stickerId").value
        }]);
    } else if (type == "stickerimage") {
        stickerId = document.getElementById("stickerId").value;
        packageId = document.getElementById("packageId").value;
        animation = document.getElementById("animation").checked;
        if (animation == true) {
            imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker_animation@2x.png";
        } else {
            imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker@2x.png";
        }
        sendMessages([{
            type: "template",
            altText: userDisplayName + " sent a sticker.",
            template: {
                type: "image_carousel",
                columns: [{
                    imageUrl: imageUrl,
                    action: {
                        type: "uri",
                        uri: "line://shop/sticker/detail/" + packageId
                    }
                }]
            }
        }]);
    } else if (type == "image") {
        sendMessages([{
            type: "image",
            originalContentUrl: document.getElementById("downloadUrl").value,
            previewImageUrl: document.getElementById("previewUrl").value
        }]);
    } else if (type == "video") {
        sendMessages([{
            type: "video",
            originalContentUrl: document.getElementById("downloadUrl").value,
            previewImageUrl: document.getElementById("previewUrl").value
        }]);
    } else if (type == "audio") {
        sendMessages([{
            type: "audio",
            originalContentUrl: document.getElementById("downloadUrl").value,
            duration: 60000
        }]);
    } else if (type == "messages") {
        sendMessages(JSON.parse(document.getElementById("messages").value))
    } else if (type == "messagesUrl") {
        var messagesUrl = document.getElementById("messagesUrl").value;
        client.get(messagesUrl, function(response) {
            sendMessages(JSON.parse(response))
        }).catch((err) => {
            console.error("Parsing messages failed", err);
        });
    } else if (type == "scanQr") {
        sendMessages([{
            type: "text",
            text: document.getElementById("qrResult").value
        }]);
    } else if (type == "liffToken") {
        sendMessages([{
            type: "text",
            text: document.getElementById("liffToken").value
        }]);
    } else if (type == "genToken") {
        client.get("generateToken.php?lineAuthKey=" + document.getElementById("lineAuthKey").value, function(response) {
            sendMessages([{
                type: "text",
                text: response
            }]);
        }).catch((err) => {
            console.error("Generate token failed", err);
        });
    }
}

function sendMessages(messages) {
    if (!liff.isInClient()) {
        sendAlertIfNotInClient()
    } else if (document.getElementById("share").checked == true) {
        console.info("Start initializing share message");
        if (liff.isApiAvailable("shareTargetPicker")) {
            liff.shareTargetPicker(messages).then(() => {
                console.log("Share message was launched");
            }).catch((err) => {
                console.error("Share message failed", err);
            });
        }
    } else {
        console.info("Start sending message");
        liff.sendMessages(messages).then(() => {
            console.info("Success sending message");
            liff.closeWindow();
        }).catch((err) => {
            console.error("Sending message failed", err);
        });
    }
}

function getLiffToken() {
    if (!liff.isLoggedIn()) {
        document.getElementById("liffToken").value = "You must login first";
    } else {
        document.getElementById("liffToken").value = liff.getAccessToken();
    }
}

function scanCodeQr() {
    if (!liff.isInClient()) {
        sendAlertIfNotInClient()
    } else {
        console.info("Start scan code qr");
        liff.scanCode().then(result => {
            document.getElementById("qrResult").value = result.value;
        }).catch((err) => {
            console.error("Scan code qr failed", err);
        })
    }
}

function loginLiff() {
    if (!liff.isLoggedIn()) {
        liff.login();
    }
}

function logoutLiff() {
    if (liff.isLoggedIn()) {
        liff.logout();
        window.location.reload();
    }
}

function getParameterByName(name) {
    var result = null;
    name = name.replace(/[\[\]]/g, "\\$&");
    if (params[name]) {
        result = unescape(params[name])
    }
    return result
}

function getParameterByNameV2(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function removeElements(classname) {
    var list = document.getElementsByClassName(classname);
    for (var i = list.length - 1; 0 <= i; i--) {
        if (list[i] && list[i].parentElement && list[i].id && list[i].id == "data") {
            list[i].parentElement.removeChild(list[i]);
        }
    }
}

function sendAlertIfNotInClient() {
    alert('此按鈕不可用，LIFF在瀏覽器外部中打開（請在LINE中使用）');
}
