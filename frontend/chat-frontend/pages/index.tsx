import { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('Student');

  useEffect(() => {
    // Fetch initial messages
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messages`)
         .then(res => setMessages(res.data.reverse()));

    // Subscribe to Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe('chat');
    channel.bind('MessageSent', data => {
      setMessages(prev => [...prev, data.message]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const sendMessage = async () => {
    if(!text) return;
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      user,
      content: text
    });
    setText('');
  };

  return (
    <div className="container">
      <h1>Real-Time Chat</h1>
      <div className="chat-box">
        {messages.map(m => (
          <p key={m.id}><strong>{m.user}:</strong> {m.content}</p>
        ))}
      </div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
