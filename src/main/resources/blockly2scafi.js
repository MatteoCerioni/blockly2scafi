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
        '<category name="Variables" colour="#a55b80" custom="DEFINITIONS"/>\n'+
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

    const definitionsDynamicCategoryCallback = function(workspace) {
        const blockList = [];
        blockList.push({
            'kind': 'block',
            'type': 'define',
        });
        blockList.push({
            'kind': 'block',
            'type': 'val',
        });
        console.log(workspace);
        const defineBlocks = workspace.getBlocksByType('define').concat(workspace.getBlocksByType('val'));
        for(const defineBlock of defineBlocks) {
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
    workspace.registerToolboxCategoryCallback('DEFINITIONS', definitionsDynamicCategoryCallback);

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialWorkspaceXml), workspace);

    workspace.addChangeListener(Blockly.Events.disableOrphans); //Disable all blocks outside the main block

    return workspace;
}