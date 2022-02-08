Blockly.createBlockly2ScafiWorkspace = function (elt) {
    const toolboxXml =
        '<xml>\n' +
        '<category name="ScaFi" colour="#cfa138">\n' +
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
        '<category name="BlockG" colour="#cfa138">\n' +
            '<block type="distance_to"/>\n' +
            '<block type="channel"/>\n' +
        '</category>\n' +
        '<category name="Actuation" colour="#cfa138">\n' +
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
        '</category>\n' +
        '<category name="Math" colour="#5b67a5">\n' +
            '<block type="integer">\n' +
                '<field name="INTEGER_VALUE">0</field>\n' +
            '</block>\n' +
            '<block type="double">\n' +
                '<field name="VALUE">0.1</field>\n' +
            '</block>\n' +
            '<block type="number_operation">\n' +
                '<field name="OPERATOR">ADDITION</field>\n' +
            '</block>\n' +
            '<block type="number_compare">\n' +
                '<field name="OPERATOR">GREATER</field>\n' +
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

    function updateBlockOutputType(block, types){
        const blockCheck = block.outputConnection.getCheck()
        if(types && types.length){
            if(!blockCheck || blockCheck.length === 0 || blockCheck.filter(x => !types.includes(x)).length>0){
                block.setOutput(true, types);
                return true;
            }
        }else{
            if(blockCheck && blockCheck.length !== 0){
                block.setOutput(true,[]);
                return true;
            }
        }
        return false;
    }

    function updateSenseOutputType(event, workspace, senseBlock){
        const typeBlock = senseBlock.getInputTargetBlock('TYPE');
        let types = []
        if(typeBlock){
            const typeString = typeBlock.getFieldValue("TYPE")
            types.push(typeString);
        }
        if(updateBlockOutputType(senseBlock, types)){
            workspace.fireChangeListener(event);
        }
    }
    Blockly.Blocks['sense'].onchange = function(event){
        if(event.type === "move"){
            const workspace = Blockly.getMainWorkspace();
            const block = workspace.getBlockById(event.blockId);
            if(block && block.type==='type'){
                if(event.newParentId){
                    const newParentBlock = workspace.getBlockById(event.newParentId);
                    if(newParentBlock.type === "sense"){
                        updateSenseOutputType(event, workspace, newParentBlock);
                    }
                }
                if(event.oldParentId){
                    const oldParentBlock = workspace.getBlockById(event.oldParentId);
                    if(oldParentBlock.type === "sense"){
                        updateSenseOutputType(event, workspace, oldParentBlock);
                    }
                }
            }
        }
    };

    function updateMuxOutputType(event, workspace, muxBlock){
        let types = []
        const firstInput = muxBlock.getInput('FIRST_BRANCH');
        const firstInputBlock = firstInput.connection.targetBlock();
        if(firstInputBlock){
            types = types.concat(firstInputBlock.outputConnection.getCheck())
        }
        const secondInput = muxBlock.getInput('SECOND_BRANCH');
        const secondInputBlock = secondInput.connection.targetBlock();
        if(secondInputBlock){
            types = types.concat(secondInputBlock.outputConnection.getCheck())
        }

        if(updateBlockOutputType(muxBlock, types)){
            workspace.fireChangeListener(event);
        }
    }
    Blockly.Blocks['mux'].onchange = function(event){
        if(event.type === "move"){
            const workspace = Blockly.getMainWorkspace();
            if(event.newParentId){
                const newParentBlock = workspace.getBlockById(event.newParentId);
                if(newParentBlock && newParentBlock.type === "mux"){
                    updateMuxOutputType(event, workspace, newParentBlock);
                }
            }
            if(event.oldParentId){
                const oldParentBlock = workspace.getBlockById(event.oldParentId);
                if(oldParentBlock && oldParentBlock.type === "mux"){
                    updateMuxOutputType(event, workspace, oldParentBlock);
                }
            }
        }
    };

    function updateGetterOutputType(workspace, getterBlock){
        const data =  getterBlock.data
        if(data && data["defineBlockId"]){
            const defineBlock  = workspace.getBlockById(data["defineBlockId"])
            if(defineBlock){
                const input = defineBlock.getInput('VALUE');
                const connection = input.connection;
                const targetBlock = connection.targetBlock();
                let output = [];
                if(targetBlock){
                    output = targetBlock.outputConnection.getCheck();
                }
                return updateBlockOutputType(getterBlock, output);
            }else{
                getterBlock.dispose(true);
            }
            return false;
        }
    }
    Blockly.Blocks['getter'].onchange = function(event){
        const mainWorkspace = Blockly.getMainWorkspace();
        if(event instanceof Blockly.Events.BlockMove ){
            const workspace = Blockly.Workspace.getById(event.workspaceId);
            if(mainWorkspace === workspace){
                const block = workspace.getBlockById(event.blockId);
                if(block && block.type==='getter'){
                    if(updateGetterOutputType(mainWorkspace, block)){
                        mainWorkspace.fireChangeListener(event);
                    }
                }
            }
        }
    };
    function defineAndValOnChange(event){
        //TODO FIRE ALSO ON DELETE OF DEFINE/VAL BLOCKS..
        if(event.type === "move"){
            const workspace = Blockly.getMainWorkspace();
            const getters = workspace.getBlocksByType("getter")
            for(const getter of getters){
                updateGetterOutputType(workspace, getter)
            }
        }
    }
    Blockly.Blocks['define'].onchange = function(event){
       defineAndValOnChange(event);
    };
    Blockly.Blocks['val'].onchange = function(event){
        defineAndValOnChange(event);
    };

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