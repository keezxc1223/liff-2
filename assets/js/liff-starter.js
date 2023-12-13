/*
Author :
- https://github.com/crash-override404
update :
- https://github.com/keezxc1223/
Thanks to :
- https://github.com/RynKings
- https://github.com/ari-yk
*/

window.onload = function() {
    initVConsole();
    initContent();
    initLiff();
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

// Initialize vConsole
function initVConsole() {
    window.vConsole = new window.VConsole({
        defaultPlugins: ["system", "network", "element", "storage"],
        maxLogNumber: 1000,
        onReady: function() {
            console.log("vConsole is ready.");
        },
        onClearLog: function() {
            console.log("on clearLog");
        }
    });
}

// Initialize LIFF
function initLiff() {
    console.log("going to initialize LIFF");
    liff.init(
        data => {
            console.log("LIFF initialized!");
            // Now you can call LIFF API
            const userId = data.context.userId;
            liff.getProfile().then(profile => {
                const userDisplayName = profile.displayName
                console.info("User name is", userDisplayName);
                if (getParameterByName("auto") == "yes") {
                    sendLiffMessage();
                }
                document.getElementById("greet").innerHTML = "你好, " + userDisplayName + " ౼ Nice to meet you";
            }).catch((err) => {
                console.error("LIFF getProfile failed", err);
            });
        },
        err => {
            console.error("LIFF initialization failed", err);
        }
    );
}

function changeType() {
    var type = document.getElementById("type").value;
    removeElements("form-label-group");
    initContent(type);
}

function initContent(type) {
    if (!type) {
        type = getParameterByName("type");
        if (type) document.getElementById("type").value = type;
    }
    var parent = document.getElementById("content");
    if (type == "text") {
        var element = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");
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
        label.innerHTML = "Text message";
        element.appendChild(input);
        element.appendChild(label);
        parent.insertBefore(element, parent.childNodes[4]);
    } else if (type == "sticker" || type == "stickerimage") {
        var element = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");
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
        var element = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");
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
        var element = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");
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
        var element = document.createElement("div");
        var textarea = document.createElement("textarea");
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
        var element = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");
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
    }
}

function sendLiffMessage() {
    var type = document.getElementById("type").value;
    console.info(type);
    var client = new HttpClient();
    liff.getProfile().then(profile => {
        const userDisplayName = profile.displayName;
        if (type == "profile") {
            liff.sendMessages([{
                type: "flex",
                altText: "Profile " + userDisplayName,
                contents: {
                    type: "bubble",
                    hero: {
                        type: "image",
                        url: profile.pictureUrl,
                        size: "full",
                        aspectRatio: "1:1",
                        aspectMode: "cover",
                        action: {
                            type: "uri",
                            uri: "line://app/2002197923-oyY6wJ68?auto=yes&type=image&downloadUrl=" + profile.pictureUrl + "&previewUrl=" + profile.pictureUrl
                        }
                    },
                    body: {
                        type: "box",
                        layout: "vertical",
                        contents: [{
                                type: "text",
                                text: userDisplayName,
                                align: "center",
                                weight: "bold",
                                size: "xl"
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                margin: "lg",
                                spacing: "sm",
                                contents: [{
                                    type: "text",
                                    text: profile.statusMessage,
                                    wrap: true,
                                    color: "#666666",
                                    size: "sm",
                                    flex: 5
                                }]
                            }
                        ]
                    },
                    footer: {
                        type: "box",
                        layout: "horizontal",
                        spacing: "sm",
                        contents: [{
                                type: "button",
                                style: "primary",
                                height: "sm",
                                color: "#02afff",
                                action: {
                                    type: "uri",
                                    label: "Square",
                                    uri: "https://lin.ee/3fKeC6h"
                                },
                                flex: 1
                            },
                            {
                                type: "button",
                                style: "primary",
                                height: "sm",
                                action: {
                                    type: "uri",
                                    label: "Profile",
                                    uri: "line://app/2002197923-oyY6wJ68?type=profile"
                                },
                                flex: 2
                            },
                            {
                                type: "spacer",
                                size: "sm"
                            }
                        ],
                        flex: 0
                    }
                }
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "text") {
            console.log("Start sending message");
            liff.sendMessages([{
                type: "text",
                text: document.getElementById("text").value
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "sticker") {
            console.log("Start sending message");
            liff.sendMessages([{
                type: "sticker",
                packageId: document.getElementById("packageId").value,
                stickerId: document.getElementById("stickerId").value
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "stickerimage") {
            console.log("Start sending message");
            stickerId = document.getElementById("stickerId").value;
            packageId = document.getElementById("packageId").value;
            animation = document.getElementById("animation").checked;
            if (animation == true) {
                imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker_animation@2x.png";
            } else {
                imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker@2x.png";
            }
            liff.sendMessages([{
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
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "image") {
            console.log("Start sending message");
            liff.sendMessages([{
                type: "image",
                originalContentUrl: document.getElementById("downloadUrl").value,
                previewImageUrl: document.getElementById("previewUrl").value
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "video") {
            console.log("Start sending message");
            liff.sendMessages([{
                type: "video",
                originalContentUrl: document.getElementById("downloadUrl").value,
                previewImageUrl: document.getElementById("previewUrl").value
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "audio") {
            console.log("Start sending message");
            liff.sendMessages([{
                type: "audio",
                originalContentUrl: document.getElementById("downloadUrl").value,
                duration: 60000
            }]).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "messages") {
            console.log("Start sending message");
            var messages = JSON.parse(document.getElementById("messages").value);
            liff.sendMessages(messages).then(() => {
                console.log("Success sending message");
                liff.closeWindow();
            }).catch((err) => {
                console.error("Sending message failed", err);
            });
        } else if (type == "messagesUrl") {
            console.log("Start sending message");
            var messagesUrl = document.getElementById("messagesUrl").value;
            client.get(messagesUrl, function(response) {
                var messages = JSON.parse(response);
                liff.sendMessages(messages).then(() => {
                    console.log("Success sending message");
                    liff.closeWindow();
                }).catch((err) => {
                    console.error("Sending message failed", err);
                });
            }).catch((err) => {
                console.error("Parsing messages failed", err);
            });
        }
    }).catch((err) => {
        console.error("LIFF getProfile failed", err);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
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
