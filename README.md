# blockly2scafi #

**blockly2scafi** is a [**Blockly**](https://developers.google.com/blockly/) environment developed
in [Scala.js](http://www.scala-js.org/) and Javascript with a custom code generator for [**ScaFi**](https://scafi.github.io/).

**Try it in [Github pages](https://matteocerioni.github.io/blockly2scafi/src/main/resources/index.html).**

## Installation

- Compile optimized Scala.js with [SBT](https://www.scala-sbt.org/) :

```
sbt fullOptJS
```

- Open in browser the file [index.html](src/main/resources/index.html)



## Project structure
The Blockly environment setup and code generator are written in JavaScript in the [resource](src/main/resources) directory:
- **[index.html](src/main/resources/index.html)** contains the layout of the web page of blockly2scafi, styled by the css file **[main.css](src/main/resources/main.css)**.
- **[blockly2scafi.js](src/main/resources/blockly2scafi.js)** initializes the blocky workspace and defines the toolbox.
- **[blocks_library.js](src/main/resources/blocks_library.js)** contains the json definition of the blocks and set up the event listeners used to update the dynamic output type of some blocks.
- **[scafi_generator.js](src/main/resources/scafi_generator.js)** builds the scafi code generator that translates the Blocks to valid and formatted Scafi Code.
- **[blocks_library.xml](src/main/resources/blocks_library.xml)** this file is not used by blockly2scafi, it's the exported [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#) library.

## How to add or edit blocks
1. Open [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#) .
2. Click on *Import Block Library* and upload the file [blocks_library.xml](src/main/resources/blocks_library.xml).
3. Define or edit the shape of the blocks using the tool.
4. Insert or edit the Blockly definition JSON in [blocks_library.js](src/main/resources/blocks_library.js).
5. Add the block in the toolbox in [blockly2scafi.js](src/main/resources/blockly2scafi.js).
6. Create or edit the code generator function of the block in [scafi_generator.js](src/main/resources/scafi_generator.js)
7. Remember to download the block library xml from [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#) and save it in [blocks_library.xml](src/main/resources/blocks_library.xml).