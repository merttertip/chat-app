import { useOutletContext, useParams } from "react-router-dom";
import Head from "../../components/chat/head";
import Messages from "../../components/chat/messages";
import Form from "../../components/chat/from";

const Chat = () => {
  const { room } = useParams();
  const user = useOutletContext();

  return (
    <div className="h-screen md:grid md:place-items-center">
      <div className="bg-white text-dark w-full md:w-[80vw] lg:w-[60vw] xl:w-[50vw] h-screen md:h-[80vh] md:rounded-md overflow-hidden flex flex-col">
        <Head user={user} room={room} />
        <Messages room={room} />
        <Form user={user} room={room} />
      </div>
    </div>
  );
};

export default Chat;
