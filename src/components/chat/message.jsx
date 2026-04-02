import { auth } from "../../firebase";

const Message = ({ item }) => {
  // eğer mesajı aktif kullanıcı attıysa:
  if (auth.currentUser.uid === item.author.id) {
    return (
      <p className="bg-black text-white self-end message rounded-[7px_7px_0_7px]">
        {item.text}
      </p>
    );
  }

  // eğer mesajı başka bir kullanıcı attıysa:
  return (
    <div className="flex items-start gap-1">
      <img
        src={item.author.photo}
        className="size-10 rounded-full"
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col gap-1 w-full">
        <span className="font-semibold">{item.author.name}</span>
        <p className="text-zinc-800 bg-zinc-200 message rounded-[0_7px_7px_7px]">
          {item.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
