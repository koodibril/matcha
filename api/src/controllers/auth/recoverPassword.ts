import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoE } from '../../shared/neo4j/queries';
import { CHANGE_PASSWORD_EMAIL, sendMail } from '../../shared/mail/mailer';



export const recoverPassword = async (req: any, res: any) => {
  const session = getSession();
  const email = req.body.email;

  try {
      console.log(email);
    const userInfo = await getUserInfoE({ email }, session) as any;
    if (!userInfo)
        return conflict(res, `No user with this email`);
    
    sendMail(email, userInfo.properties.Token, userInfo.properties.Username, CHANGE_PASSWORD_EMAIL);
    
    info(`Email send !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}