# MNBQrV3

`MNBQrV3` is a JavaScript class designed to handle payment-related data according to the MNB QR v3 specification. It ensures that the data fields adhere to specific validation rules and formats. This class can generate JSON data for further processing.

## Features
- Field validation: All fields have associated validation rules (e.g., required fields, pattern matching).
- JSON generation: Generates a JSON string based on the provided data.
- Encapsulation: Internal data is stored in private fields and can only be accessed or modified through getter and setter methods.

## Installation
Include the MNBQrV3 class in your project:
```javascript
const MNBQrV3 = require('path/to/MNBQrV3');
```

## Usage
### Creating an Instance
You can initialize an instance of MNBQrV3 by passing an optional configuration object. This object should match the schema described below:
```javascript
const qrData = new MNBQrV3({
    BIC: 'GIBAHUHB',
    name: 'Example Name',
    IBAN: 'HU12345678901234567890123456',
    value: 1000,
    currency: 'HUF',
    expiry: '2024-12-31T23:59',
    identification: 1,
    // ... other optional fields
});
```
### Methods
- `async get(field)`: Retrieve the value of a specific field.
- `async set(field, value)`: Set the value of a specific field after validation.
- `async generateObject()`: Generate a JS object based on the field values.
- `async generateJSON()`: Generate a JSON string based on the field values.

#### Example
```javascript
const qr = new MNBQrV3();

qr.setBIC("GIBAHUHB");
qr.setIBAN("HU12345678901234567890123456");
qr.setIdentification(MNBQrV3.HCT);
qr.setName("John Doe");
qr.setValue(10000);
qr.setCurrency("HUF");
qr.setRepeatability(MNBQrV3.REPETABLE);
qr.setExpiry(
    Date.parse("2024-12-31T23:59")
);

const json = qr.generateJSON();
console.log(json);
```

### Fields
- The MNBQrV3 class supports the following fields:
- BIC (required): Bank Identifier Code, validated by pattern /^[a-zA-Z]{8,11}$/.
- name (required): Name of the beneficiary, validated by pattern /^.{1,70}$/.
- IBAN (required): International Bank Account Number, validated by pattern /^[a-zA-Z0-9]{28}$/.
- value (required): Amount, validated as a number with a pattern /^(10{7}|[1-9]\d{0,6}|0)$/.
- currency (required): Currency code, validated by pattern /^[a-zA-Z]{3}$/.
- expiry (required): Expiry date in ISO 8601 format.
- identification (required): Numeric identification.
- text: Optional text field.
- positionId: Optional position ID.
- shopId: Optional shop ID.
- machineId: Optional machine ID.
- billId: Optional bill ID.
- costumerId: Optional customer ID.
- transactionId: Optional transaction ID.
- discountId: Optional discount ID.
- NAVCode: Optional NAV code.

### Validation
Each field is validated based on its defined pattern and type. Required fields must be provided; otherwise, an error will be thrown during validation.

### JSON Structure
The generated JSON object has the following structure:
```json
{
    "M": {
        "I": 1,
        "V": 3,
        "C": 1,
        "E": 1735689599000,
        "R": 0
    },
    "R": {
        "B": "GIBAHUHB",
        "N": "John Doe",
        "I": "HU12345678901234567890123456"
    },
    "a": {
        "V": 10000,
        "C": "HUF"
    },
    "t": "Optional text",
    "i": {
        "p": "Optional Position ID",
        "s": "Optional Shop ID",
        "m": "Optional Machine ID",
        "b": "Optional Bill ID",
        "c": "Optional Customer ID",
        "t": "Optional Transaction ID",
        "d": "Optional Discount ID",
        "n": "Optional NAV Code"
    }
}
```


