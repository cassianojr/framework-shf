import { ModalActions } from "./ModalActions";
import { ModalEvaluateAction } from "./ModalEvaluateAction";
import { ModalForm } from "./ModalForm";
import { ModalList } from "./ModalList";
import { ModalRoot } from "./ModalRoot";
import { ModalText } from "./ModalText";

export const Modal = {
  Root: ModalRoot,
  List: ModalList,
  Form: ModalForm,
  Text: ModalText,
  Actions: ModalActions,
  EvaluateAction: ModalEvaluateAction
}