const scafiGenerator = new Blockly.Generator('ScaFi');
scafiGenerator['write'] = function (block) {
    return '"' + block.getFieldValue('MESSAGE') + '"';
}

Blockly.ScaFi = scafiGenerator;