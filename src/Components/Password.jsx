import React, { useCallback, useEffect, useRef, useState } from 'react'

const Password = () => {
    const [length, setLength] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);


    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) {
            str += "0123456789";
        }
        if (charAllowed) {
            str += "!@#$%^&*()~+-";
        }

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length) + 1;
            pass += str.charAt(char);
        }
        setPassword(pass);

    }, [length, numberAllowed, charAllowed]);

    const copyClipBoard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password])

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed])

    return (
        <div className='bg-slate-300 w-[50%] mx-auto rounded p-8'>
            <h1 className='text-[40px] text-center font-semibold'>Password Generator</h1>
            <div className='w-[100%] p-4'>
                <input type="text"
                    placeholder='password'
                    className='w-[88%] p-4 outline-none rounded-l-lg'
                    value={password}
                    readOnly
                    ref={passwordRef}
                // onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={copyClipBoard} className='bg-[#16A6DE] px-4 p-4 w-[12%] text-white rounded-r-lg '>Copy</button>
            </div>
            <div className='length w-[100%] p-4 flex gap-6'>
                <div className='flex gap-2'>
                    <input type="range"
                        min={6}
                        max={100}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}

                    />
                    <label htmlFor="length">Length : {length}</label>
                </div>

                <div className='flex gap-2'>
                    <input type="checkbox"
                        onChange={() => setNumberAllowed((prev) => !prev)}

                    />
                    <label htmlFor="length">Numbers</label>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox"
                        onChange={() => setCharAllowed((prev) => !prev)}

                    />
                    <label htmlFor="length">Char</label>
                </div>
            </div>

        </div>
    )
}

export default Password
