import { useState, useEffect } from "react";

function UseEffectTimerFunction() {
    const [countDown, setCountDown] = useState(180)
    const [avatar, setAvatar] = useState()

    // Dùng sai, setInterval chạy mãi
    // setInterval(() => {
    //     setCountDown(countDown - 1)
    // }, 1000)

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountDown(prevState => prevState - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

    // File
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        setAvatar(file)

        //console.log(URL.createObjectURL(file))
    }

    return (
        <div>
            <h1>{countDown}</h1>
            <input
                type="file"
                onChange={handlePreviewAvatar}
            />
            {avatar && (
                <img src={avatar.preview} alt="" width="80%" />
            )}
        </div>
    )
}

export default UseEffectTimerFunction;