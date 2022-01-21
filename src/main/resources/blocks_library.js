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
        "colour": 230,
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
        "message0": "Sense %1",
        "args0": [
            {
                "type": "input_value",
                "name": "SENSOR_NAME",
                "check": "String"
            }
        ],
        "inputsInline": false,
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
        "colour": 330,
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
        "colour": 330,
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
        "colour": 330,
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
        "output": "MatrixOps",
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
    }
]);