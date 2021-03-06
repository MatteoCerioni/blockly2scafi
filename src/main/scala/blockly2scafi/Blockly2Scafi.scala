package main.scala.blockly2scafi

import org.scalajs.dom.raw.Element

import scala.scalajs.js
import scala.scalajs.js.annotation.JSGlobal

@js.native
trait ScaFi extends js.Object { //ScaFi custom code generator
  def workspaceToCode(workspace: Workspace): String = js.native
}

@js.native
trait Workspace extends js.Object {
  def addChangeListener(function: js.Function): Unit
}

@js.native
@JSGlobal
object Blockly extends js.Object {
  def createBlockly2ScafiWorkspace(elt: Element): Workspace = js.native

  def ScaFi: ScaFi = js.native
}

