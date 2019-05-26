import React, { useState, useEffect, useRef } from 'react';

export const Card = (props) => {
    const cardRef = useRef(null)
    const [style, setStyle] = useState(null)

    const mouseDown = (e) => {
        console.log('!')
        const startPosX = e.pageX || e.changedTouches[0].clientX
        const winWidth = window.outerWidth
        let delta = 0
        const el = cardRef.current

        const mouseMove = e => {
            delta = (e.pageX || e.changedTouches[0].clientX) - startPosX
            if (Math.abs(delta)/winWidth > 0.3) {
                setStyle({
                    transform: `translateX(${delta}px) rotate(${delta > 0?1:-1}deg)`,
                    backgroundColor: `${delta > 0?'green':'red'}`,
                    opacity: Math.max(0, 1-(Math.abs(delta)/winWidth)-0.5),  
                })
            } else {
                setStyle({transform: `translateX(${delta}px) rotate(${delta > 0?1:-1}deg)`})
            }
        }

        const mouseUp = e => {
            window.removeEventListener('mousemove', mouseMove, true);
            window.removeEventListener('touchmove', mouseMove, true);

            if (Math.abs(delta)/winWidth > 0.3) {
                el.parentNode && el.parentNode.removeChild(el) 
            } else {
                setStyle(null)
            }
        }

        window.addEventListener('mousemove', mouseMove, true);
        window.addEventListener('touchmove', mouseMove, true);
        window.addEventListener('mouseup', mouseUp, true)
        window.addEventListener('touchend', mouseUp, true)
        
    }

    useEffect(() => {
        const el = cardRef.current
        el.addEventListener('mousedown', mouseDown, true);
         el.addEventListener('touchstart', mouseDown, true);
        return () => {
            el.removeEventListener('mousedown', mouseDown, true);
             el.removeEventListener('touchstart', mouseDown, true);
        }
    }, [])

    return (
        <div className="card" ref={cardRef} style={style}>
            <div className="card-body">
                <p className="card-text">
                    {props.children}
                </p>
            </div>
        </div>
    )
}
