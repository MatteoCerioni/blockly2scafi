Blockly.defineBlocksWithJsonArray([
    {
        "type": "aggregate_program",
        "message0": "MyAggregateProgram %1 %2",
        "args0": [
            {
                "type": "input_dummy",
                "align": "CENTRE"
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
        "type": "write",
        "message0": "Write %1",
        "args0": [
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Hello Blockly"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 165,
        "tooltip": "Write",
        "helpUrl": ""
    }
]);