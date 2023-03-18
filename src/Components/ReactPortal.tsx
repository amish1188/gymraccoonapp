import { createPortal } from 'react-dom';

type ReactPortalProps = {
 children: React.ReactNode;
 wrapperId: string;
};

const ReactPortal = ({ children, wrapperId }: ReactPortalProps) => {
 return createPortal(children, document.getElementById(wrapperId)!);
};

export default ReactPortal;
