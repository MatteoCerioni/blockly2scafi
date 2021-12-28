Blockly.defineBlocksWithJsonArray([
    {
        "type": "write",
        "message0": "Write %1",
        "args0": [
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Hello Blockly"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 165,
        "tooltip": "Write",
        "helpUrl": ""
    }
]);


const scafiGenerator = new Blockly.Generator('ScaFi');
scafiGenerator['write'] = function(block){
    const textValue = block.getFieldValue('MESSAGE');
    const code = '"' + textValue + '"';
    return code;
}

Blockly.ScaFi = scafiGenerator;

