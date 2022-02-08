const scafiGenerator = new Blockly.Generator('ScaFi');

//TODO FIX OPERATOR PRECEDENCE....
scafiGenerator.ATOMIC = 0;
scafiGenerator.FUNCTION_CALL = 2;
scafiGenerator.ORDER_MULTIPLICATION = 5.1; // *
scafiGenerator.ORDER_DIVISION = 5.2;       // /
scafiGenerator.ORDER_MODULUS = 5.3;        // %
scafiGenerator.ORDER_SUBTRACTION = 6.1;    // -
scafiGenerator.ORDER_ADDITION = 6.2;       // +
scafiGenerator.ORDER_RELATIONAL = 8;       // < <= > >=
scafiGenerator.ORDER_LOGICAL_AND = 13; // &&
scafiGenerator.ORDER_LOGICAL_OR = 14; // ||

scafiGenerator['aggregate_program'] = function (block) {
    const import_map = {
        "distance_to" : ["StandardSensors","BlockG"],
        "distance_between" : ["StandardSensors","BlockG"],
        "channel" : ["StandardSensors","BlockG"],
        "led_all_to" : "Actuation",
    }
    let importArray = [];
    let import_code = "";

    const workspace = block.workspace;
    const allBlocks = workspace.getAllBlocks();
    for(const block of allBlocks){
        if(block.type in import_map){
            let modules = import_map[block.type];
            if(!Array.isArray(modules)) modules = [modules];
            for(const module of modules){
                if(!importArray.includes(module)){
                    importArray.push(module);
                }
            }
        }
    }
    if(importArray.length){
        import_code = "//using "+importArray.join(", ")+"\n";
    }

    const otherCode = Blockly.ScaFi.blockToCode(block.getInputTargetBlock("AGGREGATE_PROGRAM_MAIN")); //Not using statementToCode to avoid first INDENT

    return import_code + otherCode;
}

scafiGenerator['string'] = function (block) {
    return ['"' + block.getFieldValue('STRING_VALUE') + '"', 0];
}

scafiGenerator['integer'] = function (block) {
    const code = block.getFieldValue('INTEGER_VALUE').toString();
    return [code, scafiGenerator.ATOMIC];
}

scafiGenerator['double'] = function (block) {
    const code = block.getFieldValue('VALUE').toString();
    return [code, scafiGenerator.ATOMIC];
}

scafiGenerator['boolean'] = function (block) {
    const code = block.getFieldValue('BOOLEAN_VALUE');
    return [code, scafiGenerator.ATOMIC];
}

scafiGenerator['tuple'] = function (block) {
    const values = [
        Blockly.ScaFi.valueToCode(block, "VALUE_1", scafiGenerator.ATOMIC),
        Blockly.ScaFi.valueToCode(block, "VALUE_2", scafiGenerator.ATOMIC)
    ];

    const code = "(" + values[0] + "," + values[1] + ")"
    return [code, scafiGenerator.ATOMIC];
}

scafiGenerator['boolean_operation'] = function (block) {
    const operation = block.getFieldValue("OPERATION");
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', scafiGenerator.ATOMIC);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', scafiGenerator.ATOMIC);

    let order;
    let code;
    if(operation === 'and'){
        code = first+' && '+second;
        order = scafiGenerator.ORDER_LOGICAL_AND;
    }else{ //or
        code = first+' || '+second;
        order = scafiGenerator.ORDER_LOGICAL_OR;
    }

    return [code, order];
}

scafiGenerator['number_compare'] = function (block) {
    const operation = block.getFieldValue("OPERATOR");
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', scafiGenerator.ATOMIC);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', scafiGenerator.ATOMIC);

    let order = scafiGenerator.ORDER_RELATIONAL;
    let code;
    if(operation === 'GREATER'){
        code = first+' > '+second;
    }else if(operation === 'GREATER_OR_EQUAL'){
        code = first+' >= '+second;
    }else if(operation === 'EQUAL'){
        code = first+' == '+second;
    }else if(operation === 'NOT_EQUAL'){
        code = first+' != '+second;
    }else if(operation === 'LESS_OR_EQUAL'){
        code = first+' <= '+second;
    }else{ //LESS
        code = first+' < '+second;
    }

    return [code, order];
}

