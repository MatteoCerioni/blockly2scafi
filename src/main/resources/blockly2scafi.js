Blockly.createBlockly2ScafiWorkspace = function (elt, config) {
    const workspace = Blockly.inject(elt, config);

    const initialWorkspaceXml =
        '<xml>' +
        '<block type="aggregate_program" deletable="false" x="10" y="10">' +
        //'   <field name="MESSAGE">Hello world</field>' +
        '</block>' +
        '</xml>';

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

scafiGenerator['write'] = function (block) {
    return '"' + block.getFieldValue('MESSAGE') + '"';
}

Blockly.ScaFi = scafiGenerator;