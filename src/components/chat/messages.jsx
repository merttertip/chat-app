import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../../firebase";
import Message from "./message";
import Arrow from "./arrow";

const Messages = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const lastMessageRef = useRef();
  const prevMessagesLength = useRef(0);
  const audioRef = useRef(new Audio("/notification.mp3"));

  // veritabanındaki mesajları anlık olarak al
  useEffect(() => {
    // belgelerini alıcağımız kolleksiyonun referansını al
    const collectionRef = collection(db, "messages");

    // sorgu ayarlarını yap
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt", "asc"),
    );

    // messages kolleksiyonundaki verileri al
    const unsub = onSnapshot(q, (snapshot) => {
      // mesajların geçici olarak tutulduğu dizi
      const temp = [];

      // her belgenin içerisindeki dataya erişip diziye aktar
      snapshot.docs.forEach((doc) => temp.push(doc.data()));

      // mesajları state'e aktar
      setMessages(temp);
    });

    // kullanıcı sayfadan ayrılınca onSnapShot'ı durdur
    return () => {
      unsub();
    };
  }, []);

  // her yeni mesaj gelince çalışır
  useEffect(() => {
    if (messages.length < 1) return;

    // gönderilen son mesaja eriş
    const lastMsg = messages.at(-1);

    // son mesaja odaklan
    if (lastMsg.author.id === auth.currentUser.uid) {
      // eğer son mesajı ben attıysam aşağı son mesaja odaklan
      scrollToBottom();
    } else if (isAtBottom) {
      // eğer son mesajı başkası attıysa ve ben sayfanın alt kısmındaysam son mesaja odaklan
      scrollToBottom();
    }

    // kullanıcı yukardayken yeni mesaj geldiyse
    if (messages.length > prevMessagesLength.current && !isAtBottom) {
      // atılan son mesajı başkası attıysa okumadı sayını arttır
      if (lastMsg.author.id !== auth.currentUser.uid) {
        setUnreadCount((prev) => prev + 1);
      }
    }

    // toplam mesaj sayısını tuttuğumuz referansı güncelle
    prevMessagesLength.current = messages.length;

    // bildrimi oynat
    playSound();
  }, [messages]);

  // sayfadaki son mesajı kaydır
  const scrollToBottom = () => {
    // listedeki son mesaja kaydır
    lastMessageRef.current.scrollIntoView();
    setUnreadCount(0);
  };

  // scroll kaydırılınca çalışır
  const handleScroll = (e) => {
    // clientHeight: container'ın kullanıcı ekranındaki yüksekliği (824)
    // scrollTop: kullanıcı yukarıdan aşağıya kaç px kaydırdı (740)
    // scrollHeight: tüm içeriğin yüksekliği (gizli kısımlar dahil) (1564)
    const { clientHeight, scrollTop, scrollHeight } = e.target;

    // kullanıcı sayfanın en alt kısmına yakın mı
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 250);
  };

  // bildirim sesi oynat
  const playSound = async () => {
    await audioRef.current.play();
  };

  return (
    <main
      onScroll={handleScroll}
      className="flex-1 p-3 flex flex-col w-full overflow-y-auto overflow-x-hidden relative gap-3"
    >
      {messages.length < 1 ? (
        <div className="h-full grid place-items-center text-zinc-400">
          <p>Sohpete ilk mesajı gönderin</p>
        </div>
      ) : (
        messages.map((i, key) => <Message item={i} key={key} />)
      )}

      <div ref={lastMessageRef} />

      <Arrow
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
        unreadCount={unreadCount}
      />
    </main>
  );
};

export default Messages;
