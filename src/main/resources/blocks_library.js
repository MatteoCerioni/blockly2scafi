Blockly.defineBlocksWithJsonArray([{
    "type": "aggregate_program",
    "message0": "Aggregate Program %1 %2",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "AGGREGATE_PROGRAM_MAIN"
        }
    ],
    "colour": 135,
    "tooltip": "AggregateProgram",
    "helpUrl": "https://scafi.github.io/"
},
    {
        "type": "output",
        "message0": "Output %1",
        "args0": [
            {
                "type": "input_value",
                "name": "OUTPUT_VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Output a value",
        "helpUrl": ""
    },
    {
        "type": "string",
        "message0": "\" %1 \"",
        "args0": [
            {
                "type": "field_input",
                "name": "STRING_VALUE",
                "text": ""
            }
        ],
        "output": "String",
        "colour": 165,
        "tooltip": "",
        "helpUrl": ""
    }, {
        "type": "integer",
        "message0": "%1",
        "args0": [
            {
                "type": "field_number",
                "name": "INTEGER_VALUE",
                "value": 0,
                "precision": 1
            }
        ],
        "output": "Integer",
        "colour": 260,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "double",
        "message0": "%1",
        "args0": [
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 0.1,
                "precision": null
            }
        ],
        "output": "Double",
        "colour": 260,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "boolean",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BOOLEAN_VALUE",
                "options": [
                    [
                        "true",
                        "true"
                    ],
                    [
                        "false",
                        "false"
                    ]
                ]
            }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "tuple",
        "message0": "( %1 , %2 )",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE_1"
            },
            {
                "type": "input_value",
                "name": "VALUE_2"
            }
        ],
        "inputsInline": true,
        "output": "Tuple",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }, {
        "type": "sense",
        "message0": "Sense %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "TYPE",
                "check": "Class"
            },
            {
                "type": "input_value",
                "name": "SENSOR_NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "mux",
        "message0": "Mux %1 First %2 Second %3",
        "args0": [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "FIRST_BRANCH"
            },
            {
                "type": "input_value",
                "name": "SECOND_BRANCH"
            }
        ],
        "inputsInline": false,
        "output": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "boolean_operation",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "FIRST",
                "check": "Boolean"
            },
            {
                "type": "field_dropdown",
                "name": "OPERATOR",
                "options": [
                    [
                        "and",
                        "and"
                    ],
                    [
                        "or",
                        "or"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SECOND",
                "check": "Boolean"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "define",
        "message0": "Define %1 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "x"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 350,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "val",
        "message0": "Val %1 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "x"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 350,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "getter",
        "message0": "%1",
        "args0": [
            {
                "type": "field_label_serializable",
                "name": "NAME",
                "text": ""
            }
        ],
        "output": null,
        "colour": 350,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "distance_to",
        "message0": "Distance To %1",
        "args0": [
            {
                "type": "input_value",
                "name": "SRC",
                "check": "Boolean"
            }
        ],
        "output": "Double",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "distance_between",
        "message0": "Distance Between %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "SOURCE",
                "check": "Boolean",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "TARGET",
                "check": "Boolean",
                "align": "RIGHT"
            }
        ],
        "output": "Double",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "number_compare",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "FIRST",
                "check": [
                    "Integer",
                    "Double"
                ]
            },
            {
                "type": "field_dropdown",
                "name": "OPERATOR",
                "options": [
                    [
                        ">",
                        "GREATER"
                    ],
                    [
                        ">=",
                        "GREATER_OR_EQUAL"
                    ],
                    [
                        "==",
                        "EQUAL"
                    ],
                    [
                        "!=",
                        "NOT EQUAL"
                    ],
                    [
                        "<=",
                        "LESS_OR_EQUAL"
                    ],
                    [
                        "<",
                        "LESS"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SECOND",
                "check": [
                    "Integer",
                    "Double"
                ]
            }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "number_operation",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "FIRST",
                "check": [
                    "Double",
                    "Integer"
                ]
            },
            {
                "type": "field_dropdown",
                "name": "OPERATOR",
                "options": [
                    [
                        "+",
                        "ADDITION"
                    ],
                    [
                        "-",
                        "SUBTRACTION"
                    ],
                    [
                        "*",
                        "MULTIPLICATION"
                    ],
                    [
                        "/",
                        "DIVISION"
                    ],
                    [
                        "%",
                        "MODULUS"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SECOND",
                "check": [
                    "Double",
                    "Integer"
                ]
            }
        ],
        "output": [
            "Double",
            "Integer"
        ],
        "colour": 260,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "channel",
        "message0": "Channel %1 Source %2 Target %3 Width %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SOURCE",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "TARGET",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": [
                    "Integer",
                    "Double"
                ]
            }
        ],
        "output": "Boolean",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "led_all_to",
        "message0": "led all to %1",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Color"
            }
        ],
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "color",
        "message0": "%1",
        "args0": [
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#ffff00"
            }
        ],
        "output": "Color",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "type",
        "message0": "%1",
        "args0": [
            {
                "type": "field_label_serializable",
                "name": "TYPE",
                "text": ""
            }
        ],
        "output": "Class",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "other_type",
        "message0": "other %1",
        "args0": [
            {
                "type": "field_input",
                "name": "TYPE",
                "text": ""
            }
        ],
        "output": "Class",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

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
        const firstOutput = firstInputBlock.outputConnection.getCheck();
        if(firstOutput){
            types = types.concat(firstOutput)
        }
    }
    const secondInput = muxBlock.getInput('SECOND_BRANCH');
    const secondInputBlock = secondInput.connection.targetBlock();
    if(secondInputBlock){
        const secondOutput = secondInputBlock.outputConnection.getCheck();
        if(secondOutput){
            types = types.concat(secondOutput)
        }
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
