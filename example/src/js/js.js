"use strict"

let App = {

    ui: {
        error: document.getElementById('error'),
        button : {
            generate : document.getElementById('generate-btn'),
            download : {
                json: document.getElementById('d-json'),
                image: document.getElementById('d-image'),
            }
        },
        qrWrapper : document.getElementById("qrcode-wrapper"),
        qr : document.getElementById("qrcode")
    },

    init : function(){

        // const today = new Date();
        // today.setDate(today.getDate() + 2);
        // document.getElementById('expiry').value = today.toISOString().split('T')[0];

        App.ui.button.generate.addEventListener('click', App.generateQr,false);

    },

    getFields: () => {

        console.log(document.getElementById('expiry').value);
        console.log(Date.parse(document.getElementById('expiry').value));

        let _values = {
            BIC:  document.getElementById('BIC').value,
            name: document.getElementById('name').value,
            IBAN: document.getElementById('IBAN').value,
            domain: document.getElementById('domain').value,
            value: Number(document.getElementById('value').value),
            currency: document.getElementById('currency').value,
            text: document.getElementById('text').value,
            identification: Number(document.getElementById('identification').value),
            expiry:  Date.parse(document.getElementById('expiry').value),
            repeatability: Number(document.getElementById('repeatability').value),
            positionId: document.getElementById('position-id').value,
            shopId: document.getElementById('shop-id').value,
            machineId: document.getElementById('machine-id').value,
            billId: document.getElementById('bill-id').value,
            costumerId: document.getElementById('costumer-id').value,
            transactionId: document.getElementById('transaction-id').value,
            discountId: document.getElementById('discount-id').value,
            NAVCode: document.getElementById('NAV-code').value,
        };

        Object.keys(_values).forEach(_v => {
            if(_values[_v].toString().trim() === ""){
                _values[_v] = undefined
            }
        })

        return _values;

    },

    // clear and generate qr and the download links
    generateQr: function(){

        const _mnb = new MNBQrV3({ ...App.getFields() });
        const _json = _mnb.generateJSON();

        if(_json.message){
            App.ui.error.textContent = _json.message;
            return;
        }

        App.ui.qr.innerHTML = "";

        new QRCode( App.ui.qr, {
            text: _json,
            width: 250,
            height: 250,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        const file_name_prefix = "MNB_QR_" + _mnb.getName() + "_" + _mnb.getValue();

        App.ui.button.download.json.href = "data:text/json;charset=utf-8," + encodeURIComponent(_json);
        App.ui.button.download.json.download = file_name_prefix + ".json";

        App.ui.button.download.image.href = App.ui.qr.querySelector('canvas').toDataURL();
        App.ui.button.download.image.download = file_name_prefix + ".png";


        App.ui.qrWrapper.style.display = 'block';

    },

}

window.addEventListener('load', App.init, false);