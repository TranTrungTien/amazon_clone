import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

type WrapperScrollToTopProps = {
  children: ReactNode;
};

const WrapperScrollToTop = ({ children }: WrapperScrollToTopProps) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default WrapperScrollToTop;
