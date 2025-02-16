import React, { useState } from 'react';

const App = () => {
    const [text, setText] = useState("Hello, World!");

    const handleChangeText = () => {
        setText("You clicked the button!");
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>{text}</h1>
            <button
                onClick={handleChangeText}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Change Text
            </button>
        </div>
    );
};

export default App;