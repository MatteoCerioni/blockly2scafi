package main.scala.blockly2scafi

import org.scalajs.dom.document

import scala.scalajs.js

object App {
  def main(args: Array[String]): Unit = {
    val BlocklyEditorId = "blockly-editor"
    val GeneratedCodeId = "generated-code"

    val toolboxElement = document.getElementById("toolbox")
    val blocklyEditorElement = document.getElementById(BlocklyEditorId)
    val generatedCodeElement = document.getElementById(GeneratedCodeId)
    val workspace = Blockly.inject(blocklyEditorElement, js.Dynamic.literal(
      "toolbox" -> toolboxElement.outerHTML
    ))

    workspace.addChangeListener(() => {
      generatedCodeElement.textContent = Blockly.ScaFi.workspaceToCode(workspace)
    })
  }
}
