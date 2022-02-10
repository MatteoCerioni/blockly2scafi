Blockly.createBlockly2ScafiWorkspace = function (elt) {
    const toolboxXml =
        '<xml>\n' +
        '<category name="ScaFi" colour="#5b67a5">\n' +
            '<block type="output"/>\n' +
            '<block type="sense" output="Boolean">' +
                '<value name="TYPE">' +
                    '<shadow type="type">' +
                        '<field name="TYPE">Boolean</field>' +
                    '</shadow>' +
                '</value>' +
                '<value name="SENSOR_NAME">' +
                    '<shadow type="string">' +
                        '<field name="STRING_VALUE">sensor1</field>' +
                    '</shadow>' +
                '</value>' +
            '</block>' +
            '<block type="tuple"/>\n' +
        '</category>\n' +
        '<category name="BlockG" colour="#5b67a5">\n' +
            '<block type="distance_to"/>\n' +
            '<block type="distance_between"/>\n' +
            '<block type="channel"/>\n' +
        '</category>\n' +
        '<category name="Actuation" colour="#5b67a5">\n' +
            '<block type="led_all_to">\n' +
                '<value name="COLOR">\n' +
                    '<shadow type="color"/>\n' +
                '</value>\n' +
            '</block>\n'+
            '<block type="color"/>\n' +
        '</category>\n' +
        '<category name="Logic" colour="#5b80a5">\n' +
            '<block type="mux"/>\n' +
            '<block type="boolean">\n' +
                '<field name="BOOLEAN_VALUE">true</field>\n' +
            '</block>\n' +
            '<block type="boolean_operation">\n' +
                '<field name="OPERATOR">and</field>\n' +
            '</block>\n' +
            '<block type="number_compare">\n' +
                '<field name="OPERATOR">GREATER</field>\n' +
            '</block>\n' +
        '</category>\n' +
        '<category name="Math" colour="#745ba5">\n' +
            '<block type="integer">\n' +
                '<field name="INTEGER_VALUE">0</field>\n' +
            '</block>\n' +
            '<block type="double">\n' +
                '<field name="VALUE">0.1</field>\n' +
            '</block>\n' +
            '<block type="number_operation">\n' +
                '<field name="OPERATOR">ADDITION</field>\n' +
            '</block>\n' +
        '</category>\n' +
        '<category name="Text" colour="#5ba58c">\n' +
            '<block type="string">\n' +
                '<field name="STRING_VALUE"/>\n' +
            '</block>\n' +
        '</category>\n' +
        '<category name="Type" colour="#5b67a5">\n' +
            '<block type="type">\n' + '<field name="TYPE">Boolean</field>\n' + '</block>\n' +
            '<block type="type">\n' + '<field name="TYPE">Integer</field>\n' + '</block>\n' +
            '<block type="type">\n' + '<field name="TYPE">Double</field>\n' + '</block>\n' +
            '<block type="type">\n' + '<field name="TYPE">String</field>\n' + '</block>\n' +
            '<block type="other_type">\n' +
            '</block>\n' +
        '</category>\n' +
        '<sep/>\n' +
        //'<category name="Functions" colour="#995ba5" custom="PROCEDURE"/>'+
        //'<category name="Functions" colour="#995ba5" custom="PROCEDURE"/>\n' +
        '<category name="Definitions" colour="#a55b80" custom="DEFINITIONS"/>\n'+
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
        const defineBlocks = workspace.getBlocksByType('define').concat(workspace.getBlocksByType('val'));
        for(const defineBlock of defineBlocks) {
            const defName = defineBlock.getFieldValue('NAME');
            blockList.push({
                'kind':'block',
                'type':'getter',
                'fields': {
                    'NAME': defName,
                },
                'data':{
                    'defineBlockId':defineBlock.id,
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