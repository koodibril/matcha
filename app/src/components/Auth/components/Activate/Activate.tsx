import React, { useEffect } from "react";
import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";
import { useMessage } from "src/ducks/message/message";

const Activate: React.FC = () => {
  const { activateUser } = useAuthentication();
  const { pushState } = useNavigation();
  const message = useMessage();

  useEffect(() => {
    const path = window.location.pathname.split("/");

    if (path.length === 4) {
      activateUser(path[3]);
    } else pushState("/auth");
  }, [activateUser, pushState]);

  return <>{message?.message}</>;
};

export default Activate;
