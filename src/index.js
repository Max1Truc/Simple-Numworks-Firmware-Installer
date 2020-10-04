import Numworks from "numworks.js";

import internalURL from "./epsilon.onboarding.internal.bin";
import externalURL from "./epsilon.onboarding.external.bin";

var calculator = new Numworks();
calculator.should_disconnect = false;

navigator.usb.addEventListener("disconnect", function (e) {
    calculator.onUnexpectedDisconnect(e, function () {
        calculator.autoConnect(connectedHandler);

        if (! calculator.should_disconnect) {
            alert("You disconnected the calculator too early !\nIf you experience any problem, update it from the official NumWorks website: workshop.numworks.com");
        } else {
            alert("Installation was successful!")
            calculator.should_disconnect = false;
        }
    });
});

calculator.autoConnect(connectedHandler);

calculator.autoConnect();

function connectButtonClicked(e) {
    calculator.detect(connectedHandler, function (error) {
        console.error(error);
    }).then(() => {
        const model = calculator.getModel();

        if (model == "0110") {
            alert("Successfully connected to the calculator :)");

            let element = document.getElementById("install-progress");
            calculator.device.logProgress = function (done, total) {
                element.value = done;
                element.max = total;
            }
        } else {
            alert("Currently, the only supported calculator is the N0110 :/");
        }
    })
}

function installButtonClicked(e) {
    try {
        calculator.getModel();
    } catch (e) {
        alert("Please connect your calculator first !");
        return;
    }

    if (calculator.getModel() == "0110") {
        if (confirm("Start installation ?")) {
            fetch(internalURL).then(async (response) => {
                const internalFirmware = await response.arrayBuffer();
                fetch(externalURL).then(async (response) => {
                    const externalFirmware = await response.arrayBuffer();
                    calculator.flashExternal(externalFirmware).then(() => {
                        calculator.flashInternal(internalFirmware).then(() => {
                            calculator.should_disconnect = true;
                        });
                    });
                })
            })
        } else {
            alert("Installation aborted ;)")
        }
    } else {
        alert("Currently, the only supported calculator is the N0110 :/");
    }
}

function connectedHandler() {
    calculator.stopAutoConnect();
}

function ConnectButton() {
    const element = document.createElement('button');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = "Connect";

    element.addEventListener("click", connectButtonClicked);

    return element;
}

function InstallButton() {
    const element = document.createElement('button');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = "Install";

    element.addEventListener("click", installButtonClicked);

    return element;
}

function InstallProgress() {
    const element = document.createElement("progress");
    element.value = 0;
    element.max = 100;
    element.id = "install-progress";

    return element;
}

function InstallWidget() {
    const element = document.createElement('div');
    element.appendChild(ConnectButton());
    element.appendChild(InstallButton());
    element.appendChild(InstallProgress());

    return element;
}

document.body.appendChild(InstallWidget());
