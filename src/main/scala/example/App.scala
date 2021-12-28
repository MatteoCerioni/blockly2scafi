package example

import org.scalajs.dom

import scalajs.js
import dom.{Event, document};

object App{
  def main(args: Array[String]): Unit = {

    val toolbox = document.getElementById("toolbox")
    val blocklyContainer = document.getElementById("blocklyContainer")
    val codeContainer = document.getElementById("codeContainer")
    val workspace = Blockly.inject(blocklyContainer, js.Dynamic.literal(
      "toolbox" -> toolbox.outerHTML
    ))

    workspace.addChangeListener(() => {
      codeContainer.textContent = Blockly.ScaFi.workspaceToCode(workspace)
    })
  }
}
