import { useEffect, useState } from "react";

// khi muốn thực hiện các side effect
// Cập nhật DOM, call API, add/removeListener, un/subscribe, set/clearInterval, set/clearTimeout, mounted/un
// 1. useEffect(callbcak)
// --- callback luôn được gọi component khi re-render
// --- callback được gọi sau khi thêm component vào DOM
// 2. useEffect(callback, [])
// --- chỉ gọi callback 1 lần khi component mounted
// 3. useEffect(callback, [deps])
// --- callback sẽ được gọi lại khi deps thay đổi
// 1. Callback luôn được gọi sau khi component mounted
// 2. cleanup function luôn được gọi trước khi component unmounted  

const tabs = ['posts', 'comments', 'albums']

function UseEffect() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')

    const [showGoToTop, setShowGotoTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    //console.log(type)
    useEffect(() => {
        //console.log('Mounted')
        //console.log('Title change')
        //document.title = title
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            setPosts(posts);
        })
    }, [type]) 

    // scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGotoTop(true)
            } else {
                setShowGotoTop(false)
            }

            // Viết tắt
            //setShowGotoTop(window.scrollY >= 200)
        }

        window.addEventListener('scroll', handleScroll)

        // cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Resize
    useEffect(() => {
        const handleReszie = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleReszie)
        // cleanup function
        return () => {
            window.removeEventListener('resize', handleReszie)
        }
    }, [])
  
    return (
        <div>
            {tabs.map(tab => (
                <button 
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        background: '#333',
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))} 

            <input value={title} onChange={e => setTitle(e.target.value)} />
            
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title || post.name}</li>
                ))}
            </ul>

            {showGoToTop && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }}
                >
                    Go to Top
                </button>
            )}
            <h1>{width}</h1>
        </div>
    )
}

export default UseEffect;