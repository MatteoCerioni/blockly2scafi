Blockly.createBlockly2ScafiWorkspace = function (elt) {
    const toolboxXml =
        '<xml>' +
        '<block type="output"></block>' +
        '<block type="string"></block>' +
        '<block type="integer"></block>' +
        '<block type="boolean"></block>' +
        '<block type="tuple"></block>' +
        '<block type="sense">' +
            '<value name="SENSOR_NAME">' +
                '<shadow type="string">' +
                    '<field name="STRING_VALUE">sensor1</field>' +
                '</shadow>' +
            '</value>' +
        '</block>' +
        '<block type="mux"></block>' +
        '</xml>'

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

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialWorkspaceXml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans); //Disable all blocks outside the main block

    return workspace;
}

const scafiGenerator = new Blockly.Generator('ScaFi');
scafiGenerator.PRECEDENCE = 0;
scafiGenerator.FUNCTION_CALL = 1;

scafiGenerator['aggregate_program'] = function (block) {
    let import_code = "";

    //TODO CHECK INSIDE BLOCKS AND IMPORT USED LIBRARIES.

    return import_code +
        Blockly.ScaFi.statementToCode(block, "AGGREGATE_PROGRAM_MAIN");
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


scafiGenerator['output'] = function (block) {
    return Blockly.ScaFi.valueToCode(block, "OUTPUT_VALUE", scafiGenerator.PRECEDENCE);
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