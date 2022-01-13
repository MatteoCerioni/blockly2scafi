Blockly.createBlockly2ScafiWorkspace = function (elt) {
    const toolboxXml =
        '<xml>\n' +
        '<category name="ScaFi" colour="#a5745b">\n' +
        '<block type="output"/>\n' +
        '<block type="sense">' +
            '<value name="SENSOR_NAME">' +
                '<shadow type="string">' +
                    '<field name="STRING_VALUE">sensor1</field>' +
                '</shadow>' +
            '</value>' +
        '</block>' +
        '<block type="tuple"/>\n' +
        '</category>\n' +
        '<category name="BlockG" colour="#a5745b">\n' +
        '<block type="distance_to"/>\n' +
        '</category>\n' +
        '<category name="Logic" colour="#5b80a5">\n' +
        '<block type="mux"/>\n' +
        '<block type="boolean">\n' +
        '<field name="BOOLEAN_VALUE">true</field>\n' +
        '</block>\n' +
        '<block type="boolean_operation">\n' +
        '<field name="OPERATOR">and</field>\n' +
        '</block>\n' +
        '</category>\n' +
        '<category name="Math" colour="#5b67a5">\n' +
        '<block type="integer">\n' +
        '<field name="INTEGER_VALUE">0</field>\n' +
        '</block>\n' +
        '</category>\n' +
        '<category name="Text" colour="#5ba58c">\n' +
        '<block type="string">\n' +
        '<field name="STRING_VALUE"/>\n' +
        '</block>\n' +
        '</category>\n' +
        '<sep/>\n' +
        '<category name="Functions" colour="#995ba5" custom="PROCEDURE"/>\n' +
        '<category name="Variables" colour="#a55b80" custom="SCAFI_VARIABLE">\n'+
            '<block type="define">\n' +
            '</block>\n'+
        '</category>\n'+
        '</xml>';


    const initialWorkspaceXml =
        '<xml>' +
        '<block type="aggregate_program" deletable="false" x="10" y="10">' +
        '<statement name="AGGREGATE_PROGRAM_MAIN">' +
        '<block type="output" ></block>' +
        '</statement>' +
        '</block>' +
        '</xml>';


    const workspace = Blockly.inject(elt, {
        toolbox: toolboxXml
    });

    const variablesDynamicCategoryCallback = function(workspace) {
        const blockList = [];
        blockList.push({
            'kind': 'block',
            'type': 'define',
        });

        for(const defineBlock of workspace.getBlocksByType('define')) {
            const defName = defineBlock.getFieldValue('NAME');
            blockList.push({
                'kind':'block',
                'type':'getter',
                'fields': {
                    'NAME': defName
                }
            });
        }
        return blockList;
    };
    workspace.registerToolboxCategoryCallback('SCAFI_VARIABLE', variablesDynamicCategoryCallback);

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialWorkspaceXml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans); //Disable all blocks outside the main block

    return workspace;
}

const scafiGenerator = new Blockly.Generator('ScaFi');
scafiGenerator.PRECEDENCE = 0;

scafiGenerator.FUNCTION_CALL = 2;
scafiGenerator.ORDER_LOGICAL_AND = 13; // &&
scafiGenerator.ORDER_LOGICAL_OR = 14; // ||

scafiGenerator['aggregate_program'] = function (block) {
    const import_map = {
        "distance_to" : "BlockG",
        //"channel" : "BlockG",
        //...
    }
    let importArray = [];
    let import_code = "";

    const workspace = block.workspace;
    const allBlocks = workspace.getAllBlocks();
    for(const block of allBlocks){
        if(block.type in import_map){
            const module = import_map[block.type];
            if(!importArray.includes(module)){
                importArray.push(module);
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
    return [code, scafiGenerator.PRECEDENCE];
}

scafiGenerator['boolean'] = function (block) {
    const code = block.getFieldValue('BOOLEAN_VALUE');
    return [code, scafiGenerator.PRECEDENCE];
}

scafiGenerator['tuple'] = function (block) {
    const values = [
        Blockly.ScaFi.valueToCode(block, "VALUE_1", scafiGenerator.PRECEDENCE),
        Blockly.ScaFi.valueToCode(block, "VALUE_2", scafiGenerator.PRECEDENCE)
    ];

    const code = "(" + values[0] + "," + values[1] + ")"
    return [code, scafiGenerator.PRECEDENCE];
}

scafiGenerator['sense'] = function (block) {
    const sensor = Blockly.ScaFi.valueToCode(block, 'SENSOR_NAME', scafiGenerator.PRECEDENCE);
    const code = 'sense(' + sensor + ')';
    return [code, scafiGenerator.PRECEDENCE];
}

scafiGenerator['mux'] = function (block) {
    const condition = Blockly.ScaFi.valueToCode(block, 'CONDITION', scafiGenerator.PRECEDENCE);
    const firstBranch = Blockly.ScaFi.valueToCode(block, 'FIRST_BRANCH', scafiGenerator.PRECEDENCE);
    const secondBranch = Blockly.ScaFi.valueToCode(block, 'SECOND_BRANCH', scafiGenerator.PRECEDENCE);
    //TODO CHECK TYPE OF THE TWO BRANCHES.
    let code = 'mux(' + condition + '){\n';
    code += scafiGenerator.INDENT+firstBranch+'\n';
    code += '}{\n';
    code += scafiGenerator.INDENT+secondBranch+'\n';
    code += '}';
    return [code, scafiGenerator.PRECEDENCE];
}

scafiGenerator['boolean_operation'] = function (block) {
    const operation = block.getFieldValue("OPERATION");
    const first = Blockly.ScaFi.valueToCode(block, 'FIRST', scafiGenerator.PRECEDENCE);
    const second = Blockly.ScaFi.valueToCode(block, 'SECOND', scafiGenerator.PRECEDENCE);

    let order;
    let code;
    if(operation == 'and'){
        code = first+' && '+second;
        order = scafiGenerator.ORDER_LOGICAL_AND;
    }else{ //or
        code = first+' || '+second;
        order = scafiGenerator.ORDER_LOGICAL_OR;
    }

    return [code, order];
}


scafiGenerator['output'] = function (block) {
    return Blockly.ScaFi.valueToCode(block, "OUTPUT_VALUE", scafiGenerator.PRECEDENCE);
}

scafiGenerator['define'] = function(block){
    const defName = block.getFieldValue('NAME');
     // TODO ADD TYPE?
    let code = "def "+defName+" = "+Blockly.ScaFi.valueToCode(block, "VALUE", scafiGenerator.PRECEDENCE);
    return code;
}

scafiGenerator['getter'] = function(block){
    return [block.getFieldValue('NAME'), scafiGenerator.PRECEDENCE];
}

scafiGenerator['distance_to'] = function(block){

    const code  = "distanceTo("+Blockly.ScaFi.valueToCode(block, "SRC", scafiGenerator.PRECEDENCE)+")";
    return [code,scafiGenerator.FUNCTION_CALL];
}

scafiGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode = opt_thisOnly ? '' : '\n' + scafiGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};

Blockly.ScaFi = scafiGenerator;