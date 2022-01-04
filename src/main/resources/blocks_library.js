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
                        "TRUE"
                    ],
                    [
                        "false",
                        "FALSE"
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
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
]);