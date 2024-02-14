import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
   setOpenModal: (a: boolean) => void;
   children: ReactNode;
};

export default function Modal({ setOpenModal, children }: Props) {
   return createPortal(
      <div className="fixed inset-0 z-30">
         <div
            onClick={(e) => {
               // e.stopPropagation();
               setOpenModal(false);
            }}
            className="absolute inset-0 bg-black opacity-60"
         ></div>
         {children}
      </div>,
      document.body
   );
}
