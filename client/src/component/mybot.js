// import React, { useState, useEffect } from 'react';
// import { Interactions } from 'aws-amplify';

// const Chatbot = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);

//   const botName = 'todayweatherbot';

//   const sendToBot = async () => {
//     try {
//       const response = await Interactions.send(botName, userInput);
//       const botMessage = response.message;

//       // Add user input and bot response to the chatMessages array
//       setChatMessages([
//         ...chatMessages,
//         { message: userInput, sender: 'user' },
//         { message: botMessage, sender: 'bot' },
//       ]);

//       setUserInput('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // Initialize the chat with a welcome message or any initial message
//     // sendToBot("Hello");
//   }, []);

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <div className="bg-white shadow-md p-4 rounded-lg">
      
//       <h2 className="text-2xl font-bold mb-2">Welcome I am Ruth your virtual Assistant</h2>
//         <div className="h-64 overflow-y-auto" id="chat-messages">
//           {chatMessages.map((message, index) => (
//             <div
//               key={index}
//               className={`p-2 mb-2 rounded-lg ${
//                 message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'
//               }`}
//             >
//               {message.message}
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center mt-4">
//           <input
//             type="text"
//             className="w-full border rounded-l-lg py-2 px-3"
//             placeholder="Type your message..."
//             value={userInput}
//             onChange={handleInputChange}
//           />
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded-r-lg"
//             onClick={sendToBot}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect } from 'react';
import { Interactions } from 'aws-amplify';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const botName = 'todayweatherbot';

  const sendToBot = async () => {
    try {
      const response = await Interactions.send(botName, userInput);
      const botMessage = response.message;

      setChatMessages([
        ...chatMessages,
        { message: userInput, sender: 'user' },
        { message: botMessage, sender: 'bot' },
      ]);

      setUserInput('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initialize the chat with a welcome message or any initial message
    // sendToBot("Hello");
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const toggleChat = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`fixed right-4 bottom-4 ${expanded ? 'w-96' : 'w-16'}`}>
      <div
        className={`bg-white shadow-md p-4 rounded-lg transition-all duration-300 ${
          expanded ? 'h-96' : 'h-16'
        } overflow-y-auto relative`}
        id="chat-messages"
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={toggleChat}
        >
          {expanded ? 'Minimize' : 'Expand'}
        </button>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg ${
              message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'
            }`}
          >
            {message.message}
          </div>
        ))
        }

        <div
          className={`flex items-center mt-4 ${expanded ? 'visible' : 'invisible'}`}
        >
          <input
            type="text"
            className="w-full border rounded-l-lg py-2 px-3"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-r-lg"
            onClick={sendToBot}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