scafiGenerator['number_operation'] = function (block) {
    const operation = block.getFieldValue("OPERATOR");
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', scafiGenerator.ATOMIC);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', scafiGenerator.ATOMIC);

    let order;
    let code;
    if(operation === 'ADDITION'){
        code = first+' + '+second;
        order = scafiGenerator.ORDER_ADDITION;
    }else if(operation === 'SUBTRACTION'){
        code = first+' - '+second;
        order = scafiGenerator.ORDER_SUBTRACTION;
    }else if(operation === 'MULTIPLICATION'){
        code = first+' * '+second;
        order = scafiGenerator.ORDER_MULTIPLICATION;
    }else if(operation === 'DIVISION'){
        code = first+' / '+second;
        order = scafiGenerator.ORDER_DIVISION;
    }else{ //MODULUS
        code = first+' % '+second;
        order = scafiGenerator.ORDER_MODULUS;
    }

    return [code, order];
}

scafiGenerator['output'] = function (block) {
    return Blockly.ScaFi.valueToCode(block, "OUTPUT_VALUE", scafiGenerator.ATOMIC);
}

scafiGenerator['sense'] = function (block) {
    const sensor = Blockly.ScaFi.valueToCode(block, 'SENSOR_NAME', scafiGenerator.ATOMIC);
    const code = 'sense(' + sensor + ')';
    return [code, scafiGenerator.FUNCTION_CALL];
}

scafiGenerator['mux'] = function (block) {
    const condition = Blockly.ScaFi.valueToCode(block, 'CONDITION', scafiGenerator.ATOMIC);
    const firstBranch = Blockly.ScaFi.valueToCode(block, 'FIRST_BRANCH', scafiGenerator.ATOMIC);
    const secondBranch = Blockly.ScaFi.valueToCode(block, 'SECOND_BRANCH', scafiGenerator.ATOMIC);
    let code = 'mux(' + condition + '){\n';
    code += scafiGenerator.prefixLines(firstBranch, scafiGenerator.INDENT)+'\n';
    code += '}{\n';
    code += scafiGenerator.prefixLines(secondBranch, scafiGenerator.INDENT)+'\n';
    code += '}';
    return [code, scafiGenerator.ATOMIC];
}

scafiGenerator['define'] = function(block){
    const defName = block.getFieldValue('NAME');
    const input = block.getInput('VALUE');
    const connection = input.connection;
    const targetBlock = connection.targetBlock();
    let type = null;
    if(targetBlock){
        type = targetBlock.outputConnection.getCheck();
    }

    let code = "def "+defName;
    if(type){
        code += " : "+type
    }
    code += " = "+Blockly.ScaFi.valueToCode(block, "VALUE", scafiGenerator.ATOMIC);
    return code;
}

scafiGenerator['val'] = function(block){
    const defName = block.getFieldValue('NAME');
    const input = block.getInput('VALUE');
    const connection = input.connection;
    const targetBlock = connection.targetBlock();
    let type = null;
    if(targetBlock){
        type = targetBlock.outputConnection.getCheck();
    }

    let code = "val "+defName;
    if(type){
        code += " : "+type
    }
    code += " = "+Blockly.ScaFi.valueToCode(block, "VALUE", scafiGenerator.ATOMIC);
    return code;
}

scafiGenerator['getter'] = function(block){
    return [block.getFieldValue('NAME'), scafiGenerator.ATOMIC];
}

scafiGenerator['distance_to'] = function(block){
    const code  = "distanceTo("+Blockly.ScaFi.valueToCode(block, "SRC", scafiGenerator.ATOMIC)+")";
    return [code,scafiGenerator.FUNCTION_CALL];
}

scafiGenerator['distance_between'] = function(block){
    const code  = "distanceBetween("+
        Blockly.ScaFi.valueToCode(block, "SOURCE", scafiGenerator.ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "TARGET", scafiGenerator.ATOMIC)+
    ")";
    return [code,scafiGenerator.FUNCTION_CALL];
}

scafiGenerator['channel'] = function(block){
    const code  = "channel("+
        Blockly.ScaFi.valueToCode(block, "SOURCE", scafiGenerator.ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "TARGET", scafiGenerator.ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "WIDTH", scafiGenerator.ATOMIC)+
    ")";
    return [code,scafiGenerator.FUNCTION_CALL];
}

scafiGenerator['led_all_to'] = function(block){
    const code  = "ledAll to "+Blockly.ScaFi.valueToCode(block, "COLOR", scafiGenerator.ATOMIC);
    return [code,scafiGenerator.ATOMIC];
}

scafiGenerator['color'] = function(block){
    return ['"'+block.getFieldValue('COLOR')+'"', scafiGenerator.ATOMIC];
}

scafiGenerator['type'] = function(block){
    return [block.getFieldValue("TYPE"), scafiGenerator.ATOMIC];
}

scafiGenerator['other_type'] = function(block){
    return [block.getFieldValue("TYPE"), scafiGenerator.ATOMIC];
}

scafiGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode = opt_thisOnly ? '' : '\n' + scafiGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};

Blockly.ScaFi = scafiGenerator;