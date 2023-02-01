// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback, [])
// - Chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi
// -------------
// 1. Callback luôn được gọi sau khi component mounted

import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const tabs = ['posts', 'comments', 'albums'];

export default function MountedContent() {
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState('posts');
    const [showGoToTop, setShowGoToTop] = useState(false);
    
    console.log(type);

    useEffect(() => {
        // document.title = title;

        console.log('changed type');

        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            setPosts(posts);
        })
    }, [type]);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY >= 300) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        console.log('addEventListener');

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log('addEventListener');
        }

    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            {tabs.map(tab => (
                <button 
                    key={tab} onClick={() => setType(tab)}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#333'
                    } : {}}
                >
                    {tab}
                </button>
            ))}

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
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
                        borderRadius: '50%',
                        cursor: 'pointer',
                    }}
                    className="btn btn-outline-info"
                    onClick={handleScrollToTop}
                >
                    <FaArrowCircleUp style={{ display: 'flex' }} />
                </button>
            )}
        </div>
    )
}