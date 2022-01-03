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
    }
]);