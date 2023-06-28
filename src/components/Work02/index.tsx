import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { css } from '@emotion/react'

import { Contents } from './Contents'

// プラグイン登録
gsap.registerPlugin(ScrollTrigger)

/*================================================
 Functions
================================================*/
const setAnimation = (trigger: HTMLElement, target: HTMLElement) => {
  gsap.fromTo(
    target,
    // Fromアニメーション
    { autoAlpha: 1 },
    // Toアニメーション
    {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  )

  gsap.fromTo(
    document.querySelector('main'),
    // Fromアニメーション
    { autoAlpha: 0 },
    // Toアニメーション,
    {
      autoAlpha: 1,
      ease: 'power3.in',
      scrollTrigger: {
        trigger: trigger,
        start: 'bottom top',
        scrub: 3,
      },
    }
  )
}

/*================================================
 Component
================================================*/
function App() {
  const triggerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (triggerRef.current) {
        // アニメーション設定
        const trigger = triggerRef.current
        const target = trigger.querySelector('.container') as HTMLElement
        setAnimation(trigger, target)
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div css={styles.root}>
      <div css={styles.fullFixed} ref={triggerRef}>
        <div className="container">
          <h1>タイムスケジュール</h1>
          <p className="indicator">
            <span>Scroll</span>
            <span>↓</span>
          </p>
        </div>
      </div>
      <main>
        <Contents />
      </main>
    </div>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  root: css`
    position: relative;
    max-width: 100vw;
    min-height: 100vh;
    margin: 0;
    overflow-x: hidden;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 43, 1),
      rgba(7, 0, 84, 1),
      rgba(20, 17, 105, 1),
      rgba(30, 32, 131, 1),
      rgba(81, 88, 162, 1),
      rgba(134, 174, 219, 1),
      rgba(194, 225, 246, 1),
      rgba(178, 218, 245, 1),
      rgba(161, 211, 243, 1),
      rgba(143, 204, 241, 1),
      rgba(124, 196, 238, 1),
      rgba(106, 189, 235, 1),
      rgba(87, 182, 233, 1),
      rgba(113, 192, 236, 1),
      rgba(159, 207, 218, 1),
      rgba(195, 205, 153, 1),
      rgba(215, 175, 94, 1),
      rgba(221, 116, 44, 1),
      rgba(167, 85, 80, 1),
      rgba(106, 58, 110, 1),
      rgba(30, 32, 131, 1),
      rgba(23, 21, 111, 1),
      rgba(15, 9, 95, 1),
      rgba(3, 0, 71, 1)
    );
    color: #fff;
    font-size: min(5vw, 40px);
    font-family: 'Judson', serif;

    &::after {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.1));
      content: '';
      pointer-events: none;
    }

    h1 {
      font-size: 2em;
    }
  `,

  fullFixed: css`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100vh;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      width: 100%;
      height: 100vh;
      padding: 1rem;
    }

    .indicator {
      position: absolute;
      bottom: 0;
      text-align: center;

      span {
        display: block;
        &:nth-of-type(2) {
          animation: arrowMove 600ms infinite alternate;
        }
        @keyframes arrowMove {
          to {
            transform: translateY(0.5rem);
          }
        }
      }
    }
  `,
}

export default App
