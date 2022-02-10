const scafiGenerator = new Blockly.Generator('ScaFi');

//Operator precedence constants. See https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
scafiGenerator.ORDER_ATOMIC = 0;
scafiGenerator.ORDER_FUNCTION_CALL = 2;     //()
scafiGenerator.ORDER_MULTIPLICATION = 5.1;  // *
scafiGenerator.ORDER_DIVISION = 5.2;        // /
scafiGenerator.ORDER_MODULUS = 5.3;         // %
scafiGenerator.ORDER_SUBTRACTION = 6.1;     // -
scafiGenerator.ORDER_ADDITION = 6.2;        // +
scafiGenerator.ORDER_RELATIONAL = 8;        // < <= > >=
scafiGenerator.ORDER_EQUALITY =     12;     // == != === !==
scafiGenerator.ORDER_LOGICAL_AND = 13;      // &&
scafiGenerator.ORDER_LOGICAL_OR = 14;       // ||&&
scafiGenerator.ORDER_ASSIGNMENT = 20;       // =
scafiGenerator.ORDER_NONE = 99;

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
    return [code, scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['double'] = function (block) {
    const code = block.getFieldValue('VALUE').toString();
    return [code, scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['boolean'] = function (block) {
    const code = block.getFieldValue('BOOLEAN_VALUE');
    return [code, scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['tuple'] = function (block) {
    const values = [
        Blockly.ScaFi.valueToCode(block, "VALUE_1", scafiGenerator.ORDER_ATOMIC),
        Blockly.ScaFi.valueToCode(block, "VALUE_2", scafiGenerator.ORDER_ATOMIC)
    ];

    const code = "(" + values[0] + "," + values[1] + ")"
    return [code, scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['boolean_operation'] = function (block) {
    const operation = block.getFieldValue("OPERATION");

    let order;
    let operator;
    if(operation === 'and'){
        operator = "&&";
        order = scafiGenerator.ORDER_LOGICAL_AND;
    }else{ //or
        operator = "||";
        order = scafiGenerator.ORDER_LOGICAL_OR;
    }

    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', order);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', order);
    const code = first+' '+operator+' '+second;

    return [code, order];
}

scafiGenerator['number_compare'] = function (block) {
    const operation = block.getFieldValue("OPERATOR");

    let operator;
    let order;
    if(operation === 'GREATER'){
        operator = ' > ';
        order = scafiGenerator.ORDER_RELATIONAL;
    }else if(operation === 'GREATER_OR_EQUAL'){
        operator = ' >= ';
        order = scafiGenerator.ORDER_RELATIONAL;
    }else if(operation === 'EQUAL'){
        operator = ' == ';
        order = scafiGenerator.ORDER_EQUALITY;
    }else if(operation === 'NOT_EQUAL'){
        operator = ' != ';
        order = scafiGenerator.ORDER_EQUALITY;
    }else if(operation === 'LESS_OR_EQUAL'){
        operator = ' <= ';
        order = scafiGenerator.ORDER_RELATIONAL;
    }else{ //LESS
        operator = ' < ';
        order = scafiGenerator.ORDER_RELATIONAL;
    }
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', order);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', order);
    const code = first+operator+second;

    return [code, order];
}

scafiGenerator['number_operation'] = function (block) {
    const operation = block.getFieldValue("OPERATOR");

    let order;
    let operator;
    if(operation === 'ADDITION'){
        operator = ' + ';
        order = scafiGenerator.ORDER_ADDITION;
    }else if(operation === 'SUBTRACTION'){
        operator = ' - ';
        order = scafiGenerator.ORDER_SUBTRACTION;
    }else if(operation === 'MULTIPLICATION'){
        operator = ' * ';
        order = scafiGenerator.ORDER_MULTIPLICATION;
    }else if(operation === 'DIVISION'){
        operator = ' / ';
        order = scafiGenerator.ORDER_DIVISION;
    }else{ //MODULUS
        operator = ' % ';
        order = scafiGenerator.ORDER_MODULUS;
    }
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', order);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', order);
    const code = first+operator+second;
    return [code, order];
}

scafiGenerator['output'] = function (block) {
    return Blockly.ScaFi.valueToCode(block, "OUTPUT_VALUE", scafiGenerator.ORDER_NONE);
}

scafiGenerator['sense'] = function (block) {
    const sensor = Blockly.ScaFi.valueToCode(block, 'SENSOR_NAME', scafiGenerator.ORDER_ATOMIC);
    const code = 'sense(' + sensor + ')';
    return [code, scafiGenerator.ORDER_FUNCTION_CALL];
}

scafiGenerator['mux'] = function (block) {
    const condition = Blockly.ScaFi.valueToCode(block, 'CONDITION', scafiGenerator.ORDER_ATOMIC);
    const firstBranch = Blockly.ScaFi.valueToCode(block, 'FIRST_BRANCH', scafiGenerator.ORDER_ATOMIC);
    const secondBranch = Blockly.ScaFi.valueToCode(block, 'SECOND_BRANCH', scafiGenerator.ORDER_ATOMIC);
    let code = 'mux(' + condition + '){\n';
    code += scafiGenerator.prefixLines(firstBranch, scafiGenerator.INDENT)+'\n';
    code += '}{\n';
    code += scafiGenerator.prefixLines(secondBranch, scafiGenerator.INDENT)+'\n';
    code += '}';
    return [code, scafiGenerator.ORDER_ATOMIC];
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
    if(type && type.length){
        code += " : "+type[0]
    }
    code += " = "+Blockly.ScaFi.valueToCode(block, "VALUE", scafiGenerator.ORDER_ASSIGNMENT);
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
    if(type && type.length){
        code += " : "+type[0]
    }
    code += " = "+Blockly.ScaFi.valueToCode(block, "VALUE", scafiGenerator.ORDER_ASSIGNMENT);
    return code;
}

scafiGenerator['getter'] = function(block){
    return [block.getFieldValue('NAME'), scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['distance_to'] = function(block){
    const code  = "distanceTo("+Blockly.ScaFi.valueToCode(block, "SRC", scafiGenerator.ORDER_ATOMIC)+")";
    return [code,scafiGenerator.ORDER_FUNCTION_CALL];
}

scafiGenerator['distance_between'] = function(block){
    const code  = "distanceBetween("+
        Blockly.ScaFi.valueToCode(block, "SOURCE", scafiGenerator.ORDER_ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "TARGET", scafiGenerator.ORDER_ATOMIC)+
    ")";
    return [code,scafiGenerator.ORDER_FUNCTION_CALL];
}

scafiGenerator['channel'] = function(block){
    const code  = "channel("+
        Blockly.ScaFi.valueToCode(block, "SOURCE", scafiGenerator.ORDER_ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "TARGET", scafiGenerator.ORDER_ATOMIC)+", "+
        Blockly.ScaFi.valueToCode(block, "WIDTH", scafiGenerator.ORDER_ATOMIC)+
    ")";
    return [code,scafiGenerator.ORDER_FUNCTION_CALL];
}

scafiGenerator['led_all_to'] = function(block){
    const code  = "ledAll to "+Blockly.ScaFi.valueToCode(block, "COLOR", scafiGenerator.ORDER_ATOMIC);
    return [code,scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['color'] = function(block){
    return ['"'+block.getFieldValue('COLOR')+'"', scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['type'] = function(block){
    return [block.getFieldValue("TYPE"), scafiGenerator.ORDER_ATOMIC];
}

scafiGenerator['other_type'] = function(block){
    return [block.getFieldValue("TYPE"), scafiGenerator.ORDER_ATOMIC];
}

//scrub_ is the common tasks for generating code from blocks, called on every block.
scafiGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode = opt_thisOnly ? '' : '\n' + scafiGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};

Blockly.ScaFi = scafiGenerator;