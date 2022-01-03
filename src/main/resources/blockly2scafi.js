Blockly.createBlockly2ScafiWorkspace = function (elt) {
    const toolboxXml =
        '<xml>' +
        '<block type="output"></block>' +
        '<block type="string"></block>' +
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

    const initialBlockIds = Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialWorkspaceXml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans); //Disable all blocks outside the main block

    return workspace;
}

const scafiGenerator = new Blockly.Generator('ScaFi');

scafiGenerator['aggregate_program'] = function (block) {
    var import_code = "";

    //TODO CHECK INSIDE BLOCKS AND IMPORT USED LIBRARIES.
    return import_code +
        Blockly.ScaFi.statementToCode(block, "AGGREGATE_PROGRAM_MAIN");
}

scafiGenerator['string'] = function (block) {
    return ['"' + block.getFieldValue('STRING_VALUE') + '"', 0]; //TODO USE ORDER
}

scafiGenerator['output'] = function (block) {
    return Blockly.ScaFi.valueToCode(block, "OUTPUT_VALUE", 0); //TODO USE ORDER
}

Blockly.ScaFi = scafiGenerator;