import { useLayoutEffect, useRef, createRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { css } from '@emotion/react'

import { Clock, adjustClock } from './Clock'

/*================================================
 Variables
================================================*/
const timeSchedule = [
  {
    fromTime: 0,
    toTime: 7 * 60,
    content: '睡眠',
  },
  {
    fromTime: 7 * 60,
    toTime: 8 * 60,
    content: '起床・朝食',
  },
  {
    fromTime: 8 * 60,
    toTime: 10 * 60,
    content: '支度・出勤',
  },
  {
    fromTime: 10 * 60,
    toTime: 13 * 60,
    content: '午前業務',
  },
  {
    fromTime: 13 * 60,
    toTime: 14 * 60,
    content: '昼食',
  },
  {
    fromTime: 14 * 60,
    toTime: 19 * 60,
    content: '午後業務',
  },
  {
    fromTime: 19 * 60,
    toTime: 20 * 60,
    content: '退勤',
  },
  {
    fromTime: 20 * 60,
    toTime: 21 * 60,
    content: '夕食',
  },
  {
    fromTime: 21 * 60,
    toTime: 23 * 60,
    content: '自由時間',
  },
  {
    fromTime: 23 * 60,
    toTime: 24 * 60,
    content: '就寝',
  },
]

/*================================================
 Functions
================================================*/
const setContentAnim = (trigger: HTMLElement, target: HTMLElement) => {
  gsap.fromTo(
    target,
    // Fromアニメーション
    { autoAlpha: 0 },
    // Toアニメーション
    {
      keyframes: [
        {
          autoAlpha: 1,
          y: -10,
          ease: 'power3.out',
        },
        {
          autoAlpha: 0,
          y: 10,
          ease: 'power3.in',
        },
      ],
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}

const setClockAnim = (trigger: HTMLElement, target: HTMLElement, fromTime: number, toTime: number) => {
  gsap.fromTo(
    target,
    // Fromアニメーション
    { '--time': fromTime },
    // Toアニメーション
    {
      '--time': toTime,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      // アニメーション更新時に実行
      onUpdate: () => {
        // 経過時間を取得
        const timeStr = getComputedStyle(target).getPropertyValue('--time')
        const time = Math.trunc(Number(timeStr))
        const h = Math.trunc(time / 60)
        const m = time % 60
        // 時計に時間を反映
        adjustClock(h, m)
      },
    }
  )
}

/*================================================
 Component
================================================*/
export const Contents = () => {
  const contentTriggerRefs = useRef<RefObject<HTMLElement>[]>([])
  const clockTriggerRef = useRef<HTMLDivElement>(null)

  // データ数分のuseRefを生成
  timeSchedule.forEach((_, index) => {
    contentTriggerRefs.current[index] = createRef<HTMLElement>()
  })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      contentTriggerRefs.current.map((contentTriggerRef, index) => {
        if (contentTriggerRef.current && clockTriggerRef.current) {
          // アニメーション設定
          const contentTrigger = contentTriggerRef.current
          const contentTarget = contentTrigger.querySelector('.section__content') as HTMLElement
          setContentAnim(contentTrigger, contentTarget)

          // アニメーション設定
          const clockTrigger = contentTriggerRef.current
          const clockTarget = clockTriggerRef.current
          setClockAnim(clockTrigger, clockTarget, timeSchedule[index].fromTime, timeSchedule[index].toTime)
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div css={contentsStyle}>
      <div className="contents">
        {timeSchedule.map((schedule, index) => (
          <section
            key={index}
            ref={contentTriggerRefs.current[index]}
            style={{ height: `${Math.trunc((schedule.toTime - schedule.fromTime) / 60) * 100}vh` }}
          >
            <div className="section__content">
              <p>{schedule.content}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="clock" ref={clockTriggerRef}>
        <Clock />
      </div>
    </div>
  )
}

/*================================================
 Styling
================================================*/
const contentsStyle = css`
  .contents {
    position: relative;
    z-index: 1;
    margin-bottom: 100vh;
  }

  section {
    width: 100%;
    min-height: 100vh;

    &:nth-of-type(2n) {
      --col: 3;
    }
  }

  .section__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    padding: 1rem;

    > * {
      transform: translateY(-200%);
    }
  }

  .clock {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
  }
`
