"use strict"
class MNBQrV3 {

    //Verziószám
    #schemaVersion = 3;

    // Azonosító kódok
    static HCT = 1;
    static RTP = 2;

    static REPETABLE = 1;
    static UNREPETABLE = 0;

    //Kulcsok
    #KEY = Object.freeze({
        BIC: "BIC",                         // Fizető fél vagy kedvezményezett BIC/BEI
        NAME: "name",                       // Fizető fél vagy kedvezményezett neve
        IBAN: "IBAN",                       // Fizető fél vagy kedvezményezett IBAN
        DOMAIN: "domain",                   // Domain név a domain alapú validáció számára
        VALUE: "value",                     // Összeg
        CURRENCY: "currency",               // Pénznem
        TEXT: "text",                       // Közlemény (nem struktúrált)
        IDENTIFICATION: "identification",   // Azonosító kód, 1: HCT, 2: RTP
        EXPIRY: "expiry",                   // Érvényességi idő (Unix timestamp)
        REPEATABILITY: "repeatability",     // 0: QR kód vagy link csak egyszer olvasható be és utalható | 1: többször is végrehajtható
        POSITION_ID: "positionId",          // Fizetési helyzet azonosító
        SHOP_ID: "shopId",                  // Kereskedelmi egység, bolt azonosító
        MACHINE_ID: "machineId",            // Kereskedelmi eszköz (POS, pénztárgép) azonosító
        BILL_ID: "billId",                  // Számla vagy nyugta azonosító
        COSTUMER_ID: "costumerId",          // Ügyfélazonosító
        TRANSACTION_ID: "transactionId",    // Kedvezményezett belső tranzakcióazonosítója
        DISCOUNT_ID: "discountId",          // Törzsvásárlói vagy kedvezményezett azonosítója
        NAV_CODE: "NAVCode"                 // NAV ellenőrző kód
    });

    #fields = {
        //Kedvezményezett Adatai
        BIC : {
            value: undefined,
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z]{8,11}$/, // /^[a-zA-Z]{11}$/,
        },
        name :{
            value: undefined,
            type: 'string',
            required: true,
            pattern: /^.{1,70}$/
        },
        IBAN : {
            value: undefined,
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z0-9]{28}$/
        },
        domain : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^((?!-))(xn--)?[a-z0-9][a-z0-9\-_]{0,61}[a-z0-9]{0,}\\-.?((xn--)?([a-z0-9\-.]{1,61}|[a-z0-9-]{1,30})\\-.?[a-z]{2,})$/
        },
        // Összeg
        value : {
            value: undefined,
            type: 'number',
            required: true,
            pattern: /^(10{7}|[1-9]\d{0,6}|0)$/
        },
        currency: {
            value: undefined,
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z]{3}$/
        },
        text : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,70}$/,
        },
        // Meta adatok
        identification : {
            value: undefined,
            type: 'number',
            required: true,
            pattern: /^.{1,2}$/
        },
        expiry: {
            value: undefined,
            type: 'number',
            required: true,
            pattern: /^\d{10,13}$/
        },
        repeatability: {
            value: undefined,
            type: 'number',
            required: true,
            pattern: /^.{0,1}$/
        },
        //Egyéb azonosítók
        positionId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^[a-zA-Z0-9]{4}$/
        },
        shopId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },
        machineId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },
        billId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },
        costumerId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },
        transactionId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/

        },
        discountId : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },
        NAVCode : {
            value: undefined,
            type: 'string',
            required: false,
            pattern: /^.{1,35}$/
        },

    };

    constructor( schemaConf ) {

        if( schemaConf !== undefined){

            if(typeof schemaConf === "object"){

                Object.keys(schemaConf).forEach( ( _a) =>{
                    if( this.#get(_a) !== false ){
                        if( this.#isValid( _a, schemaConf[_a] ) === true ){
                            this.#set( _a, schemaConf[_a] );
                        }
                    }
                });

            }else{
                console.warn("Wrong schema config");
            }

        }
    }

    #get(_f){
        if(this.#fields.hasOwnProperty(_f)){
            return this.#fields[_f].value;
        }else {
            console.log(`Invalid field: ${_f}`);
            return false;
        }
    }
    #set(_f, _v){
        if( this.#isValid(_f, _v) ){
            if(this.#fields.hasOwnProperty(_f)){
                this.#fields[_f].value = _v;
            }else {
                console.error(`Invalid ${_f} value: ${_v}`);
            }
        }
    }
    getBIC(){
        return this.#get( this.#KEY.BIC );
    }
    setBIC(_v){
        this.#set( this.#KEY.BIC, _v );
    }
    async getName(){
        return this.#get( this.#KEY.NAME );
    }
    setName(_v){
        this.#set( this.#KEY.NAME, _v );
    }
    async getIBAN(){
        return this.#get( this.#KEY.IBAN );
    }
    setIBAN(_v){
        this.#set( this.#KEY.IBAN, _v);
    }
    getDomain(){
        return this.#get( this.#KEY.DOMAIN );
    }
    setDomain(_v){
        this.#set( this.#KEY.DOMAIN, _v );
    }
    getValue(){
        return this.#get( this.#KEY.VALUE );
    }
    setValue(_v){
        this.#set( this.#KEY.VALUE, _v );
    }
    getCurrency(){
        return this.#get( this.#KEY.CURRENCY );
    }
    setCurrency(_v){
        this.#set( this.#KEY.CURRENCY, _v );
    }
    getText(){
        return this.#get( this.#KEY.TEXT );
    }
    setText(_v){
        this.#set( this.#KEY.TEXT, _v );
    }
    getIdentification(){
        return this.#get( this.#KEY.IDENTIFICATION );
    }
    setIdentification(_v){
        this.#set( this.#KEY.IDENTIFICATION, _v );
    }
    getExpiry(){
        return this.#get( this.#KEY.EXPIRY );
    }
    setExpiry(_v){
        this.#set( this.#KEY.EXPIRY, _v );
    }
    getRepeatability(){
        return this.#get( this.#KEY.REPEATABILITY ) ;
    }
    setRepeatability(_v){
        this.#set( this.#KEY.REPEATABILITY, _v );
    }
    getPositionId(){
        return this.#get( this.#KEY.POSITION_ID );
    }
    setPositionId(_v){
        this.#set( this.#KEY.POSITION_ID, _v );
    }
    getShopId(){
        return this.#get( this.#KEY.SHOP_ID );
    }
    setShopId(_v){
        this.#set( this.#KEY.SHOP_ID, _v );
    }
    getMachineId(){
        return this.#get( this.#KEY.MACHINE_ID );
    }
    setMachineId(_v){
        this.#set( this.#KEY.MACHINE_ID, _v );
    }
    getBillId(){
        return this.#get( this.#KEY.BILL_ID );
    }
    setBillId(_v){
        this.#set( this.#KEY.BILL_ID, _v );
    }
    getCostumerId(){
        return this.#get( this.#KEY.COSTUMER_ID );
    }
    setCostumerId(_v){
        this.#set( this.#KEY.COSTUMER_ID, _v );
    }
    getTransactionId(){
        return this.#get( this.#KEY.TRANSACTION_ID );
    }
    setTransactionId(_v){
        this.#set( this.#KEY.TRANSACTION_ID, _v);
    }
    getDiscountId(){
        return this.#get( this.#KEY.DISCOUNT_ID );
    }
    setDiscountId(_v){
        return this.#set( this.#KEY.DISCOUNT_ID, _v );
    }
    getNAVCode(){
        return this.#get( this.#KEY.NAV_CODE );
    }
    setNAVCode(_v){
        this.#set( this.#KEY.NAV_CODE, _v );
    }

    #isValid( _f, _v ){
        try{

            if(!this.#fields.hasOwnProperty(_f)){
                console.error(`Invalid field: '${_f}'`);
                return false;
            }

            if(typeof _v === 'undefined'){
                return true;
            }

            if(typeof _v == "string"){
                _v = _v.trim();
            }

            if(typeof _v !== this.#fields[_f].type){
                console.error(`Wrong data type for '${_f}' excepted '${this.#fields[_f].type}' or 'undefined' but got '${typeof _v}'`)
                return false;
            }

            if(!_v.toString().match(this.#fields[_f].pattern)){
                console.error(`Value '${_v}' dont match the filed pattern Field: '${_f}' Pattern: '${this.#fields[_f].pattern}'`)
                return false;
            }

            return true;

        }catch (err){
            console.error(err);
            return false;
        }
    }
    #schemaIsValid(){

        Object.keys(this.#fields).forEach( _f => {

            if(typeof this.#fields[_f].value === "string"){
                return this.#fields[_f].value = this.#fields[_f].value.trim();
            }

            if(this.#fields[_f].required && [null, undefined, ''].includes(this.#fields[_f].value)){
                throw new Error(`Required filed '${_f}' missing`);
            }

            if(this.#fields[_f].value !== undefined && typeof this.#fields[_f].value !== this.#fields[_f].type){
                throw new Error(`Wrong data type for '${_f}' excepted ${this.#fields[_f].type} but got ${typeof this.#fields[_f].value}`);
            }

            if(this.#fields[_f].value !== undefined){

                if(!this.#fields[_f].value.toString().match(this.#fields[_f].pattern)){
                    throw new Error(`${_f} value malformed`);
                }

            }

        });

        return true;

    }
    generateObject(){

        if( this.#schemaIsValid() ){

            return {
                "M": {
                    "I": this.#fields.identification.value,
                    "V": this.#schemaVersion,
                    "C": 1,
                    "E": this.#fields.expiry.value,
                    "R": this.#fields.repeatability.value
                },
                "R": {
                    "B": this.#fields.BIC.value,
                    "N": this.#fields.name.value,
                    "I": this.#fields.IBAN.value
                },
                "a": {
                    "V": this.#fields.value.value,
                    "C": this.#fields.currency.value,
                },
                "t": this.#fields.text.value,
                "i": {
                    "p": this.#fields.positionId.value,
                    "s": this.#fields.shopId.value,
                    "m": this.#fields.machineId.value,
                    "b": this.#fields.billId.value,
                    "c": this.#fields.costumerId.value,
                    "t": this.#fields.transactionId.value,
                    "d": this.#fields.discountId.value,
                    "n": this.#fields.NAVCode.value
                }
            };

        }

        return false;

    };

    generateJSON(){
        try{
            return JSON.stringify(
                this.generateObject()
            );
        }catch (err){
            console.error(err);
            return (err);
        }

    };

}
